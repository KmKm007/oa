import wx from 'weixin-js-sdk'
import { getQueryString } from '../utils/urlUtil'

const dubug = (process.env.NODE_ENV !== 'production') ? true : false

export const inital = (config, callback) => {
  wx.config({
    debug: dubug,
    appId: config.corpid,
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature,
    // jsApiList: config.jsApiList,
    jsApiList: ['getLocation', 'openLocation']
  })
  wx.ready(() => {
    callback()
  })
}

export const getUserCode = callback => {
  const userCode = getQueryString('code')
  callback(userCode)
}

export const getLocation = callback => {
  wx.getLocation({
    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: res => callback(res)
  })
}

export const showLocation = locationConfig => {
  wx.openLocation({
    latitude: locationConfig.latitude, // 纬度，浮点数，范围为90 ~ -90
    longitude: locationConfig.longitude, // 经度，浮点数，范围为180 ~ -180。
    name: locationConfig.name, // 位置名
    address: locationConfig.address, // 地址详情说明
    scale: locationConfig.scale // 地图缩放级别,整形值,范围从1~28。默认为16
  })
}

export const chooseImage = callback => {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['camera'],
    success: resp => {
      callback(resp)
    }
  })
}

export const uploadImage = (imageLocalId, callback) => {
  wx.uploadImage({
    localId: imageLocalId,
    isShowProgressTips: 0,
    success: resp => {
      callback(resp.serverId)
    }
  })
}

export const previewImage = imageArray => {
  if (typeof(imageArray) === 'string') {
    imageArray = [imageArray]
  }
  wx.previewImage({
    current: imageArray[0],
    urls: imageArray
  })
}
