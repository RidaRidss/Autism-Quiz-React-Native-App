// @flow
import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";
import utils from "../util";

const initialState = Immutable({
  isFetching: false,
  data: [
    {
      id: 0,
      type: "free_text",
      what: `Please provide your post code to help us identify if there are
      any specific issues to a particular geographic area...`,
      answer: ""
    },
    {
      id: 1,
      type: "radio",
      what: `My child is...`,
      choices: [
        {
          label: "0-4 years",
          value: "0-4 years",
          point: 40
        },
        {
          label: "5-11 years (at primary school)",
          value: "5-11 years (at primary school)",
          point: 50
        },
        {
          label: "11-16 years (at secondary school)",
          value: "11-16 years (at secondary school)",
          point: 60
        },
        {
          label: "Over 16 years",
          value: "Over 16 years",
          point: 30
        }
      ],
      answer: ""
    },
    {
      id: 2,
      type: "radio",

      what: `My child...`,
      choices: [
        {
          label:
            "has been diagnosed with an autism spectrum condition (including Asperger syndrome) or autistic traits.",
          value:
            "has been diagnosed with an autism spectrum condition (including Asperger syndrome) or autistic traits",
          point: 30
        },
        {
          label:
            "has been through assessment but was not diagnosed as having an autistic spectrum condition.",
          value:
            "has been through assessment but was not diagnosed as having an autistic spectrum condition.",
          point: 40
        },
        {
          label: "is waiting for assessment.",
          value: "is waiting for assessment.",
          point: 30
        },
        {
          label:
            "does not have a diagnosis because we have not yet asked for an assessment.",
          value:
            "does not have a diagnosis because we have not yet asked for an assessment.",
          point: 50
        },
        {
          label: "has been refused an autistic spectrum condition assessment.",
          value: "has been refused an autistic spectrum condition assessment.",
          point: 60
        }
      ],
      answer: ""
    },
    {
      id: 3,
      type: "free_text",
      what: `Please provide your post code to help us identify if there are
      any specific issues to a particular geographic area...`,
      answer: ""
    },
    {
      id: 4,
      type: "free_text",
      what: `Please provide your post code to help us identify if there are
      any specific issues to a particular geographic area...`,
      answer: ""
    },
    {
      id: 5,
      type: "radio",
      what: `We live in:`,
      choices: [
        {
          label: "Central Shropshire/Shrewsbury",
          value: "Central Shropshire/Shrewsbury",
          point: 30
        },
        {
          label: "North Shropshire",
          value: "North Shropshire",
          point: 60
        },
        {
          label: "South Shropshire",
          value: "South Shropshire",
          point: 40
        }
      ],
      answer: ""
    },
    {
      id: 6,
      type: "free_text",
      what: `Please provide your post code to help us identify if there are
      any specific issues to a particular geographic area...`,
      answer: ""
    },
    {
      id: 7,
      type: "free_text",
      what: `Please provide your post code to help us identify if there are
      any specific issues to a particular geographic area...`,
      answer: ""
    }
  ]
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.QUESTIONAIRE_ACTION:
      stateData = _.cloneDeep(state.data);
      if (action && action.data) {
        data = { ...stateData, ...action.data };
      } else {
        (data = stateData), (isFetching = true);
      }
      return Immutable.merge(state, {
        data: stateData,
        isFetching: false
      });
    case types.UPDATE_ANSWERS:
      let stateData = _.cloneDeep(state.data);
      if (action && action.payload) {
        stateData[action.payload.id].answer = action.payload.answer;
      }
      return Immutable.merge(state, {
        isFetching: false,
        data: stateData
      });
    default:
      return state;
  }
};
