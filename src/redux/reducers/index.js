import { combineReducers } from "redux";
import userReducer from "./userReducer";
import settingReducer from "./settingReducer";
import { dicReducer } from "./dicReducer";

const rootReducer = combineReducers({
  userReducer,
  settingReducer,
  dicReducer,
});

export default rootReducer;
