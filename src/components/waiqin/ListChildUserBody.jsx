import React from 'react'
import PropTypes from 'prop-types'

const ListChildUserBody = ({ children, onUserClick }) => {
  return (
    <ul>
      {children.map(user => (
          <li className="child-body" key={user.code}>
            <div className="child-body-left-container">
              <span className="child-label">{user.name}</span>
              <span className="child-position">{`(${user.position.name})`}</span>
            </div>
            <div>
              <button className="show-history-btn" onClick={() => onUserClick(user.code, user.name)}>查看</button>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

ListChildUserBody.propTypes = {
  children: PropTypes.array
}

export default ListChildUserBody
