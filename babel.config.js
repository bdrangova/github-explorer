const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/transform-runtime',
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'icons',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/lab',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'lab',
    ],
    '@babel/transform-react-inline-elements',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-dynamic-import',
    'transform-imports',
    isTest ? 'dynamic-import-node' : null,
  ].filter(Boolean),
};
