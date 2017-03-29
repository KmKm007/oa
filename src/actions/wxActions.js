import actionTypes from '../actionTypes/'
import { inital } from '../middleWares/wxSDK'
import { getWxConfig } from '../middleWares/api'

export const wxInitial = () => ({
  type: actionTypes.WX_INITIAL
})

export const wxFetchInitial = config => dispatch => {
  dispatch(wxInitial())
  inital(config, () => {
    dispatch(wxInitialSucceed())
  })
}

export const wxInitialSucceed = () => ({
  type: actionTypes.WX_INITIAL_SUCCEED
})

export const requestWxConfig = () => ({
  type: actionTypes.REQUEST_WX_CONFIG
})

export const receiveWxConfig = config => ({
  type: actionTypes.RECEIVE_WX_CONFIG,
  config
})

export const fetchWxConfig = () => dispatch => {
  dispatch(requestWxConfig())
  getWxConfig(config => {
    dispatch(receiveWxConfig(config))
    dispatch(wxFetchInitial(config))
  })
}
