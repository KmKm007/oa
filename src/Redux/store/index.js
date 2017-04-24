import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'
import thunk from 'redux-thunk'

const middleWare = [ thunk ]

// if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger())
// }

const store = createStore(reducers, applyMiddleware(...middleWare))

export default store
