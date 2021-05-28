import { combineReducers } from "redux";
import userReducer from "./userReducer";
import settingReducer from "./settingReducer";
import { dicReducer } from "./dicReducer";
import { questionReducer } from "./questionReducer";

const rootReducer = combineReducers({
  userReducer,
  settingReducer,
  dicReducer,
  questionReducer,
});

export default rootReducer;
