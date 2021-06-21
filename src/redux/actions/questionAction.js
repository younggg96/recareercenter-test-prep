import {
  SAVE_QUESTION,
  GET_RESULT,
  UNSAVE_QUESTION,
  GET_QUIZ_RESULT,
  REFRESH_QUIZ,
  REFRESH_QUESTIONDATA,
} from "./actionTypes";

import data from "../../static/questions/data.json";
import { getRandomArrayElements } from "../../helper";

// data
let arr = [];
data.questionData.map((item) => {
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

export function refreshQuestionData() {
  return {
    type: REFRESH_QUESTIONDATA,
    payload: getRandomArrayElements(arr, 100),
  };
}

export function refreshQuiz() {
  return {
    type: REFRESH_QUIZ,
    payload: getRandomArrayElements(arr, 10),
  };
}

export function saveQuestion(item) {
  return {
    type: SAVE_QUESTION,
    payload: { item },
  };
}

export function unsaveQuestion(item) {
  return {
    type: UNSAVE_QUESTION,
    payload: { item },
  };
}
