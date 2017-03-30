import actionTypes from '../actionTypes'
import { getAddress, saveSignRecord } from '../middleWares/api'
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

export const postSignRecord = (location, address, userId) => ({
  type: actionTypes.POST_SIGN_RECORD,
  location,
  address,
  userId
})

export const pushSignRecord = (location, address, userId) => dispatch => {
  dispatch(postSignRecord(location, address, userId))
  saveSignRecord(location, address, userId, result => {
    dispatch(postSignRecordSucceed(result))
  })
}

export const postSignRecordSucceed = result => ({
  type: actionTypes.POST_SIGN_RECORD_SUCCEED,
  result
})
