import 'whatwg-fetch'

console.log(fetch)

export const getWxConfig = callback => {
  const url = 'http://10.17.1.157:8888/OA/wx/getWxConfig'
  fetch(url, {
    method: 'GET',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
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
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  })
  .then(resp => {
    if (resp.ok && resp.status === 200) {
      resp.json()
    } else {
      console.log('请求失败！')
    }
  })
  .then(json => {
    callback(json)
  })
}

export const getAddress = (location, callback) => {
  const { longitude, latitude } = location
  const url = 'http://10.17.1.157:8888/OA/amap/getAddress?' + 'longitude=' + longitude + '&latitude=' + latitude
  fetch(url, {
    method: 'GET',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  .then(resp => resp.json())
  .then(json => {
    callback(json.location)
  })
}

export const getUserDetail = (code, callback) => {
  const url = 'http://10.17.1.157:8888/OA/wx/getUserDetail?code=' + code
  fetch(url, {
    method: 'GET',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  })
  .then(resp => {
    if (resp.ok && resp.status === 200) {
      resp.json()
    } else {
      console.log('请求失败！')
    }
  })
  .then(json => {
    callback(json)
  })
}
