import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './router'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'vconsole'
import './styles/App.scss'
import store from './Redux/store'

injectTapEventPlugin()


ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>, document.getElementById('app')
)
