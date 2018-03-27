// Basic init
const electron = require('electron')
const { Controller, Tag } = require('ethernet-ip');
const _ = require('lodash');
const { app, BrowserWindow, ipcMain } = electron

console.log(process.version)
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow
let PLC

app.on('ready', () => {

    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

})

ipcMain.on('tag:added', (event, tagData) => {
  const { tags, ipAddress } = tagData;
  PLC = new Controller();
  if(tags.length > 0){
    _.forEach(tags, (tag) => {
      PLC.subscribe(new Tag(tag.tag));
    });

    PLC.connect(ipAddress, 0).then( () => {
      PLC.scan();
    }).catch(err => {
      console.log(err);
      // console.log(PLC);
    });

    PLC.forEach( (tag) => {
      tag.on("Initialized", (tag) => {
        console.log("Initialized", tag.value);
        mainWindow.webContents.send('tag:valueupdate', tag);
      })

      tag.on("Changed", (tag, oldValue) => {
        mainWindow.webContents.send('tag:valueupdate', tag);
      })
    })
  };
})
