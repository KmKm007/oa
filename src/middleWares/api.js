import apiURL from './apiURL'

window.fetch || require('whatwg-fetch')

const commonErrorMesg = '网络超时！请求失败 >_< '

export const getWxConfig = (callback, failCallback) => {
  const url = apiURL.getWxConfigURL
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  .then(resp => resp.json())
  .then(json => {
    if (json.status === 0) {
      callback(json)
    } else {
      failCallback(json.message)
    }
  })
  .catch(e => {
    if (typeof(failCallback) === 'function')
      failCallback(`${e}\r\n${commonErrorMesg}`)
  })
}

export const postCodeToServer = (code, callback, failCallback) => {
  const url = `${apiURL.postCodeToServerURL}?code=${code}`
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  .then(resp => resp.json())
  .then(json => {
    if (json.status === 0) {
      callback(json)
    } else {
      failCallback(json.message)
    }
  })
}

export const getAddress = (location, callback, failCallback) => {
  const { longitude, latitude } = location
  const url = `${apiURL.getAddressURL}?longitude=${longitude}&latitude=${latitude}`
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .catch(e => {
    failCallback(`${e}\r\n${commonErrorMesg}`)

  })
  .then(resp => resp.json())
  .then(json => {
    if (json.status === 0) {
      callback(json.location)
    } else {
      failCallback(json.message)
    }
  })
}

export const getUserDetailByCode = (code, callback, failCallback) => {
  const url = `${apiURL.getUserDetailByCodeURL}?code=${code}`
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  .then(resp => resp.json())
  .then(json => {
    if (json.status === 0) {
      callback(json.user)
    } else {
      failCallback(json.message)
    }
  })
}

export const getUserDetailById = (userId, callback, failCallback) => {
  const url = apiURL.getUserDetailByIdURL
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: `userId=${userId}`
  })
  .then(resp => {
    if (resp.ok) {
      return resp.json()
    }
  })
  .then(json => {
    if (json.status === 0) {
      callback(json.user)
    } else {
      failCallback(json.message)
    }
  })
  .catch(e => {
    if (typeof(failCallback) === 'function')
      return failCallback(`${e}\r\n${commonErrorMesg}`)
  })
}

export const saveSignRecord = (params, callback) => {
  let {
    location,
    address,
    userId,
    remarkText,
    remarkImageId
  } = params
  remarkText = remarkText || ''
  remarkImageId = remarkImageId || remarkImageId
  const url = apiURL.saveSignRecordURL
  const body = `longitude=${location.longitude}&latitude=${location.latitude}&address=${address}&userId=${userId}&remarkText=${remarkText}&remarkImageId=${remarkImageId}`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: body
  })
  .then(resp => resp.json())
  .then(json => {
    callback(json)
  })
}

export function getChildList(userId, callback, failCallback) {
  const url = apiURL.getChildListURL
  const body = `code=${userId}`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  })
  .then(resp => resp.json())
  .then(json => {
    if (json.status === 0) {
      callback(json.dataList)
    } else {
      failCallback(json.message)
    }
  })
}

export function getWaiqinHistory(params, callback, failCallback) {
  const url = apiURL.getWaiqinHistoryURL
  const { userId, beginTime, endTime } = params
  let body = `userId=${userId}`
  if (beginTime && endTime) {
    body = `${body}&beginTime=${beginTime}&endTime=${endTime}`
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  })
  .then(resp => resp.json())
  .then(json => {
    if (json.status === 0) {
      callback(json.dataList)
    } else {
      failCallback(json.message)
    }
  })
}

export const postWaiqinRemarkImage = (params, callback, failCallback) => {
  const url = apiURL.postWaiqinRemarkImageURL
  const { mediaId, userId } = params
  const body = `mediaId=${mediaId}&userId=${userId}`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  })
  .then(resp => resp.json())
  .then(json => {
    if (json.status === 0) {
      callback(json.imageId, json.imageURI)
    } else {
      failCallback(json.message)
    }
  })
}
