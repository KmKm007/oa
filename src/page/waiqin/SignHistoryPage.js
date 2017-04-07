import React from 'react'
import MenuHeaderContainer from '../../containers/MenuHeaderContainer'
import createHistory from 'history/createHashHistory'
import { connect } from 'react-redux'
import Loading from '../../components/Loading'
import { parseToTimeObject } from '../../utils/DateUtil'

const history = createHistory()

class SignHistoryHistory extends React.Component {
  static defaultProps = {
    title: '的历史外勤'
  }

  componentWillMount() {
      const {title, historyBy } = this.props
      document.title = `${historyBy}${title}`
  }

  render () {
    const { signRecords } = this.props
    const WaiqinBody = signRecords ? (
        <ul className="history-container">
          {signRecords.map(h => {
            const timeObject = parseToTimeObject(h.createTime)
            return (
              <li className="history-item-container">
                <div className="history-item-mesg-container">
                  <div className="history-item-icon-container">
                    <svg className="history-item-time-icon" fill="#FFB413" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <svg className="history-item-address-icon" fill="#FFB413" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                  </div>
                  <div className="history-item-text-container">
                    <div className="history-item-text-time-container">
                      <span>{`${timeObject.year}.${timeObject.month}.${timeObject.day}`}</span>
                      <span className="history-item-text-time-ms">{`${timeObject.hour}:${timeObject.minute}`}</span>
                    </div>
                    <div className="history-item-text-address-container">
                      <span>{h.address}</span>
                    </div>
                  </div>
                </div>
                {h.remarkText? <div className="history-item-photo-container"></div> : ''}
              </li>
            )
          })}
        </ul>
    ) : (
      <Loading loadingText="数据加载中..." />
    )
    return (
      <div className="container">
        <MenuHeaderContainer
          rightLabel="签到"
          handleRightClick={() => {
            history.push('/waiqin/sign')
          }}
        />
        <div className="waiqin-history-container">
          <div className="waiqin-history-date-container">
            <div className="waiqin-history-date-left-container">
              <div className="waiqin-history-date-left-body-container">
                <span className="date-title">开始时间</span>
                <span className="date-content">2017-03-31</span>
              </div>
            </div>
            <div className="waiqin-history-date-middle-container">
              <span>—— 至 ——</span>
            </div>
            <div className="waiqin-history-date-right-container">
              <div className="waiqin-history-date-right-body-container">
                <span className="date-title">开始时间</span>
                <span className="date-content">2017-03-31</span>
              </div>
            </div>
          </div>
          <div className="waiqin-history-body-container">
            {WaiqinBody}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const historys = state.waiqin.historys
  const historyBy = state.waiqin.historyBy
  const waiqinHistory = historys.find(h => h.userId === historyBy)
  return {
    historyBy,
    signRecords: waiqinHistory ? waiqinHistory.signRecords : null
  }
}

export default connect(mapStateToProps)(SignHistoryHistory)
