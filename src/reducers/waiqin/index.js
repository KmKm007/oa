import actionTypes from '../../actionTypes'

const inititalState = {
  location: null,
  address: null,
  currentTime: null,
  isSignSucceed: null
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
    isSignSucceed: false
  }
}

const postSignRecordSucceed = state => {
  return {
    ...state,
    isSignSucceed: true
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
      return postSignRecordSucceed(state)
    default:
      return state
  }
}

export default waiqinReducers
