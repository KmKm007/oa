import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import actions from '../../actions'
import createHistory from 'history/createHashHistory'
import Loading from '../../components/Loading'

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
    let userId = userDetail ? userDetail.userId : 5151
    this.props.fetchUserChildren(userId)
  }

  onUserClick = userId => {
    userId = userId || this.props.userDetail.userId
    history.push(`/waiqin/history/${userId}`)
  }

  render () {
    const { userDetail, children } = this.props
    const childList = children ? (
      children.map(user => (
        <li className="child-body">
          <div className="child-body-left-container">
            <span className="child-label">{user.name}</span>
            <span className="child-position">{`(${user.position})`}</span>
          </div>
          <div>
            <button className="show-history-btn" onClick={() => this.onUserClick(user.userId)}>查看</button>
          </div>
        </li>
      ))
    ) : <Loading />


    return (
      <div className="container">
        <MenuHeaderContainer />
        <div className="myself-container">
          <div className="myself-body-container">
            <div className="myself-body">
              <div className="myself-body-left-container">
                <span className="child-label">自己</span>
                <span className="child-position">{`(${userDetail.position})`}</span>
              </div>
              <div>
                <button className="show-history-btn" onClick={this.onUserClick}>查看</button>
              </div>
            </div>
          </div>
        </div>
        <div className="child-container">
          {childList}
        </div>
      </div>
    )
  }
}

const stateToProps = state => ({
  userDetail: state.user.detail,
  children: state.user.children
})

const dispatchToProps = dispatch => ({
  fetchUserChildren: userId => dispatch(actions.fetchUserChildren(userId))
})

export default connect(stateToProps, dispatchToProps)(ListChildUserPage)
