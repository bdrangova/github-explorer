const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const getAnalyzers = (analyze) => {
  return analyze
    ? [
        require('./addons/webpack.visualizer.js'),
        require('./addons/webpack.bundleanalyzer.js'),
      ]
    : [];
};

module.exports = ({ env, analyze }) => {
  const environmentConfig = require(`./webpack.${env}.js`);

  return webpackMerge(
    commonConfig,
    environmentConfig,
    ...getAnalyzers(analyze),
  );
};
