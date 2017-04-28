import React from 'react'
import SignHistoryBody from '../../components/waiqin/SignHistoryBody'
import SignHistoryHeader from '../../components/waiqin/SignHistoryHeader'
import { parseToTimeObject } from '../../utils/DateUtil'
import Calander from '../../containers/Calander'
import PreViewer from '../../components/common/PreViewer'
import Loading from '../../components/common/Loading'

class SignHistoryContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowDatePicker: false,
      isShowRemark: false,
      remark: null
    }
  }

  handleDateClick = () => {
    this.setState({
      isShowDatePicker: true
    })
  }

  handleShowRemark = (remarkText, image) => {
    this.setState({
      isShowRemark: true,
      remark: {
        remarkText,
        image
      }
    })
  }

  handlePreviewerDestory = () => {
    this.setState({
      isShowRemark: false,
      remark: null
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
    const { signRecords, historyDates, isHistoryLoading, onShowLocationClick } = this.props
    const beginTimeObject = parseToTimeObject(historyDates.beginTime)
    const endTimeObject = parseToTimeObject(historyDates.endTime)
    const WaiqinBody = (!isHistoryLoading && signRecords) ?
    <SignHistoryBody
      signRecords={signRecords}
      handleShowRemark={this.handleShowRemark}
      onShowLocationClick={onShowLocationClick}
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
        {
          this.state.isShowRemark ? (
            <PreViewer
              text={this.state.remark.remarkText}
              image={this.state.remark.image}
              handleDestory={this.handlePreviewerDestory}
            />
          )
          : ''
        }
      </div>
    )
  }
}

export default SignHistoryContainer
