import React, { PropTypes } from 'react'
import cs from 'classnames'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import { hashHistory as history} from 'react-router'
import { connect } from 'react-redux'
import { parseToTimeObject } from '../../utils/DateUtil'

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
        history.push('/waiqin/sign')
      } else {
        document.title = '签到成功'
      }
  }

  render () {
    const { title, address, signTime} = this.props
    const signSucceedImg = require('../../images/signSucceed.png')
    const timeObject = parseToTimeObject(signTime)
    const time = (
      <div className="sign-succeed-info-sign-time">
        <span>{timeObject.hour}:{timeObject.minute}</span>
        &nbsp;&nbsp;&nbsp;
        <span>{timeObject.year}年{timeObject.month}月{timeObject.day}日</span>
      </div>
    )
    return (
      <div className="container">
        <MenuHeaderContainer title={title}/>
        <div className="sign-succeed-container">
          <div className={cs('sign-succeed-body', 'flex-center-container')}>
            <img id="signSucceedImg" src={signSucceedImg}/>
            <span className="sign-succeed-tips">每天都是好心情哦~</span>
          </div>
          <div className="sign-succeed-info">
            <div className={cs('sign-succeed-info-texts', 'sign-succeed-info-icons')}>
              <svg fill="#666666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
              <svg fill="#666666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </div>
            <div className={cs('sign-succeed-info-texts', 'sign-succeed-info-sign')}>
              {time}
              <div>{address}</div>
            </div>
          </div>
          <div className="sign-succeed-button-container">
            <button className="share-button">立即分享</button>
          </div>
        </div>
      </div>
    )
  }
}

const stateToProps = state => ({
  address: state.waiqin.address,
  signTime: state.waiqin.signTime,
  isSigning: state.waiqin.isSigning
})

export default connect(stateToProps)(SignSucceedPage)
