import {
  GET_RESULT,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
} from "../actions/actionTypes";

// data
import data from "../../static/questions/data.json";

// data
let arr = [];
data.questionData.map((item) => {
  arr.push(Object.assign({}, item, { saved: false, result: {} }));
});

const questionReducerInitialState = {
  questionData: arr,
  savedList: [],
};

export const questionReducer = (
  state = questionReducerInitialState,
  action
) => {
  switch (action.type) {
    case GET_RESULT:
      const { itemRes, currentQuestion } = action.payload;
      return {
        ...state,
        questionData: [
          ...state.questionData.slice(0, currentQuestion),
          { ...state.questionData[currentQuestion], result: itemRes },
          ...state.questionData.slice(currentQuestion + 1, state.questionData.length),
        ],
      };
    case SAVE_QUESTION:
      const { item } = action.payload;
      const arr = state.questionData.map((i) => {
        if (i.Id == item.Id) {
          i.saved = true;
        }
        return i;
      });
      return {
        ...state,
        questionData: arr,
        savedList: [...state.savedList, item],
      };
    case UNSAVE_QUESTION:
      const arr2 = state.questionData.map((i) => {
        if (i.Id == action.payload.item.Id) {
          i.saved = false;
        }
        return i;
      });
      return {
        ...state,
        questionData: arr2,
        savedList: state.savedList.filter((i) => {
          return i.Id != action.payload.item.Id;
        }),
      };
    default:
      return state;
  }
};
