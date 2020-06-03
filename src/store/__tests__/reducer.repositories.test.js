import { MockedGithubSearchResponse } from 'test-setup/mock-data';
import { repositoryReducer as reducer } from '../reducers/repositories';
import { STORE_REPOS, UPDATE_QUERY } from '../actions/contants';

const initialState = {
  query: '',
};

describe('Repository reducer', () => {
  it('return initial state', () => {
    expect(reducer(initialState, {})).toEqual({ query: '' });
  });
  it('handle STORE_REPOS', () => {
    const action = {
      type: STORE_REPOS,
      payload: {
        items: MockedGithubSearchResponse.items,
        page: 1,
      },
    };

    const comparedState = {
      query: '',
      ['1']: {
        items: MockedGithubSearchResponse.items,
      },
    };
    expect(reducer(initialState, action)).toEqual(comparedState);
  });

  it('handle UPDATE_QUERY', () => {
    const action = {
      type: UPDATE_QUERY,
      payload: '   vue   ',
    };

    const comparedState = {
      query: 'vue',
    };
    expect(reducer(initialState, action)).toEqual(comparedState);
  });
});
