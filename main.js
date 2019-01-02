const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Module to register keyboard shortcuts.
const globalShortcut = electron.globalShortcut;

const path = require('path');
const url = require('url');
const queryString = require('query-string');

const { SOUNDCLOUD_API } = require('./src/constants');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let authWindow;

const createWindow = () => {
  let contents;

  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  globalShortcut.register('mediaplaypause', () => {
    mainWindow.webContents.send('mediaplaypause');
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  // authWindow = new BrowserWindow({
  //   width: 600,
  //   height: 600,
  //   frame: false,
  //   webPreferences: {
  //     nodeIntegration: false,
  //     webSecurity: false,
  //   },
  // });

  // authWindow.loadURL(`${SOUNDCLOUD_API.AUTH_ENDPOINT}&client_id=${SOUNDCLOUD_API.CLIENT_ID}&redirect_uri=${encodeURIComponent(SOUNDCLOUD_API.REDIRECT_URI)}`);
  // authWindow.show();

  // contents = authWindow.webContents;

  // contents.on('did-get-redirect-request', (e, oldUrl, newUrl) => {
  //   const hashVars = queryString.parse(url.parse(newUrl).hash);
  //   let accessToken;

  //   if (!hashVars.access_token) {
  //     return false;
  //   }

  //   accessToken = hashVars.access_token;
  //   authWindow.destroy();
  //   console.log(accessToken);
  // });
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
