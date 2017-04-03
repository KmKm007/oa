import React from 'react'

const getTimeObject = time => {
  const date = new Date(time)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const millisecond = date.getMilliseconds()
  const hourString = hour > 9? hour : ('0' + hour)
  const minuteString = minute > 9? minute : ('0' + minute)
  const secondString = second > 9? second : ('0' + second)
  return {
    hour: hourString,
    minute: minuteString,
    second: secondString,
    millisecond
  }
}

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
      const millisecond = getTimeObject(currentTime).millisecond
      const isShadow = millisecond > 500 ? true : false
      this.setState({
        currentTime,
        isShadow
      })
      this.updateView()
    }, 500)
  }

  render () {
    const rootStyle = this.props.rootStyle
    const { currentTime, isShadow } = this.state
    const timeObject = getTimeObject(currentTime)
    const color = isShadow ? style.shadowColor : style.defaultColor
    return (
      <div style={rootStyle?rootStyle:{}}>
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
