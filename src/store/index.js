import { combineReducers } from 'redux';
import { repositoryReducer as repos } from './reducers/repositories';
import { pagerReducer as pager } from './reducers/pager';
import { apiReducer as api } from './reducers/apiHandler';

const rootReducer = combineReducers({
  repos,
  pager,
  api,
});

export default rootReducer;
