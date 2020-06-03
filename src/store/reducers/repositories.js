import { STORE_REPOS, UPDATE_QUERY } from '../actions/contants';

const initialState = {
  query: '',
};

export const repositoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case STORE_REPOS:
      return {
        ...state,
        [`${payload.page}`]: {
          items: payload.items,
        },
      };
    case UPDATE_QUERY:
      return {
        query: payload.trim(),
      };
    default:
      return state;
  }
};

export const getReposByPage = (page, state) => {
  return state.repos[page] ? state.repos[page].items : [];
};

export const getRepoById = (id, page, state) => {
  const { repos } = state;

  if (id !== undefined) {
    return repos[page].items.filter((item) => item.id === id);
  }
  if (repos[page] !== undefined) {
    return repos[page].items;
  }
  return [];
};
