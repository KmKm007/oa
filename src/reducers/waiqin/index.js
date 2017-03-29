import actionTypes from '../../actionTypes'

const inititalState = {
  location: null,
  address: null,
  currentTime: null
}

const receiveLocation = (state, action) => {
  return {
    ...state,
    location: action.location
  }
}

const receiveAddress = (state, action) => {
  const address = action.location.address
  return {
    ...state,
    address
  }
}

const updateCurrentTime = (state, action) => {
  return {
    ...state,
    currentTime: action.currentTime
  }
}

const waiqinReducers = (state = inititalState, action) => {
  switch(action.type) {
    case actionTypes.RECEIVE_LOCATION:
      return receiveLocation(state, action)
    case actionTypes.RECEIVE_ADDRESS:
      return receiveAddress(state, action)
    case actionTypes.UPDATE_CURRENTTIME:
      return updateCurrentTime(state, action)
    default:
      return state
  }
}

export default waiqinReducers
