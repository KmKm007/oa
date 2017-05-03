import React from 'react'
import PropTypes from 'prop-types'

class BaseButton extends React.Component {
  
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node
  }

  render () {
    let { className, children, ...restProps } = this.props
    className = className || 'full-button'
    return (
      <button className={className} {...restProps}>
        {children}
      </button>
    )
  }
}

export default BaseButton
