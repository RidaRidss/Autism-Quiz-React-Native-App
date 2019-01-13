import { QUESTIONAIRE_ACTION, UPDATE_ANSWERS } from "./ActionTypes";

export function getQuestions(question: Object) {
  return {
    question,
    type: QUESTIONAIRE_ACTION
  };
}
export function updateAnswers(question: Object) {
  return {
    question,
    type: UPDATE_ANSWERS
  };
}
