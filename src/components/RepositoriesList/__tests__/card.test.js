import React from 'react';
import { renderWithIntlAndRouter } from 'test-setup/explorer-testing-library';
import { RepositoryMock } from 'test-setup/mock-data';
import Card from '../card';

describe('Repository card item', () => {
  it('renders properties correctly', () => {
    const { getByTestId } = renderWithIntlAndRouter(
      <Card item={RepositoryMock} />,
    );

    const ownerName = getByTestId('owner-name');
    const repoName = getByTestId('repo-name');

    expect(ownerName).toHaveTextContent(RepositoryMock.owner.login);
    expect(repoName).toHaveTextContent(RepositoryMock.name);
  });

  it('repository card snapshot', () => {
    const { container } = renderWithIntlAndRouter(
      <Card item={RepositoryMock} />,
    );

    expect(container).toMatchSnapshot();
  });
});
