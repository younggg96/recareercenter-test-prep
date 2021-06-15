import {
  CHANGE_DAILY_PRACTICES,
  CHANGE_EXAM_DATE,
  CHANGE_PASSWORD,
  DO_QUESTION,
  SET_START_DAY,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  userData: {
    userName: "Yang",
    email: "yangguanggeng960123@gmail.com",
    examTargetDate: new Date("December 17, 2021"),
    dailyTarget: 150,
    finishedQuestions: 0,
    startDay: new Date("January 01, 2021"),
  },
  signIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userData: action.payload.userData,
        signIn: action.payload.signIn,
      };
    case USER_LOGOUT:
      return { ...state, userData: null, signIn: false };
    case USER_REGISTER:
      return {
        ...state,
        userName: action.payload.displayName,
        email: action.payload.email,
      };
    case CHANGE_PASSWORD:
      return state;
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
    case DO_QUESTION:
      return {
        ...state,
        userData: {
          ...state.userData,
          finishedQuestions: state.userData.finishedQuestions + 1,
        },
      };
    default:
      return state;
  }
};
