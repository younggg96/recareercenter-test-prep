import { SAVE_QUESTION, GET_RESULT, UNSAVE_QUESTION } from "./actionTypes";

export function getResult(itemRes, currentQuestion) {
  return {
    type: GET_RESULT,
    payload: { itemRes, currentQuestion },
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
