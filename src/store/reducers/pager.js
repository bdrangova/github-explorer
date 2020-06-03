import { UPDATE_PAGER } from '../actions/contants';

const initialState = {
  current: 1,
};

export const pagerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PAGER:
      return payload;
    default:
      return state;
  }
};

export const getPager = (state) => state.pager;
