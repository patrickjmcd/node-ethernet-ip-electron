import { SET_PLC_IPADDRESS, PLC_DATA_RECEIVED } from "../actions/types";

const plcReducers = (state={}, action) => {
	switch(action.type){
	case SET_PLC_IPADDRESS:
		return { ...state, ipAddress: action.payload };

	case PLC_DATA_RECEIVED:
		return { ...state, details: action.payload };

	default:
		return {...state};
	}
};

export default plcReducers;

