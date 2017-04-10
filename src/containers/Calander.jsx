import React from 'react'
import InfiniteCalendar, { withRange, Calendar } from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'
import attachFastClick from 'fastclick'

class Calander extends React.Component {
  componentDidMount() {
    attachFastClick.attach(document.getElementById('calendar-container'))
  }
  render () {
    return (
      <div id="calendar-container">
        <InfiniteCalendar
          {...this.props}
          width={window.innerWidth}
          height={window.innerHeight}
          rowHeight={70}
          Component={withRange(Calendar)}
          locale={{
            locale: require('date-fns/locale/zh_cn'),
            headerFormat: 'yyy/MMM/dddd',
            weekdays: ['周日', '周一','周二','周三','周四','周五','周六'],
            blank: '选择日期',
            todayLabel: {
            long: '今天'
            }
          }}
          displayOptions={{
            showHeader: false
          }}
        />
      </div>
    )
  }
}

export default Calander
