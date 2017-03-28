import App from '../components/Main'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class WaiqinPage extends React.component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  }

}

const stateToProps = state => ({
  userId: state.user.userId
})

export default connect(stateToProps)(WaiqinPage)
