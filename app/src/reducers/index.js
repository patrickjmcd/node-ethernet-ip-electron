import { combineReducers } from 'redux';

import TagsReducer from './reducer_tags';
import PlcReducer from './reducer_plc';

const rootReducer = combineReducers({
  tags: TagsReducer,
  plc: PlcReducer
});



export default rootReducer;
