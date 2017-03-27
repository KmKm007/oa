import { combineReducers } from 'redux'
import waiqinReducers from './waiqin'
import userReducer from './user'

const reducers = combineReducers({
  waiqin: waiqinReducers,
  user: userReducer
})

export default reducers
