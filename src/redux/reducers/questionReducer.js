import {
  GET_RESULT,
  GET_QUIZ_RESULT,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
  REFRESH_QUESTIONDATA,
  REFRESH_QUIZ,
} from "../actions/actionTypes";

// // data
// import data from "../../static/questions/data.json";
// import { getRandomArrayElements } from "../../helper";

// // data
// let arr = [];
// data.questionData.map((item) => {
//   arr.push(
//     Object.assign({}, item, {
//       saved: false,
//       result: {
//         res: "unfinished",
//         pick: null,
//       },
//     })
//   );
// });

const questionReducerInitialState = {
  // questionData: getRandomArrayElements(arr, 100),
  // quizData: getRandomArrayElements(arr, 10),
  questionData: [],
  quizData: [],
  savedList: [],
};

export const questionReducer = (
  state = questionReducerInitialState,
  action
) => {
  switch (action.type) {
    case REFRESH_QUIZ:
      return {
        ...state,
        quizData: action.payload,
      };
    case REFRESH_QUESTIONDATA:
      return {
        ...state,
        questionData: action.payload,
      };
    case GET_RESULT:
      const { itemRes, currentQuestion } = action.payload;
      return {
        ...state,
        questionData: [
          ...state.questionData.slice(0, currentQuestion),
          { ...state.questionData[currentQuestion], result: itemRes },
          ...state.questionData.slice(
            currentQuestion + 1,
            state.questionData.length
          ),
        ],
      };
    case GET_QUIZ_RESULT:
      const { itemRes2, currentQuestion2 } = action.payload;
      return {
        ...state,
        quizData: [
          ...state.quizData.slice(0, currentQuestion2),
          { ...state.quizData[currentQuestion2], result: itemRes2 },
          ...state.quizData.slice(currentQuestion2 + 1, state.quizData.length),
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
        // quizData: arr,
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
        // quizData: arr2,
        savedList: state.savedList.filter((i) => {
          return i.Id != action.payload.item.Id;
        }),
      };
    default:
      return state;
  }
};
