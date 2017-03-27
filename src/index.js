import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './router'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

const middleWare = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger())
}

const store = createStore(reducers, applyMiddleware(...middleWare))

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>, document.getElementById('app')
)
