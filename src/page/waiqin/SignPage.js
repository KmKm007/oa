import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import cs from 'classnames'
import actions from '../../actions'
import Loading from '../../components/Loading'
import 'vconsole'

const signButtonURL = require('../../images/sign.png')

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
      userDetail: currentUserDetail
    } = this.props
    const {
      isInitialSucceed: nextIsInitialSucceed,
      location: nextLocation,
      userCode: nextUserCode,
      userDetail: nextUserDetail
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
  }

  onSignClick = () => {
    hashHistory.push('/waiqin/signSucceed')
  }

  render() {
    const { title, isInitialSucceed, isWxConfigLoading, address } = this.props
    const { handleSign } = this.props
    const isAllLoaded = isInitialSucceed && ( isWxConfigLoading === false )
    const Address = address ? (
      <span>{address}</span>
    ) : (
      <span>位置获取中...</span>
    )
    if (!isAllLoaded)
      return <Loading />
    return (
      <div className="container">
        <div className="header">
          <div className={cs('text-center', 'headerLeftContainter')}>返回</div>
          <h2 className={cs('text-center', 'headerMiddleContainer')}>{title}</h2>
          <div className={cs('text-center', 'headerRightContainer')}>菜单</div>
        </div>
        <div className={cs('time-container', 'flex-center-container')}>
          <div>
            <span className="time-text">14:30</span>
          </div>
          <div>
            <span className="date-text">2017年3月23日</span>
          </div>
        </div>
        <div className={cs('sign-container', 'flex-center-container')}>
          <img className="sign-button" src={signButtonURL} onClick={this.onSignClick}/>
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
  address: state.waiqin.address
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
  handleSign: () => {
    const currentTime = Date.now()
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
