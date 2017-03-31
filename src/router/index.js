import React from 'react'
import { Router, Route, hashHistory as history, Redirect } from 'react-router'
import SignPage from '../page/waiqin/SignPage'
import SignSucceedPage from '../page/waiqin/SignSucceedPage'

const AppRouter = () => (
  <Router history={history}>
      <Route path="/waiqin/sign" component={SignPage}/>
      <Route path="/waiqin/signSucceed" component={SignSucceedPage}/>
      <Redirect from="/" to="/waiqin/sign" />
  </Router>
)

export default AppRouter
