import React from 'react'
import cs from 'classnames'

const MenuHeaderContainer = ({ leftLabel, rightLabel, title }) => {
  return (
    <div className="header">
      <div className={cs('text-center', 'headerLeftContainter')}>{leftLabel || '返回'}</div>
      <h2 className={cs('text-center', 'headerMiddleContainer')}>{title}</h2>
      <div className={cs('text-center', 'headerRightContainer')}>{ rightLabel || ''}</div>
    </div>
  )
}

export default MenuHeaderContainer
