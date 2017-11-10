import { combineReducers } from 'redux'

import appReducer from './app'

export default combineReducers({
  app: appReducer
})
