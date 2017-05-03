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
    handleSign: PropTypes.func.isRequired
  }

  static defaultProps = {
    title: '东莞中原外勤签到'
  }

  componentWillMount() {
    document.title = this.props.title
  }

  componentDidMount() {
    const address = this.props.address
    if (!address) {
      this.props.fetchLocation()
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: currentLocation,
      isSigning: currentIsSigning
    } = this.props

    const {
      location: nextLocation,
      isSigning: nextIsSigning
    } = nextProps

    const { fetchAddress } = this.props

    if (currentLocation !== nextLocation && !currentLocation) {
      fetchAddress(nextLocation)
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


  hanleReFetchLocation = () => {
    this.props.removeLocationAndAddress()
    this.props.fetchLocation()
  }

  render() {
    const { location, address, isSigning, errors } = this.props

    return (
      <SignContainer
        location={location}
        address={address}
        isSigning={isSigning}
        onShowLocationClick={this.onShowLocationClick}
        onSignClick={this.onSignClick}
        onSearchBtnClick={this.onSearchBtnClick}
        errors={errors}
        hanleReFetchLocation={this.hanleReFetchLocation}
      />
    )
  }
}

const stateToProps = state => ({
  userDetail: state.user.detail,
  location: state.waiqin.location,
  address: state.waiqin.address,
  isSigning: state.waiqin.isSigning,
  remarkText:state.waiqin.remarkText,
  remarkImageId: state.waiqin.remarkImageId,
  errors: state.waiqin.errors
})

const dispatchToProps = dispatch => ({
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
  fetchLocation: () => {
    dispatch(actions.fetchLocation())
  },
  fetchAddress: location => {
    dispatch(actions.fetchAddress(location))
  },
  removeLocationAndAddress: () => {
    dispatch(actions.removeLocationAndAddress())
  }
})

export default connect(stateToProps, dispatchToProps)(WaiqinPage)
