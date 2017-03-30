import actionTypes from '../actionTypes/'
import { getUserDetailByCode, getUserDetailById } from '../middleWares/api'
import { getUserCode } from '../middleWares/wxSDK'

export const requestUserCode = () => ({
  type: actionTypes.REQUEST_USER_CODE
})

export const fetchUserCode = () => dispatch => {
  dispatch(requestUserCode())
  getUserCode(userCode => {
    dispatch(receiveUserCode(userCode))
  })
}

export const receiveUserCode = userCode => ({
  type: actionTypes.RECEIVE_USER_CODE,
  userCode
})

export const requestUserDetailByCode = userCode => ({
  type: actionTypes.REQUEST_USER_DETAIL_BY_CODE,
  userCode
})

export const fetchUserDetailByCode = userCode => dispatch => {
  dispatch(requestUserDetailByCode(userCode))
  getUserDetailByCode(userCode, userDetail => {
    dispatch(receiveUserDetailByCode(userDetail))
  })
}

export const receiveUserDetailByCode = userDetail => ({
  type: actionTypes.RECEIVE_USER_DETAIL_BY_CODE,
  userDetail
})

export const requestUserDetailById = userId => ({
  type: actionTypes.REQUEST_USER_DETAIL_BY_ID,
  userId
})

export const fetchUserDetailById = userId => dispatch => {
  dispatch(requestUserDetailById(userId))
  getUserDetailById(userId, userDetail => {
    dispatch(receiveUserDetailById(userDetail))
  })
}

export const receiveUserDetailById = userDetail => ({
  type: actionTypes.RECEIVE_USER_DETAIL_BY_ID,
  userDetail
})
