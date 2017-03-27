import actionTypes from '../../actionTypes'

const inititalState = {
  location: null,
  address: null
}

const receiveLocation = (state, action) => {
  return {
    ...state,
    location: action.location
  }
}

const receiveAddress = (state, action) => {
  return {
    ...state,
    address: action.address
  }
}

const waiqinReducers = (state = inititalState, action) => {
  switch(action.type) {
    case actionTypes.RECEIVE_LOCATION:
      return receiveLocation(state, action)
    case actionTypes.RECEIVE_ADDRESS:
      return receiveAddress(state, action)
    default:
      return state
  }
}

export default waiqinReducers
