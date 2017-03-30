import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import cs from 'classnames'
import actions from '../../actions'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import Loading from '../../components/Loading'
import 'vconsole'

const signButtonURL = require('../../images/sign.png')
const preSignButtonURL = require('../../images/preSign.png')

class WaiqinPage extends React.Component {
  constructor(props) {
      super(props)
  }

  static propTypes = {
    handleSign: PropTypes.func.isRequired,
    initialWxSDK: PropTypes.func.isRequired,
    fetchWxConfig: PropTypes.func.isRequired
  }

  static defaultProps = {
    title: '东莞中原外勤签到'
  }

  componentWillMount() {
    document.title = this.props.title
  }

  componentDidMount() {
    this.props.fetchWxConfig()
    const userId = localStorage.getItem('userId')
    if (!userId) {
      this.props.fetchUserCode()
    } else {
      this.props.fetchUserDetailById(userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isInitialSucceed: currentIsInitialSucceed,
      location: currentLocation,
      userCode: currentUserCode,
      userDetail: currentUserDetail,
      isSignSucceed: currentIsSignSucceed
    } = this.props
    const {
      isInitialSucceed: nextIsInitialSucceed,
      location: nextLocation,
      userCode: nextUserCode,
      userDetail: nextUserDetail,
      isSignSucceed: nextIsSignSucceed
    } = nextProps

    const {
      fetchUserDetailByCode,
      fetchLocation,
      fetchAddress
    } = this.props

    if (currentUserCode !== nextUserCode) {
      fetchUserDetailByCode(nextUserCode)
    }
    if (currentIsInitialSucceed !== nextIsInitialSucceed) {
      fetchLocation()
    }
    if (currentLocation !== nextLocation) {
      fetchAddress(nextLocation)
    }
    if (nextUserDetail && !nextUserCode && currentUserDetail !== nextUserDetail) {
      localStorage.setItem('userId', nextUserDetail.userId)
      localStorage.setItem('userIdUpdateTime', Date.now())
    }
    if (nextIsSignSucceed && !currentIsSignSucceed === true) {
      hashHistory.push('/waiqin/signSucceed')
    }
  }

  onSignClick = () => {
    const {address, location,userDetail, handleSign } = this.props
    handleSign(location, address, userDetail.userId)
  }

  render() {
    const { title, isInitialSucceed, isWxConfigLoading, address } = this.props
    const isAllLoaded = isInitialSucceed && ( isWxConfigLoading === false )
    const Address = address ? (
      <span>{address}</span>
    ) : (
      <span>位置获取中...</span>
    )
    const signButton = address ? (
      <img className="sign-button" src={signButtonURL} onClick={this.onSignClick}/>
    ) : (
      <img className="sign-button" src={preSignButtonURL}/>
    )
    if (!isAllLoaded)
      return <Loading />
    return (
      <div className="container">
        <MenuHeaderContainer title = {title}/>
        <div className={cs('time-container', 'flex-center-container')}>
          <div>
            <span className="time-text">14:30</span>
          </div>
          <div>
            <span className="date-text">2017年3月23日</span>
          </div>
        </div>
        <div className={cs('sign-container', 'flex-center-container')}>
          {signButton}
          <div className="sign-footer">
            <span>添加备注...</span>
          </div>
        </div>
        <div className={cs('address-container', 'flex-center-container')}>
          {Address}
        </div>
      </div>
    )
  }
}

const stateToProps = state => ({
  userCode: state.user.userCode,
  userDetail: state.user.detail,
  wxConfig: {
    corpid: state.wx.corpid,
    nonceStr: state.wx.nonceStr,
    signature: state.wx.signature,
    url: state.wx.url,
    timestamp: state.wx.url
  },
  isInitialSucceed: state.wx.isInitialSucceed,
  isWxConfigLoading: state.wx.isWxConfigLoading,
  location: state.waiqin.location,
  address: state.waiqin.address,
  isSignSucceed: state.waiqin.isSignSucceed
})

const dispatchToProps = dispatch => ({
  fetchWxConfig: () => {
    dispatch(actions.fetchWxConfig())
  },
  initialWxSDK: () => {
    dispatch(actions.wxFetchInitial())
  },
  initialWxConfig: config => {
    dispatch(actions.wxFetchInitial(config))
  },
  handleSign: (location, address, userId) => {
    dispatch(actions.pushSignRecord(location, address, userId))
  },
  fetchUserCode: () => {
    dispatch(actions.fetchUserCode())
  },
  fetchLocation: () => {
    dispatch(actions.fetchLocation())
  },
  fetchAddress: location => {
    dispatch(actions.fetchAddress(location))
  },
  fetchUserDetailByCode: userCode => {
    dispatch(actions.fetchUserDetailByCode(userCode))
  },
  fetchUserDetailById: userId => {
    dispatch(actions.fetchUserDetailById(userId))
  }
})

export default connect(stateToProps, dispatchToProps)(WaiqinPage)
