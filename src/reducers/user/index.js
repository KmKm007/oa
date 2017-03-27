import actionTypes from '../../actionTypes'

const initalState = {
  userCode: null,
  userId: null,
  name: null
}

const receiveUserCode = (state, action) => {
  return {
    ...state,
    userCode: action.userCode
  }
}

const requestUserDetail = (state, action) => {
  return state
}

const receiveUserDetail = (state, action) => {
  return {
    ...state,
    name: action.userDetail.name
  }
}

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_USER_CODE:
      return receiveUserCode(state, action)
    case actionTypes.RECEIVE_USER_DETAIL:
      return receiveUserDetail(state, action)
    default:
      return state
  }
}

export default userReducer
