import React from 'react'
import PropTypes from 'prop-types'
import createHistory from 'history/createHashHistory'
import { connect } from 'react-redux'
import SignSucceedContainer from '../../containers/waiqin/SignSucceedContainer'

const history = createHistory()

class SignSucceedPage extends React.Component {
  static defaultProps = {
    title: '签到成功'
  }

  static propTypes = {
    address: PropTypes.string.isRequired,
    signTime: PropTypes.number.isRequired
  }

  componentWillMount() {
      const { address, signTime, isSigning } = this.props
      if (!address || !signTime || isSigning === null || isSigning) {
        history.replace('/waiqin/sign')
      } else {
        document.title = '签到成功'
      }
  }

  render () {
    const {address, signTime} = this.props
    return (
      <SignSucceedContainer
        address={address}
        signTime={signTime}
      />
    )
  }
}

const stateToProps = state => ({
  address: state.waiqin.address,
  signTime: state.waiqin.signTime,
  isSigning: state.waiqin.isSigning
})

export default connect(stateToProps)(SignSucceedPage)
