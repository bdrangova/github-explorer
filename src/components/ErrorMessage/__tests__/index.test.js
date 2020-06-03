import React from 'react';
import { renderWithIntl } from 'test-setup/explorer-testing-library';
import ErrorMessage from '../index';

const messages = {
  'no-results': 'No results for this query. Please try again.',
  'network-error': 'Something went wrong. Please try again later.',
  'no-readme': 'This repository has no readme.',
  unauthorized:
    'Your token has been revoked. Please login to get authorized again.',
};

describe('Test error messages', () => {
  it('shows no results message', () => {
    const { getByText } = renderWithIntl(
      <ErrorMessage error="no-results" duration={0.45} />,
    );

    expect(getByText(messages['no-results'])).toBeTruthy();
  });

  it('shows custom error message', () => {
    const { getByText } = renderWithIntl(
      <ErrorMessage
        error="no-results"
        duration={0.45}
        message="Custom error message"
      />,
    );

    expect(getByText('Custom error message')).toBeTruthy();
  });
});
