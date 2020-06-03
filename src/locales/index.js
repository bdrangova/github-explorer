const en = require('./en.json');
const nl = require('./nl.json');
const mk = require('./mk.json');

const messages = {
  en,
  nl,
  mk,
};

const getLocale = () => {
  return navigator.language.split('-')[0];
};

module.exports = {
  messages,
  getLocale,
};
