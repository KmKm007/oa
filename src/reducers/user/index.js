import actionTypes from '../../actionTypes'

const initialState = {
  userCode: null,
  userId: null,
  name: null,
  isUserCodeLoading: null,
  isUserDetailLoading: null
}

const receiveUserCode = (state, action) => {
  return {
    ...state,
    userCode: action.userCode,
    isUserCodeLoading: false
  }
}

const requestUserDetail = state => {
  return {
    ...state,
    isUserDetailLoading: true
  }
}

const receiveUserDetail = (state, action) => {
  return {
    ...state,
    name: action.userDetail.name,
    isUserDetailLoading: false
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_USER_CODE:
      return receiveUserCode(state, action)
    case actionTypes.REQUEST_USER_DETAIL:
      return requestUserDetail(state)
    case actionTypes.RECEIVE_USER_DETAIL:
      return receiveUserDetail(state, action)
    default:
      return state
  }
}

export default userReducer
