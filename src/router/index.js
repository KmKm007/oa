import React from 'react'
import { HashRouter as Router, Route, Redirect} from 'react-router-dom'
import SignPage from '../page/waiqin/SignPage'
import SignSucceedPage from '../page/waiqin/SignSucceedPage'
import ListChildUserPage from '../page/waiqin/ListChildUserPage'
import RemarkPage from '../page/waiqin/RemarkPage'
import SignHistoryPage from '../page/waiqin/SignHistoryPage'
import WaiqinIntroductionPage from '../page/waiqin/WaiqinIntroductionPage'
import LoginPage from '../page/common/LoginPage'
import AppInitialPage from '../page/common/AppInitialPage'
import store from '../Redux/store'

class AppRouter extends React.Component {
  render () {
    return (
      <Router>
          <div>
            <Route path="/waiqin/sign" component={SignPage}/>
            <Route path="/waiqin/signSucceed" component={SignSucceedPage}/>
            <PrivateRoute path="/waiqin/remark" component={RemarkPage} />
            <PrivateRoute path="/waiqin/childUsers" component={ListChildUserPage}/>
            <PrivateRoute path="/waiqin/history" component={SignHistoryPage}/>
            <PrivateRoute path="/appInitial" component={AppInitialPage} />
            <Route path="/waiqin/introduction" component={WaiqinIntroductionPage} />
            <Route path="/login" component={LoginPage}></Route>
            <Redirect from="/" to="/login"/>
          </div>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userDetail = store.getState().user.detail
  return <Route {...rest} render={props => (
      userDetail ? (
        <Component {...props}/>
      ) : (
        <Redirect from="/" to="/waiqin/sign"/>
      )
    )}/>
}

export default AppRouter
