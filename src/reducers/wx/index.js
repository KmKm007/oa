import actionTypes from '../../actionTypes'

const initialState = {
  isInitialSucceed: null
}

const wxInitial = state => {
  return {
    ...state,
    isInitialSucceed: false
  }
}

const wxInitialSucceed = state => {
  return {
    ...state,
    isInitialSucceed: true
  }
}

const wxReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.WX_INITIAL:
      return wxInitial(state)
    case actionTypes.WX_INITIAL_SUCCEED:
      return wxInitialSucceed(state)
    default:
      return state
  }
}

export default wxReducer
