import React from 'react'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import createHistory from 'history/createHashHistory'
import { connect } from 'react-redux'
import actions from '../../Redux/actions'
import SignHistoryContainer from '../../containers/waiqin/SignHistoryContainer'
import { previewImage } from '../../middleWares/wxSDK'

const history = createHistory()

class SignHistoryHistory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowDatePicker: false
    }
  }

  static defaultProps = {
    title: '的历史外勤'
  }

  componentWillMount() {
    const {title, historyBy } = this.props
    document.title = `${historyBy}${title}`
  }

  componentDidMount() {
    const { historyDates, historyBy: userId, handleFetchWaiqinHistory} = this.props
    handleFetchWaiqinHistory(userId, historyDates.beginTime, historyDates.endTime)
  }

  componentWillReceiveProps(nextProps) {
    const { historyDates: nextHistoryDates } = nextProps
    const { historyDates: currentHistoryDates, historyBy: userId } = this.props
    if (currentHistoryDates.beginTime !== nextHistoryDates.beginTime
      || currentHistoryDates.endTime !== nextHistoryDates.endTime) {
        this.props.handleFetchWaiqinHistory(userId, nextProps.beginTime, nextProps.endTime)
      }
  }



  handleDateSelected = (beginTime, endTime) => {
    this.props.handleHistoryDatesChange(beginTime, endTime)
    const userId = this.props.historyBy
    this.props.handleFetchWaiqinHistory(userId, beginTime, endTime)
  }

  handleRemarkClick = (remarkText, remarkImageURL) => {
    if (remarkImageURL)
      previewImage(remarkImageURL)
  }

  render () {
    const { signRecords, historyDates, isHistoryLoading } = this.props
    return (
      <div className="container">
        <MenuHeaderContainer
          rightLabel="签到"
          handleRightClick={() => {
            history.push('/waiqin/sign')
          }}
        />
        <SignHistoryContainer
          signRecords={signRecords}
          historyDates={historyDates}
          isHistoryLoading={isHistoryLoading}
          handleDateSelected={this.handleDateSelected}
          handleRemarkClick={this.handleRemarkClick}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { historys, historyBy, historyDates, isHistoryLoading } = state.waiqin
  const waiqinHistory = historys.find(h => h.userId === historyBy)
  return {
    historyBy,
    signRecords: waiqinHistory ? waiqinHistory.signRecords : null,
    historyDates,
    isHistoryLoading
  }
}

const mapDispatchToProps = dispatch => ({
  handleHistoryDatesChange: (beginTime, endTime) => dispatch(actions.changeWaiqinHistoryDates(beginTime, endTime)),
  handleFetchWaiqinHistory: (userId, beginTime, endTime) => dispatch(actions.fetchWaiqinHistory(userId, beginTime, endTime))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignHistoryHistory)
