import {
  CHANGE_DAILY_PRACTICES,
  CHANGE_EXAM_DATE,
  SET_START_DAY,
  USER_LOGIN,
  USER_LOGIN_WITH_CACHE,
  USER_LOGIN_WITH_GOOGLE,
  USER_LOGOUT,
  CHANGE_PASSWORD,
  DO_QUESTION,
  USER_REGISTER,
} from "./actionTypes";

import FirebaseAuth from "../../firebase/index";
import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { getValueFormStore, setValueToStore } from "../../storage";
import { USER_AUTH_INFO } from "../../storage/keys";

// alerts
const successSubmitAlert = (date) =>
  Alert.alert(
    "Your Start Day Changed",
    `${date.toISOString().substring(0, 10)}`,
    [{ text: "OK", style: "default" }]
  );

const successChangeTargetNumAlert = (targetPractice) =>
  Alert.alert(
    "Your Daily Practice Changed",
    `${targetPractice}`,
    [{ text: "OK", style: "default" },]
  );

const successChangeExamDateAlert = (examDate) =>
  Alert.alert(
    "Your Exam Date Changed",
    `${examDate.toISOString().substring(0, 10)}`,
    [{ text: "OK", style: "default" }]
  );

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
    const res = await axios.get(BASE_URL + `/users/findUser?uid=${response.user.uid}`);
    const userInfo = { email: response.user.email, displayName: response.user.displayName }
    const payload = {
      userData: Object.assign(res.data, userInfo),
      signIn: true,
    };
    await setValueToStore(USER_AUTH_INFO, JSON.stringify({ uid: response.user.uid, userInfo }))
    return {
      type: USER_LOGIN,
      payload: payload,
    };
  } catch (err) {
    Alert.alert("Error", `${err.message}`);
  }
}

export async function loginWithGoogle(uid, email, displayName) {
  try {
    let res = await axios.get(BASE_URL + `/users/findUser?uid=${uid}`);
    // dont find user id in database, register a new user
    if (!res.data) {
      const response = await FirebaseAuth.auth.createUserWithEmailAndPassword(
        email,
        '00000000'
      );
      await response.user.updateProfile({
        displayName
      });
      res = await axios.post(BASE_URL + `/users/createUser?uid=${uid}`);
    }
    const userInfo = { email, displayName }
    const payload = {
      userData: Object.assign(res.data, userInfo),
      signIn: true,
    };
    await setValueToStore(USER_AUTH_INFO, JSON.stringify({ uid, userInfo }))
    return {
      type: USER_LOGIN_WITH_GOOGLE,
      payload: payload,
    };
  } catch (err) {
    Alert.alert("Error", `${err.message}`);
  }
}

export async function loginWithCache(userObj) {
  const res = await axios.get(BASE_URL + `/users/findUser?uid=${userObj.uid}`);
  console.log(res.data)
  const payload = {
    userData: Object.assign(res.data, userObj.userInfo),
    signIn: true,
  };
  return {
    type: USER_LOGIN_WITH_CACHE,
    payload: payload,
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
    const res = await axios.post(BASE_URL + `/users/createUser?uid=${response.user.uid}`);
    const payload = Object.assign(res.data, { uid: response.user.uid, email: response.user.email, displayName: response.user.displayName });
    if (!response.user.emailVerified) {
      Alert.alert(
        "Success!",
        "We already sent you an email for verification, free to check and then log in."
      );
      response.user.sendEmailVerification();
    }
    return {
      type: USER_REGISTER,
      payload: payload,
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

export async function changeDailyPractices(numInput, uid) {
  try {
    const res = await axios.put(BASE_URL + `/users/updateTargetPractice?uid=${uid}&practice=${numInput}`)
    if (res) {
      successChangeTargetNumAlert(numInput);
      return {
        type: CHANGE_DAILY_PRACTICES,
        payload: numInput,
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function changeExamDate(dateObj, uid) {
  try {
    const res = await axios.put(BASE_URL + `/users/updateExamStartDate?uid=${uid}&date=${dateObj.toISOString().slice(0, 10)}`)
    if (res) {
      successChangeExamDateAlert(dateObj);
      return {
        type: CHANGE_EXAM_DATE,
        payload: dateObj,
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function setStartDay(dateObj, uid) {
  try {
    const res = await axios.put(BASE_URL + `/users/updatePracticeStartDate?uid=${uid}&date=${dateObj.toISOString().slice(0, 10)}`)
    if (res) {
      successSubmitAlert(dateObj);
      return {
        type: SET_START_DAY,
        payload: dateObj,
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function doQuestion(uid) {
  try {
    const res = await axios.post(BASE_URL + `/users/addPractice?uid=${uid}`)
    if (res) {
      return {
        type: DO_QUESTION,
        payload: res.data
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function changeMembershipStatus(userData) {
  try {
    if (userData) {
      return {
        type: DO_QUESTION,
        payload: userData
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}