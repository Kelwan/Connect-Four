
var electron = require('electron');

electron.app.on('ready',function() {
  let mainWindow = new electron.BrowserWindow({widow: 600, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
