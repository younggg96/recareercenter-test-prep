import { CHECK_NOTIFICATION, SET_NOTIFICATION_TIME } from "../actions/actionTypes";

const INITIAL_STATE = {
  notification: {
    status: false,
    time: {
      hours: 0,
      mins: 0,
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_TIME:
      const { hours, mins } = action.payload.time;
      return {
        ...state,
        notification: {
          status: state.notification.status,
          time: {
            hours: hours,
            mins: mins
          }
        }
      }
    case CHECK_NOTIFICATION:
      if (!action.payload) {
        return {
          ...state,
          notification: {
            status: action.payload,
            time: {
              hours: 0,
              mins: 0,
            }
          }
        }
      }
      return {
        ...state,
        notification: {
          status: action.payload,
          time: state.notification.time
        }
      }
    default:
      return state;
  }
}