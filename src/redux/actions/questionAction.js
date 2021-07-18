import {
  SAVE_QUESTION,
  GET_RESULT,
  UNSAVE_QUESTION,
  GET_QUIZ_RESULT,
  REFRESH_QUIZ,
  REFRESH_QUESTIONDATA,
} from "./actionTypes";

// import data from "../../static/questions/data.json";
// import { getRandomArrayElements } from "../../helper";
import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../config";

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

export function saveQuestion(item, uid) {
  return {
    type: SAVE_QUESTION,
    payload: { item },
  };
}

export function unsaveQuestion(item, uid) {
  return {
    type: UNSAVE_QUESTION,
    payload: { item },
  };
}
