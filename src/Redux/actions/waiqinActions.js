import actionTypes from '../actionTypes'
import { getAddress,
        saveSignRecord,
        getWaiqinHistory,
        postWaiqinRemarkImage } from '../../middleWares/api'
import { getLocation, chooseImage, uploadImage } from '../../middleWares/wxSDK'

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

export const changeWaiQinHistoryBy = (userId, name) => ({
  type: actionTypes.CHANGE_WAIQIN_HISTORY_BY,
  userId,
  name
})


export const requestWaiqinHistory = params => ({
  type: actionTypes.REQUEST_WAIQIN_HISTORY,
  params
})

export const receiveWaiqinHistory = (params, signRecords) => ({
  type: actionTypes.RECEIVE_WAIQIN_HISTORY,
  params,
  signRecords
})

export const fetchWaiqinHistory = (userId, beginTime, endTime) => dispatch => {
  const params = {
    userId
  }
  if (beginTime) {
    params.beginTime = beginTime
    params.endTime = endTime
  }
  dispatch(requestWaiqinHistory(params))
  getWaiqinHistory(params, signRecords => {
    dispatch(receiveWaiqinHistory(params, signRecords))
  })
}

export const changeWaiqinHistoryDates = (beginTime, endTime) => ({
  type: actionTypes.CHANGE_WAIQIN_HISTORY_DATES,
  beginTime,
  endTime
})

export const saveWaiqinRemarkImage = imageLocalId => ({
  type: actionTypes.SAVE_WAIQIN_REMARK_IMAGE,
  imageLocalId
})

export const receiveWaiqinRemarkImageURI = (imageId, imageURI) => ({
  type: actionTypes.RECEIVE_WAIQIN_REMARK_IMAGE_URI,
  imageId,
  imageURI
})

export const beginUploadWaiqinRemarkImage = () => ({
  type: actionTypes.BEGIN_UPLOAD_WAIQIN_REMARK_IMAGE
})

export const fetchWaiqinRemarkImage = userId => dispatch => {
  chooseImage(resp => {
    const imageId = resp.localIds[0]
    dispatch(saveWaiqinRemarkImage(imageId))
    dispatch(beginUploadWaiqinRemarkImage())
    uploadImage(imageId, mediaId => {
      const params = { mediaId, userId }
      postWaiqinRemarkImage(params, (imageId, imageURI) => {
        dispatch(receiveWaiqinRemarkImageURI(imageId, imageURI))
      }, () => {})
    })
  })
}
