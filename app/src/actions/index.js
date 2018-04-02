import { ipcRenderer } from "electron";

export const IPC_TAGUPDATE = "IPC_TAGUPDATE";
export const IPC_TAGSYNC = "IPC_TAGSYNC";

export const SET_PLC_IPADDRESS = "SET_PLC_IPADDRESS";
export const INITIALIZE_PLC = "INITIALIZE_PLC";
export const PLC_DATA_RECEIVED = "PLC_DATA_RECEIVED";
export const STORE_NEW_TAG = "STORE_NEW_TAG";
export const DELETE_TAG = "DELETE_TAG";
export const WRITE_TAG = "WRITE_TAG";

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