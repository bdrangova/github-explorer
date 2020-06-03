import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { waitFor } from '@testing-library/react';
import { MockedGithubSearchResponse } from 'test-setup/mock-data';
import { search } from '../actions';
import {
  UPDATE_QUERY,
  API_STATE,
  UPDATE_PAGER,
  STORE_REPOS,
} from '../actions/contants';

const createMockStore = configureMockStore([thunk]);
const initialState = {
  repos: {
    query: '',
  },
  pager: {
    current: 1,
  },
  api: {},
};

describe('Search Action', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('dispatch action', async () => {
    fetch.mockResponse(JSON.stringify(MockedGithubSearchResponse));

    performance.setResourceEntries(
      'https://api.github.com/search/repositories?q=vue&order=desc&page=1&per_page=9',
    );
    const expectedActions = [
      { type: UPDATE_QUERY, payload: 'vue' },
      { type: API_STATE, payload: { loading: true } },
      {
        type: STORE_REPOS,
        payload: { items: MockedGithubSearchResponse.items, page: 1 },
      },
      { type: UPDATE_PAGER, payload: { current: 1, last: 1 } },
      {
        type: API_STATE,
        payload: { success: true, duration: 0.45 },
      },
    ];
    const store = createMockStore(initialState);
    await waitFor(() => store.dispatch(search('vue', '')));

    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});
