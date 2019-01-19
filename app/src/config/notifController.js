import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import moment from "moment";
import localization from "moment/locale/hu";
import Util from "../util";
import reuseableFunction from "../reusableFunction/reuseableFunction";

const NOTIFICATION_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";
// const min = 1;
// const max = 10;
export default class notifController extends Component {
  render() {
    return null;
  }
}

export function scheduleLocalNotification(
  message,
  date,
  id,
  title,
  payload,
  repeatType
) {
  console.log(date);

  const notification = {
    // id, //for android cancel notification (must be stringified number)
    message, // (required)
    date,
    id,
    smallIcon: "ic_launcher",
    largeIcon: "ic_launcher",
    data: JSON.stringify(payload),
    vibrate: true, // (optional) default: true
    vibration: 600, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    // tag: "#my_sleep_time" + id, // (optional) add tag to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    autoCancel: true, // (optional) default: true
    foreground: true,
    /* iOS and Android properties */
    title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    userInfo: {
      id: id
    },
    popInitialNotification: true,
    playSound: true, // (optional) default: true
    color: "#135257", // (optional) default: system default
    soundName: "default",
    // requestPermissions: true,
    repeatType // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    //   actions: '["Yes", "No"]' // (Android only) See the doc for notification actions to know more
  };
  console.log("notification to lock", JSON.stringify(notification));
  //schedule the notification
  PushNotification.localNotificationSchedule(notification);
}

export function createPushId(pushType) {
  console.log(NOTIFICATION_TYPE_TO_ID[pushType]);
  return NOTIFICATION_TYPE_TO_ID[pushType];
}

export const NOTIFICATION_TYPE_TO_ID = {
  result: "1"
};

// export function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
