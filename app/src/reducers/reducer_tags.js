import _ from "lodash";
import { IPC_TAGUPDATE, STORE_NEW_TAG, DELETE_TAG } from "../actions/types";


export default function(state = {}, action){
	switch (action.type) {
	case IPC_TAGUPDATE:
		const { name, value } = action.payload;
		return { ...state, [name]: {  name, value }};

	case STORE_NEW_TAG:
		const newTagName = action.payload;
		return { ...state, [newTagName]: { name: newTagName }};

	case DELETE_TAG:
		return _.omit(state, action.payload);

	default:
		return state;
	}
}
