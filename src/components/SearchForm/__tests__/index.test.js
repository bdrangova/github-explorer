import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithFullstack } from 'test-setup/explorer-testing-library';
import SearchForm from '../index';

const handleChange = jest.fn();
const handleSubmit = jest.fn();
const handleBlur = jest.fn();

describe('Search Form', () => {
  const initialState = {
    api: {},
    pager: { current: 1 },
    repos: {},
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('submit form', async () => {
    const { getByPlaceholderText, getByTestId } = renderWithFullstack(
      <SearchForm
        values={{ search: '' }}
        errors={{}}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
      />,
      initialState,
      '/',
      {
        token: '',
      },
    );
    const form = getByTestId('search-form');
    const searchInput = getByPlaceholderText('Search Github ...');
    fireEvent.change(searchInput, {
      target: {
        value: 'vue',
      },
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
