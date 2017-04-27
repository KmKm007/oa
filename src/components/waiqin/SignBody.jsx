import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cs from 'classNames'

const signButtonURL = require('../../images/sign.png')

const SignBody = ({ onSignClick, onShowLocationClick, address }) => {
  return (
    <div>
      <div className={cs('sign-container', 'flex-center-container')}>
        <img className="sign-button" src={signButtonURL} onClick={onSignClick}/>
        <div className="sign-footer">
          <Link to="/waiqin/remark">添加备注...</Link>
        </div>
      </div>
      <div className={cs('address-container', 'flex-center-container')}>
        <div>
          <span>{address}</span>
        </div>
        <div className="showmap-container">
          <button className="btn-showmap" onClick={onShowLocationClick}>查看地图</button>
        </div>
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
