import { QUESTIONAIRE_ACTION, UPDATE_ANSWERS } from "./ActionTypes";

export function getQuestions(question: Object) {
  return {
    question,
    type: QUESTIONAIRE_ACTION
  };
}
export function updateAnswers(payload: { id: String, answer: String }) {
  return {
    payload,
    type: UPDATE_ANSWERS
  };
}
