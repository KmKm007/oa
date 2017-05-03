import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CircleButton, TinyButton } from '../../components/ui/button'
import cs from 'classNames'

const signButtonURL = require('../../images/sign.png')

const SignBody = ({ onSignClick, onShowLocationClick, onReFetchLocation, address }) => {
  return (
    <div>
      <div className={cs('sign-container', 'flex-center-container')}>
        <div className="sign-button-container">
          <img className="sign-button" src={signButtonURL} onClick={onSignClick}/>
        </div>
        <div className="sign-footer">
          <Link to="/waiqin/remark" className="remark-btn">添加备注</Link>
        </div>
      </div>
      <div className={cs('address-container', 'flex-center-container')}>
        <div className="address-text-container">
          <svg fill="#1296DB" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <span>{address}</span>
        </div>
        <div className="address-refresh-container">
          <TinyButton onClick={onReFetchLocation}>刷新定位</TinyButton>
        </div>
      </div>
      <div className="showmap-container">
        <CircleButton onClick={onShowLocationClick}>查看地图</CircleButton>
      </div>
    </div>
  )
}

SignBody.propTypes = {
  onSignClick: PropTypes.func.isRequired,
  onShowLocationClick: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired
}

export default SignBody
