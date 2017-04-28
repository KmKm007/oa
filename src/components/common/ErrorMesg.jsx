import React from 'react'
import PropTypes from 'prop-types'

const ErrorMesg = ({ errorMesg }) => {
  return (
    <div className="errorMesg-container">
      <span className="errorMesg">{errorMesg}</span>
    </div>
  )
}

ErrorMesg.propTypes = {
  errorMesg: PropTypes.string.isRequired
}

export default ErrorMesg
