import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import PlcReducer from "../../app/src/reducers/reducer_plc";
import { SET_PLC_IPADDRESS, PLC_DATA_RECEIVED } from "../../app/src/actions/types";

describe("PlcReducer", () => {
	it("should not change state on unused type", () => {
		expect(PlcReducer({test: "test"}, {})).toEqual({test: "test"});
	});

	it("should return a default empty object", () => {
		expect(PlcReducer(undefined, "test")).toEqual({});
	});

	describe("SET_PLC_IPADDRESS", ()=>{
		const action = {
			type: SET_PLC_IPADDRESS,
			payload: "192.168.1.10"
		};

		it("should add ip address to state", ()=> {
			const state = PlcReducer({}, action);
			expect(state.ipAddress).toEqual(action.payload);
		});
	});

	describe("PLC_DATA_RECEIVED", ()=>{
		const action = {
			type: PLC_DATA_RECEIVED,
			payload: {name: "test"}
		};

		it("should add details to state", ()=> {
			const state = PlcReducer({}, action);
			expect(state.details).toEqual(action.payload);
		});
	});
});