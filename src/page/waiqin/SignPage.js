import React from 'react'
import PropTypes from 'prop-types'
import createHistory from 'history/createHashHistory'
import { connect } from 'react-redux'
import actions from '../../Redux/actions'
import { showLocation } from '../../middleWares/wxSDK'
import SignContainer from '../../containers/waiqin/SignContainer'

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
    if (!userId || userId === 'undefined') {
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
    const {address, location, userDetail, remarkText, remarkImageId, handleSign } = this.props
    handleSign(location, address, userDetail.userId, remarkText, remarkImageId)
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

  onSearchBtnClick = () => {
    history.push('/waiqin/childUsers')
  }

  render() {
    const { userCode, userDetail, wxConfig, isInitialSucceed, isWxConfigLoading, location,
      address, isSigning } = this.props

    return (
      <SignContainer
        userCode={userCode}
        userDetail={userDetail}
        wxConfig={wxConfig}
        isInitialSucceed={isInitialSucceed}
        isWxConfigLoading={isWxConfigLoading}
        location={location}
        address={address}
        isSigning={isSigning}
        onShowLocationClick={this.onShowLocationClick}
        onSignClick={this.onSignClick}
        onSearchBtnClick={this.onSearchBtnClick}
      />
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
  remarkImageId: state.waiqin.remarkImageId
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
  handleSign: (location, address, userId, remarkText, remarkImageId) => {
    const params = {
      location,
      address,
      userId,
      remarkText,
      remarkImageId
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
