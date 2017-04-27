import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Timer from '../../components/Timer'
import { getCurrentTimeObject } from '../../utils/DateUtil'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import cs from 'classnames'
import Loading from '../../components/Loading'

const signButtonURL = require('../../images/sign.png')
const preSignButtonURL = require('../../images/preSign.png')

class SignContainer extends React.Component {
  static propTypes = {
    userDetail: PropTypes.object,
    address: PropTypes.string,
    onShowLocationClick: PropTypes.func.isRequired,
    onSignClick: PropTypes.func.isRequired
  }

  render () {
    const { isInitialSucceed, isWxConfigLoading, address, userDetail,
       onSignClick, onShowLocationClick, onSearchBtnClick } = this.props
    const isAllLoaded = isInitialSucceed && ( isWxConfigLoading === false ) && userDetail
    if (!isAllLoaded)
      return <Loading />
    const Address = address ? (
      <div className={cs('address-container', 'flex-center-container')}>
        <div style={{flex: 1}}>
          <span>{address}</span>
        </div>
        <div style={{flex: 1}}>
          <button className="btn-showmap" onClick={onShowLocationClick}>查看地图</button>
        </div>
      </div>
    ) : (
      <div className={cs('address-container', 'flex-center-container')}>
        <span>位置获取中...</span>
      </div>
    )

    const signButton = address ? (
      <img className="sign-button" src={signButtonURL} onClick={onSignClick}/>
    ) : (
      <img className="sign-button" src={preSignButtonURL}/>
    )

    const currentTimeObject = getCurrentTimeObject()

    return (
      <div className="container">
        <MenuHeaderContainer
          rightLabel="查询"
          handleRightClick={onSearchBtnClick}
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

export default SignContainer
