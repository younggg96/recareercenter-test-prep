import {
  GET_RESULT,
  GET_QUIZ_RESULT,
  SAVE_QUESTION,
  UNSAVE_QUESTION,
  UNSAVE_QUESTION_RETURN_WITH_DETAIL,
  REFRESH_QUESTIONDATA,
  REFRESH_QUIZ,
  SAVED_QUESTION_ID_LIST,
  SAVED_QUESTIONS_LIST,
  ADD_STATUS_QUESTION,
  GET_STATUS_QUESTION,
} from "../actions/actionTypes";

const questionReducerInitialState = {
  questionData: [],
  quizData: [],
  savedIdList: [],
  savedList: [],
  withStatusList: []
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
      };
    case UNSAVE_QUESTION:
      return {
        ...state,
        savedIdList: action.payload
      };
    case UNSAVE_QUESTION_RETURN_WITH_DETAIL:
      return {
        ...state,
        savedList: action.payload
      };
    case SAVED_QUESTION_ID_LIST:
      return {
        ...state,
        savedIdList: action.payload
      };
    case SAVED_QUESTIONS_LIST:
      return {
        ...state,
        savedList: action.payload
      };
    case ADD_STATUS_QUESTION:
      return {
        ...state,
        withStatusList: action.payload
      };
    case GET_STATUS_QUESTION:
      return {
        ...state,
        withStatusList: action.payload
      };
    default:
      return state;
  }
};
