import { SET_NOTIFICATION_TIME, CHECK_NOTIFICATION } from "./actionTypes";

export function setNotificationTime(hours, mins) {
  return {
    type: SET_NOTIFICATION_TIME,
    payload: {
      time: { hours, mins }
    },
  };
}

export function checkNotification(checked) {
  return {
    type: CHECK_NOTIFICATION,
    payload: checked,
  };
}

