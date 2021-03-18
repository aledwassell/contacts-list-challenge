const {app, BrowserWindow} = require('electron');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    backgroundColor: '#fff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
  });

  win.loadURL(`file://${__dirname}/dist/aledAddressBook/index.html`);

  // Uncomment if you want the devtools to be open when the app initializes.
  // win.webContents.openDevTools();

  win.on('closed', () => win = null);
};

/** Create a new window when the Electron app is initialized. */
app.on('ready', createWindow);

/** Quit the application when all the windows are closed. */
app.on('window-all-closed', () => {
  // Mac OS specific rule.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});


