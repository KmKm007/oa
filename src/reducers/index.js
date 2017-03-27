import { combineReducers } from 'redux'
import waiqinReducers from './waiqin'

const reducers = combineReducers({
  waiqin: waiqinReducers
})

export default reducers
