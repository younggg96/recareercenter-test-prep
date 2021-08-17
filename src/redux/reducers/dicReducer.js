import { DIC_SAVE_WORD, DIC_UNSAVE_WORD, GET_SAVED_WORD, GET_SAVED_WORD_LIST } from "../actions/actionTypes";
import dic from "../../static/dic/dic.json";

const dicReducerInitialState = { list: dic, savedWord: [], savedWordList: [] };

export const dicReducer = (state = dicReducerInitialState, action) => {
  switch (action.type) {
    case DIC_SAVE_WORD:
      return {
        ...state,
        savedWord: action.payload,
      };
    case DIC_UNSAVE_WORD:
      return {
        ...state,
        savedWord: action.payload,
      };
    case GET_SAVED_WORD:
      return {
        ...state,
        savedWord: action.payload,
      };
    case GET_SAVED_WORD_LIST:
      return {
        ...state,
        savedWordList: action.payload,
      };
    default:
      return state;
  }
};
