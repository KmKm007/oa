import actionTypes from '../../actionTypes'

const initialState = {
  isInitialSucceed: null,
  isWxConfigLoading: null,
  corpid: null,
  timestamp: null,
  signature: null,
  nonceStr: null,
  url: null
}

const wxInitial = state => {
  return {
    ...state,
    isInitialSucceed: false
  }
}

const wxInitialSucceed = state => {
  return {
    ...state,
    isInitialSucceed: true
  }
}

const requestWxConfig = state => {
  return {
    ...state,
    isWxConfigLoading: true
  }
}

const receiveWxConfig = (state, action) => {
  const config = action.config
  return {
    ...state,
    isWxConfigLoading: false,
    corpid: config.corpid,
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature,
    url: config.url
  }
}

const wxReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.WX_INITIAL:
      return wxInitial(state)
    case actionTypes.WX_INITIAL_SUCCEED:
      return wxInitialSucceed(state)
    case actionTypes.REQUEST_WX_CONFIG:
      return requestWxConfig(state)
    case actionTypes.RECEIVE_WX_CONFIG:
      return receiveWxConfig(state, action)
    default:
      return state
  }
}

export default wxReducer
