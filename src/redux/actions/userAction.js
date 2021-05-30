import {
  CHANGE_DAILY_PRACTICES,
  CHANGE_EXAM_DATE,
  SET_START_DAY,
  USER_LOGIN,
  USER_LOGOUT,
  CHANGE_PASSWORD,
  DO_QUESTION,
} from "./actionTypes";

export function login(email, password) {
  // const req = firebaseAuth.login(email, password);
  const req = {
    userData: {
      userName: "aaa",
      email: "yang960123@gmail.com",
      examTargetDate: new Date("December 19, 2021"),
      dailyTarget: 180,
      finishedQuestions: 30,
    },
    signIn: true,
  };
  return {
    type: USER_LOGIN,
    payload: req,
  };
}

export function logout() {
  // const req = firebaseAuth.login(email, password);
  const req = { userData: null, signIn: false };
  return {
    type: USER_LOGOUT,
    payload: req,
  };
}

export function changePassword(password) {
  // const req = firebaseAuth.login(email, password);
  return {
    type: CHANGE_PASSWORD,
    payload: req,
  };
}

export function changeDailyPractices(numInput) {
  return {
    type: CHANGE_DAILY_PRACTICES,
    payload: numInput,
  };
}

export function changeExamDate(dateObj) {
  return {
    type: CHANGE_EXAM_DATE,
    payload: dateObj,
  };
}

export function setStartDay(dateObj) {
  return {
    type: SET_START_DAY,
    payload: dateObj,
  };
}

export function doQuestion() {
  return {
    type: DO_QUESTION
  };
}