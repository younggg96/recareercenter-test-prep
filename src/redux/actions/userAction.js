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
    if (!response.user.emailVerified) {
      Alert.alert(
        "Your email is not verified, Cannot log in",
        "Please check your mailbox",
        [
          {
            text: "Resend Email",
            onPress: () => response.user.sendEmailVerification(),
            style: "cancel",
          },
          { text: "OK" },
        ]
      );
      return {
        type: USER_LOGIN,
        payload: {
          userData: null,
          signIn: false,
        },
      };
    }
    const req = {
      userData: {
        uid: response.uid,
        userName: response.user.displayName,
        email: response.user.email,
        examTargetDate: new Date("December 19, 2021"),
        practiceStartDate: new Date("January 01, 2021"),
        dailyTarget: 180,
        dailyPractice: 30,
        membership: false,
      },
      signIn: true,
    };
    return {
      type: USER_LOGIN,
      payload: req,
    };
  } catch (err) {
    Alert.alert("Error", `${err.message}`);
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
    Alert.alert("Error", `${err.message}`);
  }
}

export function logout() {
  const req = { userData: null, signIn: false };

  try {
    FirebaseAuth.auth
      .signOut()
      .then(() => {
        Alert.alert("Succeed", "Your account sign out");
      })
      .catch((error) => {
        Alert.alert("Error", `${error.message}`);
      });
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
  return {
    type: USER_LOGOUT,
    payload: req,
  };
}

export function changePassword(email) {
  try {
    FirebaseAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Reset email is sent", "Please check your mailbox.");
      })
      .catch((error) => {
        Alert.alert("Error", `${error.message}`);
      });
    return {
      type: CHANGE_PASSWORD,
    };
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
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
