const { app, BrowserWindow, shell } = require('electron');
const path = require('node:path');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 430,
    height: 900,
    minWidth: 360,
    minHeight: 640,
    backgroundColor: '#fff5f8',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  const devUrl = process.argv.includes('--serve') ? 'http://127.0.0.1:3000' : undefined;
  if (devUrl) window.loadURL(devUrl);
  else window.loadFile(path.join(__dirname, '..', 'web-dist', 'index.html'));
  window.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
};

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
