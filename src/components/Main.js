import React from 'react';
import wx from 'weixin-js-sdk'
import { getQueryString } from '../utils/urlUtil'

class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idLoaded: false
    }
  }
  componentWillMount() {
    const url = 'http://10.17.1.157:8888/OA/jssdk/getSignature'
    fetch(url, {
      method: 'GET',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    })
    .then(resp => resp.json())
    .then(json => {
      this.onReceivce(json)
    })
  }

  componentDidMount() {
    this.postCodeToServer()
  }

  onReceivce = json => {
    wx.config({
      debug: false,
      appId: json.corpid,
      timestamp: json.timestamp,
      nonceStr: json.nonceStr,
      signature: json.signature,
      jsApiList: []
    })
    wx.ready(() => {
      this.setState({
        isLoaded: true
      })
      this.showLocation()
    });
  }

  showLocation() {
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: res => {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

          this.getAddress(longitude, latitude)
          wx.openLocation({
            latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude, // 经度，浮点数，范围为180 ~ -180。
            name: '公司', // 位置名
            address: '公司', // 地址详情说明
            scale: 28 // 地图缩放级别,整形值,范围从1~28。默认为16
          });
      }
    });
  }

  getAddress(longitude, latitude) {
    const url = 'http://10.17.1.157:8888/OA/amap/getAddress?' + 'longitude=' + longitude + '&latitude=' + latitude
    fetch(url, {
      method: 'GET',
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    .then(resp => resp.json())
    .then(json => {
      console.log(json.location)
    })
  }

  postCodeToServer() {
    const code = getQueryString('code')
    const url = 'http://10.17.1.157:8888/OA/jssdk/getUserId?code=' + code
    fetch(url, {
      method: 'GET',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    })
    .then(resp => {

    })
  }

  render() {
    return this.state.isLoaded ? <div>Hello world!</div> : <div>loading...</div>
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
