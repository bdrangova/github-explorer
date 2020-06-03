import React from 'react';
import { renderWithFullstack } from 'test-setup/explorer-testing-library';
import RepositoriesContainer from '../index';

describe('Repositories', () => {
  const initialState = {
    api: {},
    pager: { current: 1 },
    repos: {
      query: '',
    },
  };

  test('render without any search performed', () => {
    const {
      container,
    } = renderWithFullstack(
      <RepositoriesContainer />,
      initialState,
      '/',
      { token: '' },
    );
  });
});
