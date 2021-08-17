import {
  SAVE_QUESTION,
  GET_RESULT,
  UNSAVE_QUESTION,
  UNSAVE_QUESTION_RETURN_WITH_DETAIL,
  GET_QUIZ_RESULT,
  REFRESH_QUIZ,
  REFRESH_QUESTIONDATA,
  SAVED_QUESTION_ID_LIST,
  SAVED_QUESTIONS_LIST,
  ADD_STATUS_QUESTION,
  GET_STATUS_QUESTION,
} from "./actionTypes";

import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { addStatusQuestion, getStatusQuestions } from "../../helper/api";

export function getResult(itemRes, currentQuestion) {
  return {
    type: GET_RESULT,
    payload: { itemRes, currentQuestion },
  };
}

export function getQuizResult(itemRes2, currentQuestion2) {
  return {
    type: GET_QUIZ_RESULT,
    payload: { itemRes2, currentQuestion2 },
  };
}

export async function refreshQuestionData() {
  try {
    const res = await axios.get(BASE_URL + '/questions/findForExam');
    if (res) {
      // data
      let arr = [];
      res.data.map((item) => {
        arr.push(
          Object.assign({}, item, {
            saved: false,
            result: {
              res: "unfinished",
              pick: null,
            },
          })
        );
      });
      return {
        type: REFRESH_QUESTIONDATA,
        payload: arr
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }

}

export async function refreshQuiz() {
  try {
    const res = await axios.get(BASE_URL + '/questions/findForQuiz')
    if (res) {
      return {
        type: REFRESH_QUIZ,
        payload: res.data
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function saveQuestion(item, uid) {
  try {
    await axios.post(BASE_URL + `/users/saveQuestion?uid=${uid}&qid=${item.id}`);
    const res = await axios.get(BASE_URL + `/users/getSavedQuestionId?uid=${uid}`);
    if (res) {
      return {
        type: SAVE_QUESTION,
        payload: res.data,
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }

}

export async function unsaveQuestionReturnIds(item, uid) {
  try {
    await axios.post(BASE_URL + `/users/deleteQuestion?uid=${uid}&qid=${item.id}`)
    const res = await axios.get(BASE_URL + `/users/getSavedQuestionId?uid=${uid}`);
    if (res) {
      return {
        type: UNSAVE_QUESTION,
        payload: res.data,
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function unsaveQuestionReturnDetails(item, uid) {
  try {
    await axios.post(BASE_URL + `/users/deleteQuestion?uid=${uid}&qid=${item.id}`)
    const res = await axios.get(BASE_URL + `/users/getSavedQuestion?uid=${uid}`);
    if (res) {
      return {
        type: UNSAVE_QUESTION_RETURN_WITH_DETAIL,
        payload: res.data,
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function getSavedQuestionsID(uid) {
  try {
    const res = await axios.get(BASE_URL + `/users/getSavedQuestionId?uid=${uid}`);
    if (res) {
      return {
        type: SAVED_QUESTION_ID_LIST,
        payload: res.data
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function getSavedQuestions(uid) {
  try {
    const res = await axios.get(BASE_URL + `/users/getSavedQuestion?uid=${uid}`);
    if (res) {
      return {
        type: SAVED_QUESTIONS_LIST,
        payload: res.data
      };
    }
  } catch (error) {
    Alert.alert("Error", `${error.message}`);
  }
}

export async function addStatusQuestionReduxStore(obj) {
  const res = await addStatusQuestion(obj);
  if (res) {
    return {
      type: ADD_STATUS_QUESTION,
      payload: res
    };
  }
}

export async function getStatusQuestionReduxStore(uid, cid) {
  const res = await getStatusQuestions(uid, cid);
  if (res) {
    return {
      type: GET_STATUS_QUESTION,
      payload: res
    };
  }
}