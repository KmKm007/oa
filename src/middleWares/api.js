import 'whatwg-fetch'

export const getWxConfig = (callback, failCallback) => {
  const url = 'http://10.17.1.157:8888/OA/wx/getWxConfig'
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

export const postCodeToServer = (code, callback, failCallback) => {
  const url = 'http://10.17.1.157:8888/OA/wx/getUserId?code=' + code
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
  const url = 'http://10.17.1.157:8888/OA/amap/getAddress?' + 'longitude=' + longitude + '&latitude=' + latitude
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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
  const url = 'http://10.17.1.157:8888/OA/wx/getUserDetailByCode?code=' + code
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
  const url = 'http://10.17.1.157:8888/OA/wx/getUserDetailById?userId=' + userId
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

export const saveSignRecord = (params, callback) => {
  const {
    location,
    address,
    userId,
    remarkText,
    remarkURL
  } = params
  const url = 'http://10.17.1.157:8888/OA//api/waiqin/sign'
  const body = `longitude=${location.longitude}&latitude=${location.latitude}&address=${address}&userId=${userId}&remarkText=${remarkText}&remarkURL=${remarkURL}`
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
  const url = 'http://10.17.1.157:8888/Authentication/employee/getChildList'
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
  const url = 'http://10.17.1.157:8888/OA/api/waiqin/history'
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
