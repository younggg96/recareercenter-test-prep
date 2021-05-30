import {
  GET_RESULT,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
} from "../actions/actionTypes";

// data
import data from "../../static/questions/data.json";

// help func
const getRandomArrayElements = (arr, count) => {
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

// data
let arr = [];
const quizData = getRandomArrayElements(data.questionData, 10);
quizData.map((item) => {
  arr.push(Object.assign({}, item, { saved: false, result: {} }));
});

const questionReducerInitialState = {
  quizData: arr,
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
        quizData: [
          ...state.quizData.slice(0, currentQuestion),
          { ...state.quizData[currentQuestion], result: itemRes },
          ...state.quizData.slice(currentQuestion + 1, state.quizData.length),
        ],
      };
    case SAVE_QUESTION:
      const { item } = action.payload;
      const arr = state.quizData.map((i) => {
        if (i.Id == item.Id) {
          i.saved = true;
        }
        return i;
      });
      return {
        ...state,
        quizData: arr,
        savedList: [...state.savedList, item],
      };
    case UNSAVE_QUESTION:
      const arr2 = state.quizData.map((i) => {
        if (i.Id == action.payload.item.Id) {
          i.saved = false;
        }
        return i;
      });
      return {
        ...state,
        quizData: arr2,
        savedList: state.savedList.filter((i) => {
          return i.Id != action.payload.item.Id;
        }),
      };
    default:
      return state;
  }
};
