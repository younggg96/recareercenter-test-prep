import {
  CHANGE_DAILY_PRACTICES,
  CHANGE_EXAM_DATE,
  SET_START_DAY,
  USER_LOGIN,
  USER_LOGOUT,
  CHANGE_PASSWORD,
  DO_QUESTION,
  USER_REGISTER,
} from "./actionTypes";

import FirebaseAuth from "../../firebase/index";
import { Alert } from "react-native";

export async function login(email, password) {
  try {
    const response = await FirebaseAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    const req = {
      userData: {
        userName: response.user.displayName,
        email: response.user.email,
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
  } catch (err) {
    alert(err);
  }
}

export async function register(email, password, username) {
  try {
    const response = await FirebaseAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await response.user.updateProfile({
      displayName: username,
    });
    if (!response.user.emailVerified) {
      Alert.alert(
        "Success!",
        "We already sent you an email for verification, free to check and then log in."
      );
      response.user.sendEmailVerification();
    }
    return {
      type: USER_REGISTER,
      payload: response.user,
    };
  } catch (err) {
    alert(err);
  }
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
    type: DO_QUESTION,
  };
}
