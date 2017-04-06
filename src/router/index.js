import React from 'react'
import { HashRouter as Router, Route, Redirect} from 'react-router-dom'
import SignPage from '../page/waiqin/SignPage'
import SignSucceedPage from '../page/waiqin/SignSucceedPage'
import ListChildUserPage from '../page/waiqin/ListChildUserPage'
import RemarkPage from '../page/waiqin/RemarkPage'

const AppRouter = () => (
  <Router>
      <div>
        <Route path="/waiqin/sign" component={SignPage}/>
        <Route path="/waiqin/signSucceed" component={SignSucceedPage}/>
        <Route path="/waiqin/remark" component={RemarkPage} />
        <Route path="/waiqin/childUsers" component={ListChildUserPage}/>
        <Redirect from="/" to="/waiqin/sign"/>
      </div>
  </Router>
)

export default AppRouter
