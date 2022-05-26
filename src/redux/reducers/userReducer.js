import {
  CHANGE_DAILY_PRACTICES,
  CHANGE_EXAM_DATE,
  CHANGE_PASSWORD,
  DO_QUESTION,
  SET_START_DAY,
  USER_LOGIN,
  USER_LOGIN_WITH_GOOGLE,
  USER_LOGIN_WITH_APPLE,
  USER_LOGIN_WITH_CACHE,
  USER_LOGOUT,
  USER_REGISTER,
  CHANGE_MEMBERSHIP,
  UPDATE_PROFILE,
  SET_NOTIFICATION
} from "../actions/actionTypes";

const INITIAL_STATE = {
  userData: {
    id: "",
    membership: 1,
    dailyPractice: 0,
    targetPractice: 0,
    totalPractice: 0,
    examStartDate: new Date(),
    practiceStartDate: new Date(),
    token: "",
    uid: "",
    userName: "",
    email: "",
    notification: {
      status: false,
      time: {
        hours: 0,
        mins: 0,
      }
    }
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
    case USER_LOGIN_WITH_GOOGLE:
      return action.payload;
    case USER_LOGIN_WITH_APPLE:
      return action.payload;
    case USER_LOGIN_WITH_CACHE:
      return action.payload;
    case USER_LOGOUT:
      return { ...state, userData: null, signIn: false };
    case USER_REGISTER:
      return {
        ...state,
        uid: action.payload.uid,
        userName: action.payload.displayName,
        email: action.payload.email,
        examStartDate: new Date(action.payload.examStartDate),
        practiceStartDate: new Date(action.payload.practiceStartDate),
        membership: action.payload.membership,
        targetPractice: action.payload.targetPractice,
        dailyPractice: action.payload.dailyPractice,
        totalPractice: action.payload.totalPractice
      };
    case CHANGE_MEMBERSHIP:
      return {
        ...state,
        userData: action.payload
      };
    case CHANGE_PASSWORD:
      return state;
    case CHANGE_DAILY_PRACTICES:
      return {
        userData: { ...state.userData, targetPractice: action.payload },
        signIn: state.signIn,
      };
    case CHANGE_EXAM_DATE:
      return {
        userData: { ...state.userData, examStartDate: action.payload },
        signIn: state.signIn,
      };
    case SET_START_DAY:
      return {
        userData: { ...state.userData, practiceStartDate: action.payload },
        signIn: state.signIn,
      };
    case DO_QUESTION:
      return {
        ...state,
        userData: { ...state.userData, dailyPractice: action.payload.dailyPractice, totalPractice: action.payload.totalPractice}
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload
        }
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        userData: {
          ...state.userData,
          notification: {
            ...state.userData.notification,
            status: action.payload
          }
        }
      };
    default:
      return state;
  }
};
