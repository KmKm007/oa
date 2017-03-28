import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import WaiqinPage from '../page/WaiqinPage'

const AppRouter = () => (
  <Router history={hashHistory}>
      <Route path="/" component={WaiqinPage} />
  </Router>
)

export default AppRouter
