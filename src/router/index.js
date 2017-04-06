import React from 'react'
import { HashRouter as Router, Route, Redirect} from 'react-router-dom'
import SignPage from '../page/waiqin/SignPage'
import SignSucceedPage from '../page/waiqin/SignSucceedPage'
import RemarkPage from '../page/waiqin/RemarkPage'

const AppRouter = () => (
  <Router history={history}>
      <div>
        <Route path="/waiqin/sign" component={SignPage}/>
        <Route path="/waiqin/signSucceed" component={SignSucceedPage}/>
        <Route path="/waiqin/remark" component={RemarkPage} />
        <Redirect from="/" to="/waiqin/sign" />
      </div>
  </Router>
)

export default AppRouter
