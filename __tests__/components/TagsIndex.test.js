import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import { TagsIndex } from "../../app/src/components/TagsIndex";

describe("TagsIndex", () => {
	let container;
	beforeEach(() => {
		null;
	});

	it("should display a div for no tags found", () => {
		container = shallow(<TagsIndex plc={{}} tags={[]} />);
		expect(container.find(".tags-index-notags")).toHaveLength(1);
	});

	describe("when tags are found", () => {
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

		const writeTag = jest.fn();

		beforeEach(() => {
			container = shallow(<TagsIndex plc={plcTestData} tags={testTagList} writeTag={writeTag} />);
		});
		

		it("should display a div for tags found", () => {
			expect(container.find(".tags-index-withtags")).toHaveLength(1);
		});

		it("should render 1 row for each tag", () => {
			expect(container.find(".tags-index-withtags table tbody tr")).toHaveLength(2);
		});

		it("should render 1 gauge for each tag", () => {
			expect(container.find(".tags-index-withtags .row .tag-gauge")).toHaveLength(2);
		});

		it("should display a plc IP address", () => {
			expect(container.find(".tags-index-withtags h2").text()).toMatch("192.168.1.10");
		});

		it("should update state on changing write value", () => {
			container.find(".tag-write-input").first().simulate("change", {target: {value: 111.1}});
			expect(container.state().writes["test1"]).toEqual(111.1);
		});

		it("should run the writeTag function when clicking Write", () => {
			container.find(".tag-write-input").first().simulate("change", {target: {value: 111.1}});
			container.find(".tag-write-button").first().simulate("click", {preventDefault: jest.fn()});
			expect(writeTag).toHaveBeenCalled();
		});
	});
});