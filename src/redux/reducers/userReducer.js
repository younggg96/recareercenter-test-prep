import {
  CHANGE_DAILY_PRACTICES,
  CHANGE_EXAM_DATE,
  SET_START_DAY,
  USER_LOGIN,
  USER_LOGOUT,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  userData: {
    userName: "Yang",
    email: "yangguanggeng960123@gmail.com",
    examTargetDate: new Date("December 17, 2021"),
    dailyTarget: 150,
    finishedQuestions: 60,
    startDay: new Date("January 01, 2021"),
  },
  signIn: true,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, userData: action.payload };
    case USER_LOGOUT:
      return { ...state, signIn: action.payload };
    case CHANGE_DAILY_PRACTICES:
      return {
        userData: { ...state.userData, dailyTarget: action.payload },
        signIn: state.signIn,
      };
    case CHANGE_EXAM_DATE:
      return {
        userData: { ...state.userData, examTargetDate: action.payload },
        signIn: state.signIn,
      };
    case SET_START_DAY:
      return {
        userData: { ...state.userData, startDay: action.payload },
        signIn: state.signIn,
      };
    default:
      return state;
  }
};
