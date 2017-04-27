import React from 'react'
import PropTypes from 'prop-types'
import { parseToTimeObject } from '../utils/DateUtil'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: Date.now(),
      isShadow: false
    }
  }

  static propTypes = {
    shadowClass: PropTypes.string
  }

  componentDidMount() {
    this.circle = setInterval(this.updateView,500)
  }

  componentWillUnmount() {
    clearInterval(this.circle)
  }

  updateView = () => {
      const currentTime = Date.now()
      const millisecond = parseToTimeObject(currentTime).millisecond
      const isShadow = millisecond > 500 ? true : false
      this.setState({
        currentTime,
        isShadow
      })
  }

  render () {
    const { rootStyle, rootClass } = this.props
    const { currentTime, isShadow } = this.state
    const timeObject = parseToTimeObject(currentTime)
    const style = isShadow ? shadowStyle : defaultStyle
    return (
      <div style={rootStyle?rootStyle:{}} className={rootClass}>
        <span>{timeObject.hour}</span>
        <span style={style}>:</span>
        <span>{timeObject.minute}</span>
      </div>
    )
  }
}

const shadowStyle = {
  color: '#f2f2f2'
}

const defaultStyle = {
  color: '#000000'
}

export default Timer
