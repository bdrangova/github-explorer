import { API_STATE } from '../actions/contants';

const initialState = {};

export const apiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case API_STATE:
      return payload;
    default:
      return state;
  }
};
