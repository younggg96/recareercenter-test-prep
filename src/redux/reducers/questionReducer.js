import {
  GET_RESULT,
  GET_QUIZ_RESULT,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
  REFRESH_QUESTIONDATA,
  REFRESH_QUIZ,
  SAVED_QUESTION_ID_LIST,
} from "../actions/actionTypes";

const questionReducerInitialState = {
  questionData: [],
  quizData: [],
  savedIdList: [],
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
      return {
        ...state,
        savedIdList: action.payload
      }
    case UNSAVE_QUESTION:
      return {
        ...state,
        savedIdList: action.payload
      }
    case SAVED_QUESTION_ID_LIST:
      return {
        ...state,
        savedIdList: action.payload
      }
    default:
      return state;
  }
};
