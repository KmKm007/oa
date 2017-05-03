import React from 'react'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import createHistory from 'history/createHashHistory'
import { connect } from 'react-redux'
import actions from '../../Redux/actions'
import { showLocation } from '../../middleWares/wxSDK'
import SignHistoryContainer from '../../containers/waiqin/SignHistoryContainer'

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
    document.title = `${historyBy.name}${title}`
  }

  componentDidMount() {
    const { historyDates, historyBy, handleFetchWaiqinHistory} = this.props
    const userId = historyBy.userId
    handleFetchWaiqinHistory(userId, historyDates.beginTime, historyDates.endTime)
  }

  handleDateSelected = (beginTime, endTime) => {
    this.props.handleHistoryDatesChange(beginTime, endTime)
    const userId = this.props.historyBy.userId
    this.props.handleFetchWaiqinHistory(userId, beginTime, endTime)
  }

  onShowLocationClick = (longitude, latitude, address) => {
    const locationConfig = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      name: '签到位置',
      address,
      scale: 20
    }
    showLocation(locationConfig)
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
          onShowLocationClick={this.onShowLocationClick}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { historys, historyBy, historyDates, isHistoryLoading } = state.waiqin
  const waiqinHistory = historys.find(h => h.userId === historyBy.userId)
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
