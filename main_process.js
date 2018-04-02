// Basic init
const electron = require("electron");
const { Controller, Tag } = require("ethernet-ip");
const _ = require("lodash");
const { app, BrowserWindow, ipcMain } = electron;

// To avoid being garbage collected
let mainWindow;
let PLC;

app.on("ready", () => {

	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

function initPLC(ipAddress, tagList){
	PLC = new Controller();

	const setupTags = new Promise ((resolve) =>{
		resolve(_.map(tagList, (tag) => {
			PLC.subscribe(new Tag( tag.name ));
		}));
	});

	setupTags.then(()=>{
		PLC.connect(ipAddress, 0).then( () => {
			mainWindow.webContents.send("plc:connected", PLC.properties);
			PLC.scan().catch((err) => {
				console.log(err);
			});
		}).catch((err) => {
			console.log(err);
		});

		PLC.forEach( (tag) => {
			tag.on("Initialized", (tag) => {
				console.log("main_process: Initialized", tag.name, tag.value);
				mainWindow.webContents.send("tag:valueupdate", tag);
			});

			tag.on("Changed", (tag) => {
				console.log("main_process: Changed", tag.name, tag.value);
				mainWindow.webContents.send("tag:valueupdate", tag);
			});
		});
	});
}


ipcMain.on("plc:initialize", (event, ipAddress, tagList) =>{
	console.log("plc:initialize", ipAddress, tagList);
	initPLC(ipAddress, tagList);
});

ipcMain.on("tag:write", (event, tagName, value) => {
	console.log("tag:write", tagName, value);
});

