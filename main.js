const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Module to register keyboard shortcuts.
const globalShortcut = electron.globalShortcut;
// Module to access session (and requests).
const session = electron.session;

const path = require('path');
const url = require('url');
const queryString = require('query-string');
const isDev = require('electron-is-dev');

const UserStore = require('./src/data/UserStore');

const { SOUNDCLOUD_API, CONFIG_FILENAME } = require('./src/constants');

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

// TODO: Change flow: Check if they're logged in. If no, show login window; if yes, show main window.
// TODO: If login window is closed, quit app. If main window is closed, just close window.
const createWindow = () => {
  let contents;

  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 400, height: 400 });

  // and load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile('build/index.html');
  }

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

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  authWindow = new BrowserWindow({
    width: 600,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  // const soundcloudAuthUrl = `https://soundcloud.com/connect?&client_id=${SOUNDCLOUD_API.CLIENT_ID}&redirect_uri=${encodeURIComponent(SOUNDCLOUD_API.REDIRECT_URI)}&response_type=token`;
  const authUrl = `https://soundcloud.com/connect?client_id=${SOUNDCLOUD_API.CLIENT_ID}&response_type=code_and_token&scope=non-expiring&display=next&redirect_uri=${SOUNDCLOUD_API.REDIRECT_URI}`;

  authWindow.loadURL(authUrl);
  authWindow.webContents.on('did-finish-load', () => {
    authWindow.show();
  });

  let accessToken;
  let connectError;
  let authError;
  let closedByUser = true;

  const handleRedirect = (details) => {
    const uri = url.parse(details.url);
    const hash  = uri.hash.substr(1);
console.log(queryString.parse(hash));
    accessToken = queryString.parse(hash).access_token;

    userStore.set('accessToken', accessToken);

    mainWindow.webContents.send('user-authenticated', accessToken);

    closedByUser = false;
    authWindow.close();

    //TODO: Remove login window, replace with main window -- dont worry about closedByUser stuff
  };

  const filter = {
    urls: [SOUNDCLOUD_API.REDIRECT_URI + '*']
  };
  // In an ideal world, we'd only need the first handler; the second is unique to our redirect uri
  session.defaultSession.webRequest.onBeforeRedirect(filter, handleRedirect);
  session.defaultSession.webRequest.onErrorOccurred(filter, handleRedirect);

  authWindow.on('close', (event) => event.returnValue = closedByUser ? { error: 'The popup window was closed.' } : { accessToken, connectError });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
