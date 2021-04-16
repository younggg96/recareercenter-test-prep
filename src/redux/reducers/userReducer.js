import { USER_LOGIN } from "../actions/actionTypes";

const INITIAL_STATE = { user: "", signIn: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};