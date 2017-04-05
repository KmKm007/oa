import 'whatwg-fetch'

export const getWxConfig = callback => {
  const url = 'http://10.17.1.157:8888/OA/wx/getWxConfig'
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  .then(resp => resp.json())
  .then(json => {
    callback(json)
  })
}

export const postCodeToServer = (code, callback) => {
  const url = 'http://10.17.1.157:8888/OA/wx/getUserId?code=' + code
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  .then(resp => resp.json())
  .then(json => {
    callback(json)
  })
}

export const getAddress = (location, callback) => {
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
    callback(json.location)
  })
}

export const getUserDetailByCode = (code, callback) => {
  const url = 'http://10.17.1.157:8888/OA/wx/getUserDetailByCode?code=' + code
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  .then(resp => resp.json())
  .then(json => {
    callback(json.user)
  })
}

export const getUserDetailById = (userId, callback) => {
  const url = 'http://10.17.1.157:8888/OA/wx/getUserDetailById?userId=' + userId
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  .then(resp => resp.json())
  .then(json => {
    callback(json.user)
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
