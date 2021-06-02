import { SAVE_QUESTION, GET_RESULT, UNSAVE_QUESTION, SET_NOT_FINISHED } from "./actionTypes";

export function getResult(itemRes, currentQuestion) {
  return {
    type: GET_RESULT,
    payload: { itemRes, currentQuestion },
  };
}
export function setNotFinishedQuestions(itemRes, currentQuestion) {
  return {
    type: SET_NOT_FINISHED,
    payload: { itemRes2: itemRes, currentQuestion2: currentQuestion},
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
