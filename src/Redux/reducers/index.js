import { combineReducers } from 'redux'
import waiqinReducers from './waiqin'
import userReducer from './user'
import wxReducer from './wx'

const reducers = combineReducers({
  waiqin: waiqinReducers,
  user: userReducer,
  wx: wxReducer
})

export default reducers
