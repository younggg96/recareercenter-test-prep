import { DIC_SAVE_WORD, DIC_UNSAVE_WORD } from "../actions/actionTypes";
import dic from "../../static/dic/dic.json";

const dicReducerInitialState = { list: dic.dic, savedWord: [] };

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
    default:
      return state;
  }
};
