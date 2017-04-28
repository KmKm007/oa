import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../Redux/actions'
import createHistory from 'history/createHashHistory'
import ListChildUserContainer from '../../containers/waiqin/ListChildUserContainer'

const history = createHistory()

class ListChildUserPage extends React.Component {
  static propTypes = {
    userDetail: PropTypes.object.isRequired
  }

  static defaultProps = {
    title: '外勤历史'
  }

  componentWillMount() {
    document.title = this.props.title
    const userDetail = this.props.userDetail
    let userId = userDetail.userId
    this.props.fetchUserChildren(userId)
  }

  handleUserClick = (userId, name) => {
    userId = userId || this.props.userDetail.userId
    this.props.handleHistoryByChange(userId, name)
    history.push('/waiqin/history')
  }

  render() {
    const {userDetail, children, errors} = this.props
    return (
      <ListChildUserContainer
        userDetail={userDetail}
        children={children}
        errors={errors}
        handleUserClick={this.handleUserClick}
      />
    )
  }
}

const stateToProps = state => {
  return {
    userDetail: state.user.detail,
    children: state.user.children,
    errors: state.user.errors
  }
}

const dispatchToProps = dispatch => ({
  fetchUserChildren: userId => dispatch(actions.fetchUserChildren(userId)),
  handleHistoryByChange: (userId, name) => dispatch(actions.changeWaiQinHistoryBy(userId, name))
})

export default connect(stateToProps, dispatchToProps)(ListChildUserPage)
