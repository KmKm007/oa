import actionTypes from '../actionTypes/'
import { getUserDetail } from '../middleWares/api'

export const receiveUserCode = userCode => ({
  type: actionTypes.RECEIVE_USER_CODE,
  userCode
})

export const requestUserDetail = userCode => ({
  type: actionTypes.REQUEST_USER_DETAIL,
  userCode
})

export const fetchUserDetail = userCode => dispatch => {
  dispatch(requestUserDetail)
  getUserDetail(userCode, userDetail => {
    dispatch(receiveUserDetail(userDetail))
  })
}

export const receiveUserDetail = userDetail => ({
  type: actionTypes.RECEIVE_USER_DETAIL,
  userDetail
})
