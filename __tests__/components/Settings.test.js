import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import { Settings } from "../../app/src/components/Settings";

describe("Settings", () => {
	let container;
	const testTagList = [
		{
			name: "test1",
			value: 100
		},
		{
			name: "test2",
			value: 200
		}
	];

	const plcTestData = {
		details: {
			name: "test PLC"
		},
		ipAddress: "192.168.1.10"
	};

	const setPlcIpAddress = jest.fn((ipAddress) => ipAddress);
	const storeNewTag = jest.fn((tagName) => tagName);
	const deleteTag = jest.fn((tagName) => tagName);
	const ipcPlcInitializeSend = jest.fn((addr, tagList) => {
		return {addr, tagList};
	});


	beforeEach(() => {
		container = shallow(
			<Settings 
				plc={plcTestData} 
				tags={testTagList}
				setPlcIpAddress={setPlcIpAddress}
				storeNewTag={storeNewTag}
				deleteTag={deleteTag}
				ipcPlcInitializeSend={ipcPlcInitializeSend}
				history={[]}
			/>);
	});

	it("should display a settings item", () => {
		expect(container.find(".settings")).toHaveLength(1);
	});

	describe("ip address field", () => {
		it("should update state when ip address changed", () => {
			container.find(".ip-address-field").simulate("change", {target: {value: "1.1.1.1"}});
			expect(container.state().ipAddress).toEqual("1.1.1.1");
		});

		it("should run the setPlcIpaddress function when update clicked", () =>{
			container.find(".ip-address-field").simulate("change", {target: {value: "1.1.1.1"}});
			container.find(".ip-submit-button").simulate("click", {preventDefault: jest.fn()});
			expect(setPlcIpAddress).toHaveBeenCalled();
		});
	});

	describe("tag list", () => {
		it("should have one row for each tag", () => {
			expect(container.find(".tag-list table tbody tr")).toHaveLength(2);
		});

		it("should update state when new tag input changed", () => {
			container.find(".tag-name-input").simulate("change", {target: {value: "testtag"}});
			expect(container.state().newTag).toEqual("testtag");
		});

		it("should run the storeNewTag function on submit button click", () => {
			container.find(".tag-name-input").simulate("change", {target: {value: "testtag"}});
			container.find(".add-tag-button").simulate("click", {preventDefault: jest.fn()});
			expect(storeNewTag).toHaveBeenCalled();
		});

		it("should run the ipcPlcInitializeSend function on save button click", () => {
			container.find(".ip-address-field").simulate("change", {target: {value: "1.1.1.1"}});
			container.find(".ip-submit-button").simulate("click", {preventDefault: jest.fn()});
			container.find(".tag-name-input").simulate("change", {target: {value: "testtag"}});
			container.find(".add-tag-button").simulate("click", {preventDefault: jest.fn()});
			container.find(".save-button").simulate("click", {preventDefault: jest.fn()});
			expect(ipcPlcInitializeSend).toHaveBeenCalled();
		});

		it("should run the deleteTag function on delete button click", () => {
			container.find(".delete-button").first().simulate("click", {preventDefault: jest.fn()});
			expect(deleteTag).toHaveBeenCalled();
		});
	});
    
});