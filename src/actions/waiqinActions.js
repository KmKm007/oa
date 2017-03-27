import * as waiqinActionTypes from '../actionTypes/waiqinActionTypes'

export const requestLocation = () => ({
  type: waiqinActionTypes.REQUEST_LOCATION
})

export const fetchLocation = () => dispatch => {
  requestLocation()

}

export const receiveLocation = location => ({
  type: waiqinActionTypes.RECEIVE_LOCATION,
  location
})

export const requestAddress = location => ({
  type: waiqinActionTypes.REQUEST_ADDRESS,
  location
})

export const fetchAddress = location => dispatch => {
  requestAddress(location)

}

export const receiveAddress = address => ({
  type: waiqinActionTypes.RECEIVE_ADDRESS,
  address
})
