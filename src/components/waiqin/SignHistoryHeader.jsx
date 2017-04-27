import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'

const SignHistoryHeader = ({ isHistoryLoading, handleDateClick, beginTimeObject, endTimeObject }) => {
  return (
    <div className="waiqin-history-date-container" onClick={!isHistoryLoading ? handleDateClick : ''}>
      <div className="waiqin-history-date-left-container">
        <div className={cs('waiqin-history-date-left-body-container', 'flatpickr')}>
          <span className="date-title">开始时间</span>
          <span className="date-content">{`${beginTimeObject.year}/${beginTimeObject.month}/${beginTimeObject.day}`}</span>
        </div>
      </div>
      <div className="waiqin-history-date-middle-container">
        <span>—— 至 ——</span>
      </div>
      <div className="waiqin-history-date-right-container">
        <div className={cs('waiqin-history-date-right-body-container', 'flatpickr')}>
          <span className="date-title" data-toggle>结束时间</span>
            <span className="date-content">{`${endTimeObject.year}/${endTimeObject.month}/${endTimeObject.day}`}</span>
        </div>
      </div>
    </div>
  )
}

SignHistoryHeader.propTypes = {
  isHistoryLoading: PropTypes.oneOf([null, false, true]),
  handleDateClick: PropTypes.func.isRequired,
  beginTimeObject: PropTypes.object.isRequired,
  endTimeObject: PropTypes.object.isRequired
}

export default SignHistoryHeader
