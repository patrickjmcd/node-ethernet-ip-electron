import { ipcRenderer } from "electron";
import { IPC_TAGUPDATE, IPC_TAGSYNC, SET_PLC_IPADDRESS, INITIALIZE_PLC, PLC_DATA_RECEIVED, STORE_NEW_TAG, DELETE_TAG, WRITE_TAG } from "../actions/types";

export function ipcTagUpdate(event, tag){
	return {
		type: IPC_TAGUPDATE,
		payload: tag.state.tag
	};
}

export function ipcTagSync(ipAddress, tagList){
	ipcRenderer.send("tag:sync", ipAddress, tagList);
	return {
		type: IPC_TAGSYNC,
		payload: true
	};
}

export function setPlcIpAddress(ipAddress){
	return {
		type: SET_PLC_IPADDRESS,
		payload: ipAddress
	};
}

export function ipcPlcInitializeSend(ipAddress, tagList){
	ipcRenderer.send("plc:initialize", ipAddress, tagList);
	return {
		type: INITIALIZE_PLC,
		payload: true
	};
}

export function ipcPlcDetailsReceived(event, plcData){
	return {
		type: PLC_DATA_RECEIVED,
		payload: plcData
	};
}

export function storeNewTag(tag){
	return {
		type: STORE_NEW_TAG,
		payload: tag
	};
}

export function deleteTag(tagName){
	return {
		type: DELETE_TAG,
		payload: tagName
	};
}


export function writeTag(tagName, value){
	ipcRenderer.send("tag:write", tagName, value);

	return {
		type: WRITE_TAG,
		payload: true
	};
}