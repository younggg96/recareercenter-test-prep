import { USER_LOGIN, USER_LOGOUT } from "../actions/actionTypes";

const INITIAL_STATE = { userData: {user: 'aaaa', signIn: false, examTargetDate: new Date('December 17, 2021')} };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, userData: action.payload };
    case USER_LOGOUT:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
