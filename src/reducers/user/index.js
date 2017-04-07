import actionTypes from '../../actionTypes'

const initialState = {
  userCode: null,
  detail: null,
  isUserCodeLoading: null,
  isUserDetailLoading: null,
  children: null,
  errorMesgArray: []
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

const updateErrorArrayIfSucceed = (initErrorMesgArray,errorType) => {
  const errorMesgArray = initErrorMesgArray.filter(mesg => mesg.errorType !== errorType)
  return errorMesgArray
}

const receiveUserChildren = (state, action) => {
  const errorMesgArray = updateErrorArrayIfSucceed(state.errorMesgArray,
                          actionTypes.RECEVE_USER_CHILDREN_FAILED)
  return {
    ...state,
    errorMesgArray,
    children: action.children
  }
}

const receiveUserDataFailed = (state, action) => {
  const { errorMesg, errorType }  = action
  const errorMesgArray = state.errorMesgArray.filter(mesg => mesg.errorType !== errorType)
  errorMesgArray.push({
    errorType,
    errorMesg
  })
  return {
    ...state,
    errorMesgArray
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
    case actionTypes.RECEIVE_USER_CHILDREN_FAILED:
      return receiveUserDataFailed(state, action)
    default:
      return state
  }
}

export default userReducer
