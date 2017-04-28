import React from 'react'
import PropTypes from 'prop-types'
import { parseToTimeObject } from '../../utils/DateUtil'

const SignHistoryBody = ({ signRecords, handleShowRemark }) => {
  return signRecords.length > 0 ? (
    <ul className="history-container">
      {
        signRecords.map((h, index) => {
        const timeObject = parseToTimeObject(h.createTime)
        return (
          <li className="history-item-container" key={'h' + index}>
            <div className="history-item-mesg-container">
              <div className="history-item-icon-container">
                <svg className="history-item-title-icon" fill="#536793" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </div>
              <div className="history-item-text-container">
                <div className="history-item-text-time-container">
                  <span>{`${timeObject.year}.${timeObject.month}.${timeObject.day}`}</span>
                  <span className="history-item-text-time-ms">{`${timeObject.hour}:${timeObject.minute}`}</span>
                </div>
                <div className="history-item-text-address-container">
                  <svg className="history-item-address-icon" fill="#6f6f6f" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                  <span>{h.address}</span>
                </div>
                { ( h.remarkText || h.image ) ?
                  <div className="history-item-photo-container">
                    <div onClick={() => handleShowRemark(h.remarkText, h.image)}>
                      <svg className="history-item-bookmark-icon" fill="#6f6f6f" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                      </svg>
                      <span>备注</span>
                    </div>
                  </div>
                  :
                  ''
                }
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  ) : (
    <div className="errorMesg">
      <span>无考勤记录！</span>
    </div>
  )
}

SignHistoryBody.propTypes = {
  signRecords: PropTypes.array.isRequired
}

export default SignHistoryBody
