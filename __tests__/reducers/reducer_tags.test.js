import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import TagsReducer from "../../app/src/reducers/reducer_tags";
import { IPC_TAGUPDATE, STORE_NEW_TAG, DELETE_TAG } from "../../app/src/actions/types";

describe("PlcReducer", () => {
	it("should not change state on unused type", () => {
		expect(TagsReducer({test: "test"}, "test")).toEqual({test: "test"});
	});

	it("should return a default empty object", () => {
		expect(TagsReducer(undefined, "test")).toEqual({});
	});

	describe("IPC_TAGUPDATE", () => {
		const action = {
			type: IPC_TAGUPDATE,
			payload: { name: "test", value: 111.111 }
		};

		it("should store a new value for a new tag", () => {
			const newState = TagsReducer({}, action);
			expect(newState).toEqual({ test: { name: "test", value: 111.111 }});
		});

		it("should store a new value for an existing tag", () => {
			const existingState = { test: { name: "test", value: 0.00 }};
			const newState = TagsReducer(existingState, action);
			expect(newState).toEqual({test: { name: "test", value: 111.111 }});
		});
	});

	describe("STORE_NEW_TAG", () => {
		const action = {
			type: STORE_NEW_TAG,
			payload: "test"
		};

		it("should create a new object for a new tag", () => {
			const newState = TagsReducer({}, action);
			expect(newState).toEqual({ test: { name: "test" }});
		});
	});

	describe("DELETE_TAG", () => {
		const action = {
			type: DELETE_TAG,
			payload: "test"
		};

		it("should remove the object in state with the key in the payload", () => {
			const initialState = { 
				test: { name: "test", value: 10.0 }, 
				remain: { name: "remain", value: 1000 }
			};
			const newState = TagsReducer(initialState, action);
			expect(newState).toEqual({ remain: { name: "remain", value: 1000 } });
		});
	});

});