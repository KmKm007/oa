import actionTypes from '../../actionTypes'
import ReducerUtil from '../../../utils/ReducerUtil'

const initialState = {
  isInitialSucceed: null,
  isWxConfigLoading: null,
  corpid: null,
  timestamp: null,
  signature: null,
  nonceStr: null,
  url: null,
  errors: []
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

const receiveWxConfigFailed = (state, action) => {
  const errors = state.errors
  const { errorType, errorMesg } = action
  const nextErrors = ReducerUtil.getNextErrors(errors, errorType, errorMesg)
  return {
    isWxConfigLoading: false,
    ...state,
    errors: nextErrors
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
    case actionTypes.RECEIVE_WX_CONFIG_FAILED:
      return receiveWxConfigFailed(state, action)
    default:
      return state
  }
}

export default wxReducer
