import { Alert } from "react-native";
import moment from "moment";

import PushNotification from "react-native-push-notification";

import PushController, {
  scheduleLocalNotification,
  getRandomInt
} from "../config/notifController";

// function to show message bar.
const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};

const getDateTime = () => {
  let time;
  var date = new Date();
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  time = hours + ":" + minutes + " " + am_pm;
  return time;
};

const _date_time = () => {
  let currentdate = new Date();
  let _date =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() < 10 ? "0" : "") +
    (currentdate.getMonth() + 1) +
    "-" +
    (currentdate.getDate() < 10 ? "0" : "") +
    currentdate.getDate();

  let _time =
    (currentdate.getHours() < 10 ? "0" : "") +
    currentdate.getHours() +
    ":" +
    (currentdate.getMinutes() < 10 ? "0" : "") +
    currentdate.getMinutes() +
    ":" +
    (currentdate.getSeconds() < 10 ? "0" : "") +
    currentdate.getSeconds();

  return [_date, _time];
};

const getSubtractedDate = noOfDaysToSubtract => {
  var dateBeforeDays = new Date();
  dateBeforeDays.setDate(dateBeforeDays.getDate() - (noOfDaysToSubtract - 1));
  return moment(dateBeforeDays, moment.ISO_8601);
};

const getAddedDate = noOfDaysToAdd => {
  var dateAfterDays = new Date();
  dateAfterDays.setDate(dateAfterDays.getDate() + (noOfDaysToAdd + 1));
  return moment(dateAfterDays, moment.ISO_8601);
};

const getDateObjectOfDayOfWeek = (date, dayOfWeek) => {
  var resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));

  return resultDate;
};

const addWeeksToDate = (dt, n) => {
  var newDate = new Date(dt.setDate(dt.getDate() + n * 7));
  return newDate; //[year, month, day].join("-");
};

const autoIDGenerator = () => {
  this.length = 8;
  this.timestamp = +new Date();

  var ts = this.timestamp.toString();
  var parts = ts.split("").reverse();
  var id = "";

  for (var i = 0; i < this.length; ++i) {
    var index = _getRandomInt(0, parts.length - 1);
    id += parts[index];
  }

  return id;
};

const _getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const convertIsoDateStringToDate = IsoDateTime => {
  if (IsoDateTime) {
    var dateObject = new Date(IsoDateTime);
    return new Date(
      dateObject.getTime() + dateObject.getTimezoneOffset() * 60000
    );
  } else {
    return new Date();
  }
};

const convertToIsoDateStringFromDate = dateTime => {
  if (dateTime) {
    return new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000); //.toISOString();
  } else {
    return dateTime;
  }
};

const getDateOfDayOfWeek = (date, dayOfWeek) => {
  var resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));

  var form_month = resultDate.getMonth() + 1;
  var month = "" + form_month;
  var day = resultDate.getDate();
  var year = resultDate.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  // console.log([year, month, day].join("-"));
  return [year, month, day].join("-");
};

const createLocalResultNotification = (result_id, title, desc, dateObject) => {
  scheduleLocalNotification(
    desc,
    dateObject,
    result_id,
    title,
    {
      result_id: result_id,
      desc: desc
    },
    "day"
  );
};

export default {
  getDateOfDayOfWeek,
  createLocalResultNotification,
  convertToIsoDateStringFromDate,
  convertIsoDateStringToDate,
  getDateObjectOfDayOfWeek,
  addWeeksToDate,
  autoIDGenerator,
  _getRandomInt,
  showAlert,
  getDateTime,
  _date_time,
  getSubtractedDate,
  getAddedDate
};
