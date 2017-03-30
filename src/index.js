import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './router'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './styles/App.css'

injectTapEventPlugin()

const middleWare = [ thunk ]

// if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger())
// }

const store = createStore(reducers, applyMiddleware(...middleWare))

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>, document.getElementById('app')
)
