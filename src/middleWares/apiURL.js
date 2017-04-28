const pictureServer = 'http://121.12.154.196:8888/OA/'

const apiServer = 'http://121.12.154.196:8888/OA/api'

const userApiServer = 'http://121.12.154.196:8888'

const apiURL = {
  'getWxConfigURL': `${apiServer}/wx/getWxConfig`,
  'postCodeToServerURL': `${apiServer}/wx/getUserId`,
  'getAddressURL': `${apiServer}/amap/getAddress`,
  'getUserDetailByCodeURL': `${apiServer}/wx/getUserDetailByCode`,
  'getUserDetailByIdURL': `${apiServer}/wx/getUserDetailById`,
  'saveSignRecordURL': `${apiServer}/waiqin/sign`,
  'getChildListURL': `${userApiServer}/Authentication/employee/getChildList`,
  'getWaiqinHistoryURL': `${apiServer}/waiqin/history`,
  'postWaiqinRemarkImageURL': `${apiServer}/waiqin/saveImage`
}

export default apiURL

export { apiServer, pictureServer }
