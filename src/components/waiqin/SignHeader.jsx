import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classNames'
import Timer from '../Timer'

const SignHeader = ({ currentTimeObject }) => {
  return (
    <div className={cs('time-container', 'flex-center-container')}>
      <div>
        <Timer rootClass="time-text" />
      </div>
      <div>
        <span className="date-text">
          {currentTimeObject.year}年
          {currentTimeObject.month}月
          {currentTimeObject.day}日
        </span>
      </div>
    </div>
  )
}

SignHeader.propTypes = {
  currentTimeObject: PropTypes.object.isRequired
}

export default SignHeader
