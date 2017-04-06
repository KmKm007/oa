import actionTypes from '../../actionTypes'

const initialState = {
  userCode: null,
  detail: null,
  isUserCodeLoading: null,
  isUserDetailLoading: null,
  children: null
}

const receiveUserCode = (state, action) => {
  return {
    ...state,
    userCode: action.userCode,
    isUserCodeLoading: false
  }
}

const requestUserDetailByCode = state => {
  return {
    ...state,
    isUserDetailLoading: true
  }
}

const receiveUserDetailByCode = (state, action) => {
  return {
    ...state,
    detail: action.userDetail,
    isUserDetailLoading: false
  }
}

const requestUserDetailById = state => {
  return {
    ...state,
    isUserDetailLoading: true
  }
}

const receiveUserDetailById = (state, action) => {
  return {
    ...state,
    detail: action.userDetail,
    isUserDetailLoading: false
  }
}

const receiveUserChildren = (state, action) => {
  return {
    ...state,
    children: action.children
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_USER_CODE:
      return receiveUserCode(state, action)
    case actionTypes.REQUEST_USER_DETAIL_BY_CODE:
      return requestUserDetailByCode(state)
    case actionTypes.RECEIVE_USER_DETAIL_BY_CODE:
      return receiveUserDetailByCode(state, action)
    case actionTypes.REQUEST_USER_DETAIL_BY_ID:
      return requestUserDetailById(state, action)
    case actionTypes.RECEIVE_USER_DETAIL_BY_ID:
      return receiveUserDetailById(state, action)
    case actionTypes.RECEIVE_USER_CHILDREN:
      return receiveUserChildren(state, action)
    default:
      return state
  }
}

export default userReducer
