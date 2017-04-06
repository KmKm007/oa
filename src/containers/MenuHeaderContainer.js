import React from 'react'
import cs from 'classnames'
import createHistory from 'history/createHashHistory'

const history = createHistory()

class MenuHeaderContainer extends React.Component {
  static defaultProps = {
    defaultLeftLabel: '返回',
    handleDefaultLeftClick: () => {
      history.goBack()
    }
  }

  render () {
    const {
      leftLabel,
      rightLabel,
      title,
      handleLeftClick,
      handleRightClick,
      handleDefaultLeftClick,
      defaultLeftLabel
    } = this.props
    const onLeftClick = handleLeftClick ? handleLeftClick : handleDefaultLeftClick
    const onRightClick = handleRightClick
    return (
      <div className="header">
        <div className={cs('text-center', 'headerLeftContainter')}>
          <a onClick={e => {
            e.preventDefault()
            onLeftClick()
          }}>
            {leftLabel || defaultLeftLabel}
          </a>
        </div>
        <h2 className={cs('text-center', 'headerMiddleContainer')}>{title}</h2>
        <div className={cs('text-center', 'headerRightContainer')}>
          <a onClick={e => {
            e.preventDefault()
            if (typeof(onRightClick) === 'function')
              onRightClick()
          }}>
              { rightLabel || ''}
          </a>
        </div>
      </div>
    )
  }
}



export default MenuHeaderContainer
