# Github Explorer App

Application is deployed on the following [link](https://github-explor.web.app/)

## Project setup

### Running the application

```
# install node modules
yarn
# start development env
yarn start
```

### Building for production

```
# create a build and serve
yarn build
yarn serve:build

# tools for analyzing the build
yarn build:analyze
```

### Jest Tests

```
# run tests
yarn test

# run tests in watchmode
yarn test:watch

# run test coverage
yarn test:coverage
```

### Cypress Tests

```
# open cypress app and dev server in parallel
yarn test:e2e:dev

# open cypress app
yarn cy:open
```

#### To improve

- Code splitting
  - first page: all the components for the result can be lazy loaded
  - route code splitting
  - locales
- UI
  - theming
  - extra functionalities
- State managment
  - modular
