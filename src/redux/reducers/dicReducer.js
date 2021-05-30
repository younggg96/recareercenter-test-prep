import { DIC_SAVE_WORD, DIC_UNSAVE_WORD } from "../actions/actionTypes";
import dic from "../../static/dic/dic.json";

const dicReducerInitialState = { list: dic.dic, savedWord: [] };

export const dicReducer = (state = dicReducerInitialState, action) => {
  switch (action.type) {
    case DIC_SAVE_WORD:
      const { item, id } = action.payload;
      return {
        ...state,
        list: [
          ...state.list.slice(0, id),
          item,
          ...state.list.slice(id + 1, state.list.length),
        ],
        savedWord: [...state.savedWord, action.payload],
      };
    case DIC_UNSAVE_WORD:
      return {
        ...state,
        list: [
          ...state.list.slice(0, action.payload.id),
          {
            ...state.list[action.payload.id],
            ...{ item: state.list[action.payload.id].item, saved: false },
          },
          ...state.list.slice(action.payload.id + 1),
        ],
        savedWord: state.savedWord.filter((item) => {
          console.log(item, action.payload.id);
          return item.id != action.payload.id;
        }),
      };
    default:
      return state;
  }
};
