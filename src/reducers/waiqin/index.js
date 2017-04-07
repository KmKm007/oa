import actionTypes from '../../actionTypes'

const inititalState = {
  location: null,
  address: null,
  signTime: null,
  isSigning: null,
  remarkText: null,
  remarkURL: null,
  historys: [],
  historyBy: null
}

const receiveLocation = (state, action) => {
  return {
    ...state,
    location: action.location
  }
}

const receiveAddress = (state, action) => {
  const address = action.location.address
  return {
    ...state,
    address
  }
}

const updateCurrentTime = (state, action) => {
  return {
    ...state,
    currentTime: action.currentTime
  }
}

const postSignRecord = state => {
  return {
    ...state,
    isSigning: true
  }
}

const postSignRecordSucceed = (state, action) => {
  const result = action.result
  return {
    ...state,
    isSigning: false,
    signTime: result.signTime
  }
}

const saveWaiqinRemark = (state, action) => {
  const { remarkText, remarkURL } = action
  return {
    ...state,
    remarkText,
    remarkURL
  }
}

const requestWaiqinHistory = (state, action) => {
  return {
    ...state,
    historyBy: action.userId
  }
}

const receiveWaiqinHistory = (state, action) => {
  const { userId, signRecords }  = action
  const historys = state.historys.filter(history => history.userId !== userId)
  historys.push({
    userId,
    signRecords
  })
  return {
    ...state,
    historys
  }
}

const waiqinReducers = (state = inititalState, action) => {
  switch(action.type) {
    case actionTypes.RECEIVE_LOCATION:
      return receiveLocation(state, action)
    case actionTypes.RECEIVE_ADDRESS:
      return receiveAddress(state, action)
    case actionTypes.UPDATE_CURRENTTIME:
      return updateCurrentTime(state, action)
    case actionTypes.POST_SIGN_RECORD:
      return postSignRecord(state)
    case actionTypes.POST_SIGN_RECORD_SUCCEED:
      return postSignRecordSucceed(state, action)
    case actionTypes.SAVE_WAIQIN_REMARK:
      return saveWaiqinRemark(state, action)
    case actionTypes.REQUEST_WAIQIN_HISTORY:
      return requestWaiqinHistory(state, action)
    case actionTypes.RECEIVE_WAIQIN_HISTORY:
      return receiveWaiqinHistory(state, action)
    default:
      return state
  }
}

export default waiqinReducers
