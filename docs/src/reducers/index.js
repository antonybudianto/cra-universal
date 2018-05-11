import { combineReducers } from 'redux';

import appReducer from './app';
import newsReducer from './news';

export default combineReducers({
  app: appReducer,
  news: newsReducer,
});
