import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Header from "../../app/src/components/Header";


describe("Header", () => {
	it("should display a nav item", () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find("nav")).toHaveLength(1);
	});
});