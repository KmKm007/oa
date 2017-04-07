import actionTypes from '../actionTypes'
import { getAddress, saveSignRecord, getWaiqinHistory } from '../middleWares/api'
import { getLocation } from '../middleWares/wxSDK'

export const requestLocation = () => ({
  type: actionTypes.REQUEST_LOCATION
})

export const fetchLocation = () => dispatch => {
  dispatch(requestLocation())
  getLocation(location => {
    dispatch(receiveLocation(location))
  })
}

export const receiveLocation = location => ({
  type: actionTypes.RECEIVE_LOCATION,
  location
})

export const requestAddress = location => ({
  type: actionTypes.REQUEST_ADDRESS,
  location
})

export const fetchAddress = location => dispatch => {
  dispatch(requestAddress(location))
  getAddress(location, nextLocation => {
    dispatch(receiveAddress(nextLocation))
  })
}

export const receiveAddress = location => ({
  type: actionTypes.RECEIVE_ADDRESS,
  location
})

export const updateCurrentTime = currentTime => ({
  type: actionTypes.UPDATE_CURRENTTIME,
  currentTime
})

export const postSignRecord = params => ({
  type: actionTypes.POST_SIGN_RECORD,
  params
})

export const pushSignRecord = params => dispatch => {
  dispatch(postSignRecord(params))
  saveSignRecord(params, result => {
    dispatch(postSignRecordSucceed(result))
  })
}

export const postSignRecordSucceed = result => ({
  type: actionTypes.POST_SIGN_RECORD_SUCCEED,
  result
})

export const saveWaiqinRemark = (remarkText, remarkURL) => ({
  type: actionTypes.SAVE_WAIQIN_REMARK,
  remarkText,
  remarkURL
})

export const requestWaiqinHistory = userId => ({
  type: actionTypes.REQUEST_WAIQIN_HISTORY,
  userId
})

export const receiveWaiqinHistory = (userId,signRecords) => ({
  type: actionTypes.RECEIVE_WAIQIN_HISTORY,
  userId,
  signRecords
})

export const fetchWaiqinHistory = userId => dispatch => {
  dispatch(requestWaiqinHistory(userId))
  getWaiqinHistory(userId, signRecords => {
    dispatch(receiveWaiqinHistory(userId, signRecords))
  })
}
