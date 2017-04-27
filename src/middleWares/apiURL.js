const pictureServer = 'http://10.17.1.157:8888/OA/'

const apiServer = 'http://10.17.1.157:8888/OA/api'

const apiURL = {
  'getWxConfigURL': `${apiServer}/wx/getWxConfig`,
  'postCodeToServerURL': `${apiServer}/wx/getUserId`,
  'getAddressURL': `${apiServer}/amap/getAddress`,
  'getUserDetailByCodeURL': `${apiServer}/wx/getUserDetailByCode`,
  'getUserDetailByIdURL': `${apiServer}/wx/getUserDetailById`,
  'saveSignRecordURL': `${apiServer}/waiqin/sign`,
  'getChildListURL': 'http://10.17.1.157:8888/Authentication/employee/getChildList',
  'getWaiqinHistoryURL': `${apiServer}/waiqin/history`,
  'postWaiqinRemarkImageURL': `${apiServer}/waiqin/saveImage`
}

export default apiURL

export { apiServer, pictureServer }
