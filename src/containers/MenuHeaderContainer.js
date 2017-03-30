import React, { PropTypes } from 'react'
import cs from 'classnames'

const MenuHeaderContainer = ({ title }) => {
  return (
    <div className="header">
      <div className={cs('text-center', 'headerLeftContainter')}>返回</div>
      <h2 className={cs('text-center', 'headerMiddleContainer')}>{title}</h2>
      <div className={cs('text-center', 'headerRightContainer')}>菜单</div>
    </div>
  )
}

MenuHeaderContainer.propTypes = {
  title: PropTypes.string.isRequired
}

export default MenuHeaderContainer
