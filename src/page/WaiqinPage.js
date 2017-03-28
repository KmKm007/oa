import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import cs from 'classnames'
import actions from '../actions'

const signButtonURL = require('../images/sign.png')

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
  }

  render() {
    const { title } = this.props
    const { handleSign } = this.props
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
          <img className="sign-button" src={signButtonURL} onClick={handleSign}/>
          <div className="sign-footer">
            <span>添加备注...</span>
          </div>
        </div>
        <div className={cs('address-container', 'flex-center-container')}>
          <span>
            胜和路10号
          </span>
          <span>
            东莞市南城区胜和路
          </span>
        </div>
      </div>
    )
  }
}

const stateToProps = state => ({
  userId: state.user.userId,
  wxConfig: {
    corpid: state.wx.corpid,
    nonceStr: state.wx.nonceStr,
    signature: state.wx.signature,
    url: state.wx.url,
    timestamp: state.wx.url
  },
  isInitialSucceed: state.wx.isInitialSucceed,
  isWxConfigLoading: state.wx.isWxConfigLoading
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
  }
})

export default connect(stateToProps, dispatchToProps)(WaiqinPage)
