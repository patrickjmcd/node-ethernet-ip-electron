// Basic init
const electron = require('electron')
const { Controller, Tag } = require('ethernet-ip');
const _ = require('lodash');
const { app, BrowserWindow, ipcMain } = electron

// To avoid being garbage collected
let mainWindow;
let PLC;

app.on('ready', () => {

    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
})

function initPLC(ipAddress, tagList){
  PLC = new Controller();

  const setupTags = new Promise ((resolve, reject) =>{
    resolve(_.map(tagList, (tag) => {
      PLC.subscribe(new Tag( tag.name ));
    }))
  })

  setupTags.then(()=>{
    PLC.connect(ipAddress, 0).then( () => {
      mainWindow.webContents.send('plc:connected', PLC.properties);
      PLC.scan().catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })

    PLC.forEach( (tag) => {
      tag.on("Initialized", (tag) => {
        console.log("main_process: Initialized", tag.name, tag.value);
        mainWindow.webContents.send('tag:valueupdate', tag);
      })

      tag.on("Changed", (tag, oldValue) => {
        console.log("main_process: Changed", tag.name, tag.value);
        mainWindow.webContents.send('tag:valueupdate', tag);
      })
    })
  })
}



ipcMain.on('tag:sync', (event, tagList) => {
  console.log("tag:sync", tagList);
  initPLC(testIpAddress, tagList);
})

ipcMain.on('plc:initialize', (event, ipAddress, tagList) =>{
  console.log("plc:initialize", ipAddress, tagList);
  initPLC(ipAddress, tagList);
})


// ipcMain.on('tag:added', (event, tagData) => {
//   const { tags, ipAddress } = tagData;
//   PLC = new Controller();
//   if(tags.length > 0){
//     _.forEach(tags, (tag) => {
//       PLC.subscribe(new Tag(tag.tag));
//     });
//
//     PLC.connect(ipAddress, 0).then( () => {
//       PLC.scan();
//     }).catch(err => {
//       console.log(err);
//       // console.log(PLC);
//     });
//
//     PLC.forEach( (tag) => {
//       tag.on("Initialized", (tag) => {
//         console.log("Initialized", tag.value);
//         mainWindow.webContents.send('tag:valueupdate', tag);
//       })
//
//       tag.on("Changed", (tag, oldValue) => {
//         mainWindow.webContents.send('tag:valueupdate', tag);
//       })
//     })
//   };
// })
