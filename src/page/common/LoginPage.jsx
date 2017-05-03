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

  static defaultProps = {
    title: '登录'
  }

  componentWillMount() {
    const { title, userDetail } = this.props
    document.title = title
    if (userDetail) {
      this.toAppInitialPage()
    }
  }

  componentDidMount() {
    let userId = localStorage.getItem('userId')
    if (!userId && process.env.NODE_ENV !== 'production') {
      userId = '5151'
    }
    if (!userId || userId === 'undefined') {
      this.props.fetchUserCode()
    } else {
      this.props.fetchUserDetailById(userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userCode: currentUserCode, userDetail: currentUserDetail } = this.props
    const { userCode: nextUserCode, userDetail: nextUserDetail } = nextProps
    const { fetchUserDetailByCode } = this.props
    if (currentUserCode !== nextUserCode) {
      return fetchUserDetailByCode(nextUserCode)
    }
    if (currentUserDetail !== nextUserDetail && !currentUserDetail) {
      localStorage.setItem('userId', nextUserDetail.userId)
      localStorage.setItem('userIdUpdateTime', Date.now())
      this.toAppInitialPage()
    }
  }

  toAppInitialPage = () => {
    history.replace('/appInitial')
  }

  render () {
    const { userDetail, isUserDetailLoading, errors } = this.props
    if (!userDetail && isUserDetailLoading) {
      return <Loading loadingText="登录中..." />
    } else if (!userDetail && isUserDetailLoading === false) {
      return <ErrorMesg errorMesg={'登录失败...'}/>
    }
    const loginError = errors.find(e => e.errorType === actionTypes.RECEIVE_USER_DETAIL_BY_ID_FAILED)
    if (loginError) {
      return (
        <ErrorMesg errorMesg={loginError.errorMesg}/>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  userCode: state.user.userCode,
  userDetail: state.user.detail,
  isUserDetailLoading: state.user.isUserDetailLoading,
  errors: state.user.errors
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
