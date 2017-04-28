import React from 'react'
import PropTypes from 'prop-types'

const ListChildUserHeader = ({ userDetail, onUserClick }) => {
  return (
    <div className="myself-container">
      <div className="myself-body-container">
        <div className="myself-body">
          <div className="myself-body-left-container">
            <span className="child-label">自己</span>
            <span className="child-position">{`(${userDetail.position})`}</span>
          </div>
          <div>
            <button className="show-history-btn" onClick={() => onUserClick(userDetail.userId, '我')}>查看</button>
          </div>
        </div>
      </div>
    </div>
  )
}

ListChildUserHeader.propTypes = {
  userDetail: PropTypes.object.isRequired
}

export default ListChildUserHeader
