import { DIC_SAVE_WORD, DIC_UNSAVE_WORD } from "../actions/actionTypes";

const dicReducerInitialState = { savedWord: [] };

export const dicReducer = (state = dicReducerInitialState, action) => {
  switch (action.type) {
    case DIC_SAVE_WORD:
      return { ...state, savedWord: [...state.savedWord, action.payload] };
    case DIC_UNSAVE_WORD:
      return {
        ...state,
        savedWord: state.savedWord.filter((item) => item.id != action.payload.id),
      };
    default:
      return state;
  }
};
