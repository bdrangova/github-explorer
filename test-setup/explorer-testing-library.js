import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'src/store';
import { messages } from 'src/locales';

import { FirebaseAuth } from 'src/providers/Auth';

const renderWithRouter = (
  ui,
  { route = '/', renderOptions = {} } = {},
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(renderRouter(ui, history), renderOptions);

  return {
    ...utils,
    history,
  };
};

const renderRouter = (ui, history) => {
  return <Router history={history}>{ui}</Router>;
};

const renderWithRedux = (
  ui,
  { initialState = {}, renderOptions = {} } = {},
) => {
  const utils = render(
    renderRedux(ui, initialState),
    ...renderOptions,
  );
  return {
    ...utils,
  };
};

const renderRedux = (ui, initialState = {}) => {
  const store = createStore(rootReducer, initialState);
  return <Provider store={store}>{ui}</Provider>;
};

const renderWithAuth = (
  ui,
  { value = {}, renderOptions = {} } = {},
) => {
  const utils = render(renderAuth(ui, value));
  return { ...utils };
};

const renderAuth = (ui, value = {}) => {
  return (
    <FirebaseAuth.Provider value={value}>{ui}</FirebaseAuth.Provider>
  );
};

const renderWithIntl = (ui, { renderOptions = {} } = {}) => {
  const utils = render(renderIntl(ui, renderOptions), renderOptions);
  return { ...utils };
};

const renderIntl = (ui) => {
  return (
    <IntlProvider locale="en" messages={messages['en']}>
      {ui}
    </IntlProvider>
  );
};

const renderFullstack = (
  ui,
  initialState = {},
  route = '/',
  value = {},
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return renderRedux(
    renderIntl(renderRouter(renderAuth(ui, value), history)),
    initialState,
  );
};

const renderWithFullstack = (
  ui,
  initialState = {},
  route = '/',
  authValue = {},
  renderOptions = {},
) => {
  return render(
    renderFullstack(ui, initialState, route, authValue),
    renderOptions,
  );
};

const renderWithIntlAndRouter = (
  ui,
  route = '/',
  renderOptions = {},
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return renderWithIntl(renderRouter(ui, history), renderOptions);
};

export {
  renderRouter,
  renderRedux,
  renderAuth,
  renderIntl,
  renderWithRouter,
  renderWithRedux,
  renderWithAuth,
  renderWithIntl,
  renderWithIntlAndRouter,
  renderWithFullstack,
};
