import { combineReducers } from 'redux';
import userReducer from './userReducer';
import settingReducer from './settingReducer'

const rootReducer = combineReducers({
  userReducer,
  settingReducer
});

export default rootReducer;