import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import { ipcTagUpdate, ipcTagSync, setPlcIpAddress, ipcPlcInitializeSend, ipcPlcDetailsReceived, storeNewTag, deleteTag, writeTag } from "../../app/src/actions";
import { IPC_TAGUPDATE, IPC_TAGSYNC, SET_PLC_IPADDRESS, INITIALIZE_PLC, PLC_DATA_RECEIVED, STORE_NEW_TAG, DELETE_TAG, WRITE_TAG } from "../../app/src/actions/types";



describe("actions", () => {

	describe("ipcTagUpdate", ()=> {
		let action;
		const testTag = {
			state: {
				tag: "TESTTAG"
			}
		};

		beforeEach(() => {
			action = ipcTagUpdate(null, testTag);
		});

		it("has the correct type", () => {
			expect(action.type).toEqual(IPC_TAGUPDATE);
		});

		it("has the correct payload", () =>{
			expect(action.payload).toEqual("TESTTAG");
		});
	});

	describe("ipcTagSync", ()=> {

		let action;
		beforeEach(() => {
			action = ipcTagSync("192.168.1.10", []);
		});

		it("has the correct type", () => {
			expect(action.type).toEqual(IPC_TAGSYNC);
		});

		it("has the correct payload", () => {
			expect(action.payload).toBeTruthy();
		});
	});

	describe("setPLCIpAddress", () => {
		let action;
		beforeEach(() => {
			action = setPlcIpAddress("192.168.1.10");
		});

		it("has the correct type", () => {

			expect(action.type).toEqual(SET_PLC_IPADDRESS);
		});

		it("has the correct payload", () => {
			expect(action.payload).toEqual("192.168.1.10");
		});
	});

	describe("ipcPlcInitializeSend", ()=> {

		let action;
		beforeEach(() => {
			action = ipcPlcInitializeSend("192.168.1.10", []);
		});

		it("has the correct type", () => {
			expect(action.type).toEqual(INITIALIZE_PLC);
		});

		it("has the correct payload", () => {
			expect(action.payload).toBeTruthy();
		});
	});

	describe("ipcPlcDetailsReceived", ()=> {

		let action;
		beforeEach(() => {
			action = ipcPlcDetailsReceived(null, {test: "test"});
		});

		it("has the correct type", () => {
			expect(action.type).toEqual(PLC_DATA_RECEIVED);
		});

		it("has the correct payload", () => {
			expect(action.payload).toEqual({test: "test"});
		});
	});

	describe("storeNewTag", ()=> {

		let action;
		beforeEach(() => {
			action = storeNewTag({test: "test"});
		});

		it("has the correct type", () => {
			expect(action.type).toEqual(STORE_NEW_TAG);
		});

		it("has the correct payload", () => {
			expect(action.payload).toEqual({test: "test"});
		});
	});

	describe("deleteTag", ()=> {

		let action;
		beforeEach(() => {
			action = deleteTag({test: "test"});
		});

		it("has the correct type", () => {
			expect(action.type).toEqual(DELETE_TAG);
		});

		it("has the correct payload", () => {
			expect(action.payload).toEqual({test: "test"});
		});
	});

	describe("writeTag", ()=> {

		let action;
		beforeEach(() => {
			action = writeTag({test: "test"});
		});

		it("has the correct type", () => {
			expect(action.type).toEqual(WRITE_TAG);
		});

		it("has the correct payload", () => {
			expect(action.payload).toBeTruthy();
		});
	});
});