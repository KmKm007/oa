import actionTypes from '../actionTypes'
import { getAddress } from '../middleWares/api'

export const requestLocation = () => ({
  type: actionTypes.REQUEST_LOCATION
})

export const fetchLocation = () => dispatch => {
  requestLocation()

}

export const receiveLocation = location => ({
  type: actionTypes.RECEIVE_LOCATION,
  location
})

export const requestAddress = location => ({
  type: actionTypes.REQUEST_ADDRESS,
  location
})

export const fetchAddress = location => dispatch => {
  requestAddress(location)
  getAddress(location, address => {
    dispatch(receiveAddress(address))
  })
}

export const receiveAddress = address => ({
  type: actionTypes.RECEIVE_ADDRESS,
  address
})

export const updateCurrentTime = currentTime => ({
  type: actionTypes.UPDATE_CURRENTTIME,
  currentTime
})
