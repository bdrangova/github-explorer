import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import { messages, getLocale } from 'src/locales';
import store from './store';
import App from './App';

let reduxMiddleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  let logger = require('redux-logger');
  const loggerMiddleware = logger.createLogger();
  reduxMiddleware = [...reduxMiddleware, loggerMiddleware];
}
const appStore = createStore(
  store,
  applyMiddleware(...reduxMiddleware),
);

const locale = getLocale();

ReactDOM.render(
  <Provider store={appStore}>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <App />
    </IntlProvider>
  </Provider>,

  document.getElementById('app'),
);
