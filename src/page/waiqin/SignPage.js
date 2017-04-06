import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import { connect } from 'react-redux'
import cs from 'classnames'
import actions from '../../actions'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import Loading from '../../components/Loading'
import Timer from '../../components/Timer'
import 'vconsole'
import { getCurrentTimeObject } from '../../utils/DateUtil'
import { showLocation } from '../../middleWares/wxSDK'

const signButtonURL = require('../../images/sign.png')
const preSignButtonURL = require('../../images/preSign.png')

const history = createHistory()

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
      isSigning: currentIsSigning
    } = this.props
    const {
      isInitialSucceed: nextIsInitialSucceed,
      location: nextLocation,
      userCode: nextUserCode,
      userDetail: nextUserDetail,
      isSigning: nextIsSigning
    } = nextProps

    const {
      fetchUserDetailByCode,
      fetchLocation,
      fetchAddress
    } = this.props

    if (currentUserCode !== nextUserCode) {
      fetchUserDetailByCode(nextUserCode)
    }
    if (currentIsInitialSucceed !== nextIsInitialSucceed && !currentLocation) {
      fetchLocation()
    }
    if (currentLocation !== nextLocation) {
      fetchAddress(nextLocation)
    }
    if (currentUserDetail !== nextUserDetail && !currentUserDetail) {
      localStorage.setItem('userId', nextUserDetail.userId)
      localStorage.setItem('userIdUpdateTime', Date.now())
    }
    if (nextIsSigning === false && currentIsSigning === true) {
      history.push('/waiqin/signSucceed')
    }
  }

  onSignClick = () => {
    const {address, location, userDetail, remarkText, remarkURL, handleSign } = this.props
    handleSign(location, address, userDetail.userId, remarkText, remarkURL)
  }

  onShowLocationClick = () => {
    const { location, address } = this.props
    const locationConfig = {
      latitude: location.latitude,
      longitude: location.longitude,
      name: '当前位置',
      address,
      scale: 20
    }
    showLocation(locationConfig)
  }

  render() {
    const { isInitialSucceed, isWxConfigLoading, address } = this.props
    const isAllLoaded = isInitialSucceed && ( isWxConfigLoading === false )
    const Address = address ? (
      <div className={cs('address-container', 'flex-center-container')}>
        <div style={{flex: 1}}>
          <span>{address}</span>
        </div>
        <div style={{flex: 1}}>
          <button className="btn-showmap" onClick={this.onShowLocationClick}>查看地图</button>
        </div>
      </div>
    ) : (
      <div className={cs('address-container', 'flex-center-container')}>
        <span>位置获取中...</span>
      </div>
    )
    const signButton = address ? (
      <img className="sign-button" src={signButtonURL} onClick={this.onSignClick}/>
    ) : (
      <img className="sign-button" src={preSignButtonURL}/>
    )
    const currentTimeObject = getCurrentTimeObject()
    if (!isAllLoaded)
      return <Loading />
    return (
      <div className="container">
        <MenuHeaderContainer
          rightLabel="查询"
          handleRightClick={() => {
            history.push('/waiqin/childUsers')
          }}
        />
        <div className={cs('time-container', 'flex-center-container')}>
          <div>
            <Timer rootClass="time-text"/>
          </div>
          <div>
            <span className="date-text">
              {currentTimeObject.year}年{currentTimeObject.month}月{currentTimeObject.day}日
            </span>
          </div>
        </div>
        <div className={cs('sign-container', 'flex-center-container')}>
          {signButton}
          <div className="sign-footer">
            <Link to="/waiqin/remark">添加备注...</Link>
          </div>
        </div>
        {Address}
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
  isSigning: state.waiqin.isSigning,
  remarkText:state.waiqin.remarkText,
  remarkURL: state.waiqin.remarkURL
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
  handleSign: (location, address, userId, remarkText, remarkURL) => {
    const params = {
      location,
      address,
      userId,
      remarkText,
      remarkURL
    }
    dispatch(actions.pushSignRecord(params))
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
