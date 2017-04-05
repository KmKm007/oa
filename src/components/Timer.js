import React from 'react'
import { parseToTimeObject } from '../utils/DateUtil'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: Date.now(),
      isShadow: false
    }
  }

  componentDidMount() {
    this.updateView()
  }

  updateView() {
    setTimeout(() => {
      const currentTime = Date.now()
      const millisecond = parseToTimeObject(currentTime).millisecond
      const isShadow = millisecond > 500 ? true : false
      this.setState({
        currentTime,
        isShadow
      })
      this.updateView()
    }, 500)
  }

  render () {
    const { rootStyle, rootClass } = this.props
    const { currentTime, isShadow } = this.state
    const timeObject = parseToTimeObject(currentTime)
    const color = isShadow ? style.shadowColor : style.defaultColor
    return (
      <div style={rootStyle?rootStyle:{}} className={rootClass}>
        <span>{timeObject.hour}</span>
        <span style={{color}}>:</span>
        <span>{timeObject.minute}</span>
      </div>
    )
  }
}

const style = {
  shadowColor: '#ffffff',
  defaultColor: '#000000'
}

export default Timer
