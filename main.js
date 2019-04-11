require('dotenv').config();
// Modules to control application life, native browser window, keyboard shortcuts, and session/requests
const { app, BrowserWindow, globalShortcut, session } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const queryString = require('query-string');
const UserStore = require('./src/data/UserStore');
const { AUTHORIZATION_URL, CONFIG_FILENAME } = require('./src/constants');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let authWindow;

const userStore = new UserStore({
  configName: CONFIG_FILENAME,
  defaults: {
    accessToken: null,
  },
});

const initApp = () => {
  if (isDev) {
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS).then(name => {
      console.log(`Added Extension: ${name}`);
    }).catch(err => {
      console.log('An error occurred: ', err);
    });
  }

  if (userStore.get('accessToken')) {
    createMainWindow();
  } else {
    createAuthWindow();
    authWindow.loadURL(AUTHORIZATION_URL);
  }
};

// TODO: If login window is closed, quit app. If main window is closed, just close window.
const createMainWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 400, height: 400 });
  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'build/index.html')}`);

  // Register keyboard shortcuts.
  globalShortcut.register('mediaplaypause', () => {
    mainWindow.webContents.send('mediaplaypause');
  });
  globalShortcut.register('mediaprevioustrack', () => {
    mainWindow.webContents.send('mediaprevioustrack');
  });
  globalShortcut.register('medianexttrack', () => {
    mainWindow.webContents.send('medianexttrack');
  });

  // Transmit accessToken to the renderer
  mainWindow.webContents.send('user-authenticated', userStore.get('accessToken'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
};

const createAuthWindow = () => {
  authWindow = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  authWindow.loadURL(AUTHORIZATION_URL);
  authWindow.webContents.on('did-finish-load', () => {
    authWindow.show();
  });

  const handleRedirect = (details) => {
    const uri = url.parse(details.url);
    const hash  = uri.hash.substr(1);
    accessToken = queryString.parse(hash).access_token;
    // Store the access token
    userStore.set('accessToken', accessToken);

    authWindow.close();
    createMainWindow();
  };

  const filter = {
    urls: [`${process.env.SOUNDCLOUD_REDIRECT_URI}*`]
  };
  // In an ideal world, we'd only need the first handler; the second is unique to our redirect uri
  session.defaultSession.webRequest.onBeforeRedirect(filter, handleRedirect);
  session.defaultSession.webRequest.onErrorOccurred(filter, handleRedirect);

  // TODO: If auth window is closed manually, quit app
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initApp);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    initApp();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
