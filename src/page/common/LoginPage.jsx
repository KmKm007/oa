import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import createHistory from 'history/createHashHistory'
import actions from '../../Redux/actions'
import actionTypes from '../../Redux/actionTypes'
import Loading from '../../components/common/Loading'
import ErrorMesg from '../../components/common/ErrorMesg'

const history = createHistory()

class LoginPage extends React.Component {

  static propTypes = {
    userCode: PropTypes.string,
    userDetail: PropTypes.object
  }

  componentWillMount() {
    const userDetail = this.props.userDetail
    if (userDetail) {
      this.toHomePage()
    }
  }

  componentDidMount() {
    const userId = localStorage.getItem('userId')
    if (!userId || userId === 'undefined') {
      this.props.fetchUserCode()
    } else {
      this.props.fetchUserDetailById(userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userCode: currentUserCode, userDetail: currentUserDetail, isInitialSucceed: currentIsInitialSucceed } = this.props
    const { userCode: nextUserCode, userDetail: nextUserDetail, isInitialSucceed: nextIsInitialSucceed } = nextProps
    const { fetchUserDetailByCode, fetchWxConfig } = this.props
    if (currentUserCode !== nextUserCode) {
      return fetchUserDetailByCode(nextUserCode)

    }
    if (currentUserDetail !== nextUserDetail && !currentUserDetail) {
      localStorage.setItem('userId', nextUserDetail.userId)
      localStorage.setItem('userIdUpdateTime', Date.now())
      return fetchWxConfig()

    }
    if (!currentIsInitialSucceed && nextIsInitialSucceed) {
      this.toHomePage()
    }
  }

  toHomePage = () => {
    history.replace('/waiqin/sign')
  }

  render () {
    const { userDetail, isWxConfigLoading, isUserDetailLoading, errors } = this.props
    if (!userDetail && isUserDetailLoading) {
      return <Loading loadingText="登录中..." />
    } else if (isWxConfigLoading === true){
      return <Loading loadingText="应用初始化中..."/>
    }
    const loginError = errors.find(e => e.errorType === actionTypes.RECEIVE_USER_DETAIL_BY_ID_FAILED)
    if (loginError) {
      return (
        <ErrorMesg errorMesg={loginError.errorMesg}/>
      )
    }
    const wxConfigError = errors.find(e => e.errorType === actionTypes.RECEIVE_WX_CONFIG_FAILED)
    if (wxConfigError) {
      return (
        <ErrorMesg errorMesg={wxConfigError.errorMesg}/>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({
  userCode: state.user.userCode,
  userDetail: state.user.detail,
  wxConfig: {
    corpid: state.wx.corpid,
    nonceStr: state.wx.nonceStr,
    signature: state.wx.signature,
    url: state.wx.url,
    timestamp: state.wx.timestamp
  },
  isUserDetailLoading: state.user.isUserDetailLoading,
  isWxConfigLoading: state.wx.isWxConfigLoading,
  isInitialSucceed: state.wx.isInitialSucceed,
  errors: [ ...state.wx.errors, ...state.user.errors ]
})

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCode: () => {
      dispatch(actions.fetchUserCode())
    },
    fetchUserDetailByCode: userCode => {
      dispatch(actions.fetchUserDetailByCode(userCode))
    },
    fetchUserDetailById: userId => {
      dispatch(actions.fetchUserDetailById(userId))
    },
    fetchWxConfig: () => {
      dispatch(actions.fetchWxConfig())
    },
    initialWxSDK: () => {
      dispatch(actions.wxFetchInitial())
    },
    initialWxConfig: config => {
      dispatch(actions.wxFetchInitial(config))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
