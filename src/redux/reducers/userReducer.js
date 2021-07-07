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
    uid: "",
    userName: "",
    email: "",
    examStartDate: new Date(),
    targetPractice: 0,
    dailyPractice: 0,
    practiceStartDate: new Date(),
    membership: false,
    totalPractice: 0,
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
      console.log(action.payload)
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
        userData: {
          ...state.userData,
          dailyPractice: state.userData.dailyPractice + 1,
        },
      };
    default:
      return state;
  }
};
