import React from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base_button'

class FullButton extends React.Component {

  static propTypes = {
    className: PropTypes.string
  }

  render () {
    let { className, ...restProps } = this.props
    className = className || 'full-button'
    return (
      <BaseButton className={className} {...restProps} />
    )
  }
}

export default FullButton
