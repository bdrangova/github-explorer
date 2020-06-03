import React from 'react';
import { renderWithIntlAndRouter } from 'test-setup/explorer-testing-library';
import { fireEvent } from '@testing-library/react';
import { RepositoryArrayMock } from 'test-setup/mock-data';
import RepositoryList from '../index';

const pagerMock = {
  current: 1,
};

const setLayoutMock = jest.fn();
const handlePageChangeMock = jest.fn();

const RepoListMockData = {
  repos: RepositoryArrayMock,
  grid: true,
  pager: pagerMock,
  loading: false,
  duration: 0.45,
  setLayout: setLayoutMock,
  handlePageChange: handlePageChangeMock,
};

describe('Repositories List', () => {
  it('repositories list snapshot', () => {
    const { container } = renderWithIntlAndRouter(
      <RepositoryList {...RepoListMockData} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('change layout type from grid to list', async () => {
    const { getByTestId } = renderWithIntlAndRouter(
      <RepositoryList {...RepoListMockData} />,
    );
    const setListBtn = getByTestId('set-list-btn');
    fireEvent.click(setListBtn);

    expect(setLayoutMock).toHaveBeenCalledTimes(1);
    expect(setLayoutMock).toHaveBeenCalledWith('list');
  });
});
