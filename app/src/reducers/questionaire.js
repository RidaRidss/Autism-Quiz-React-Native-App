// @flow
import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  isFetching: false,
  data: [
    {
      id: 0,
      type: "radio",
      what: `My child is...`,
      choices: [
        {
          label: "0-4 years",
          value: "0-4 years"
        },
        {
          label: "5-11 years (at primary school)",
          value: "5-11 years (at primary school)"
        },
        {
          label: "11-16 years (at secondary school)",
          value: "11-16 years (at secondary school)"
        },
        {
          label: "Over 16 years",
          value: "Over 16 years"
        }
      ],
      answer: ""
    },
    {
      id: 1,
      type: "radio",

      what: `My child...`,
      choices: [
        {
          label:
            "has been diagnosed with an autism spectrum condition (including Asperger syndrome) or autistic traits.",
          value:
            "has been diagnosed with an autism spectrum condition (including Asperger syndrome) or autistic traits"
        },
        {
          label:
            "has been through assessment but was not diagnosed as having an autistic spectrum condition.",
          value:
            "has been through assessment but was not diagnosed as having an autistic spectrum condition."
        },
        {
          label: "is waiting for assessment.",
          value: "is waiting for assessment."
        },
        {
          label:
            "does not have a diagnosis because we have not yet asked for an assessment.",
          value:
            "does not have a diagnosis because we have not yet asked for an assessment."
        },
        {
          label: "has been refused an autistic spectrum condition assessment.",
          value: "has been refused an autistic spectrum condition assessment."
        }
      ],
      answer: ""
    },
    {
      id: 2,
      type: "radio",
      what: `We live in:`,
      choices: [
        {
          label: "Central Shropshire/Shrewsbury",
          value: "Central Shropshire/Shrewsbury"
        },
        {
          label: "North Shropshire",
          value: "North Shropshire"
        },
        {
          label: "South Shropshire",
          value: "South Shropshire"
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
    }
  ]
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.QUESTIONAIRE_ACTION:
      stateData = _.cloneDeep(state.data);
      if (action && action.data) {
        data = { ...stateData, ...action.data };
        isFetching: true;
      } else {
        (data = stateData), (isFetching = true);
      }
      return Immutable.merge(state, {
        data: stateData,
        isFetching: false
      });
    case types.UPDATE_ANSWERS:
      let stateData = _.cloneDeep(state.data);
      let isFetching = true;
      const id = action.data.id;
      console.log("i am id from reducer", id);
      console.log("i am state data from reducer", state.data);
      return Immutable.merge(state, {
        data: stateData,
        isFetching: false
      });
    default:
      return state;
  }
};
