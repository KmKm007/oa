import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import actions from '../../Redux/actions'
import actionTypes from '../../Redux/actionTypes'
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
    let userId = userDetail.userId
    this.props.fetchUserChildren(userId)
  }

  onUserClick = userId => {
    userId = userId || this.props.userDetail.userId
    this.props.handleHistoryByChange(userId)
    history.push('/waiqin/history')
  }

  render() {
    const {userDetail, children, errorMesg} = this.props
    if (!userDetail) {
      return <Loading loadingText="获取个人信息中..."/>
    }
    let content
    if (errorMesg) {
      content = <div className="errorMesg">查找下属列表失败！错误信息为：{errorMesg}</div>
    } else {
      if (children) {
        content = (
          <ul>
            {children.map(user => (
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
            }
          </ul>
        )
      } else {
        content =  <Loading loadingText="获取下属列表中..."/>
      }
    }
    return (
      <div className="container">
        <MenuHeaderContainer/>
        <div className="myself-container">
          <div className="myself-body-container">
            <div className="myself-body">
              <div className="myself-body-left-container">
                <span className="child-label">自己</span>
                <span className="child-position">{`(${userDetail.position})`}</span>
              </div>
              <div>
                <button className="show-history-btn" onClick={() => this.onUserClick(userDetail.userId)}>查看</button>
              </div>
            </div>
          </div>
        </div>
        <div className="child-container">
          {content}
        </div>
      </div>
    )
  }
}

const stateToProps = state => {
  const errorObject = state.user.errorMesgArray.find(mesg => mesg.errorType === actionTypes.RECEIVE_USER_CHILDREN_FAILED)
  return {
    userDetail: state.user.detail,
    children: state.user.children,
    errorMesg: errorObject ? errorObject.errorMesg : null
  }
}

const dispatchToProps = dispatch => ({
  fetchUserChildren: userId => dispatch(actions.fetchUserChildren(userId)),
  handleHistoryByChange: userId => dispatch(actions.changeWaiQinHistoryBy(userId))
})

export default connect(stateToProps, dispatchToProps)(ListChildUserPage)
