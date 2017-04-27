import React from 'react'
import Calander from '../../containers/Calander'
import Loading from '../../components/Loading'
import SignHistoryBody from '../../components/waiqin/SignHistoryBody'
import SignHistoryHeader from '../../components/waiqin/SignHistoryHeader'
import { parseToTimeObject } from '../../utils/DateUtil'

class SignHistoryContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowDatePicker: false
    }
  }

  handleDateClick = () => {
    this.setState({
      isShowDatePicker: true
    })
  }

  onDateSelected = event => {
    if (event.eventType === 3) {
      const beginTime = event.start.getTime()
      const endTime = event.end.getTime()
      this.props.handleDateSelected(beginTime, endTime)
      this.setState({
        isShowDatePicker: false
      })
    }
  }

  render () {
    const { signRecords, historyDates, isHistoryLoading, handleRemarkClick } = this.props
    const beginTimeObject = parseToTimeObject(historyDates.beginTime)
    const endTimeObject = parseToTimeObject(historyDates.endTime)
    const WaiqinBody = (!isHistoryLoading && signRecords) ?
    <SignHistoryBody
      signRecords={signRecords}
      handleRemarkClick={handleRemarkClick}
    /> : <Loading loadingText="数据加载中..." />
    const Content = this.state.isShowDatePicker ?
      <Calander onSelect={this.onDateSelected} /> :
      (
        <div className="waiqin-history-container">
          <SignHistoryHeader
            beginTimeObject={beginTimeObject}
            endTimeObject={endTimeObject}
            isHistoryLoading={isHistoryLoading}
            handleDateClick={this.handleDateClick}
          />
          {WaiqinBody}
        </div>
      )
    return (
      <div>
        {Content}
      </div>
    )
  }
}

export default SignHistoryContainer
