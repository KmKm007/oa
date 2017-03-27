import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import WaiqinPage from '../page/WaiqinPage'

const AppRouter = () => (
  <Router history={hashHistory}>
      <route path="/" component={WaiqinPage} />
  </Router>
)

export default AppRouter
