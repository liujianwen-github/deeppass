//数据接口
const INTERFACE = {
	LOGIN: '/custom/login',
	// ******************************************POST******************************************
  //图片创建 
  POST_USER_IMAGE: '/user/createUserByImage',
  // facetrack创建
  POST_USER_FACETRACK: '/user/createUserByFacetrack',
  // 添加设备
  POST_DEVICE: '/device/addDevice',
  // POST_USER2DEVICE: '/userManage/addUser2Devices',
  POST_USER2DEVICES: '/userManage/addUser2Devices',
  // ******************************************DELETE******************************************
  // 删除用户
  DELETE_USER: '/user/deleteUser',
  //******************************************* PUT*****************************************
  // 更新用户信息
  PUT_USER: '/user/updateUserInfo',
  // 合并陌生人到person
  PUT_STRANGER2PERSON: '/user/addFacetracks2Person',
  // 更新配置文件
  PUT_CONFIG: '/config/updateConfigs',
  // 更新设备信息
  PUT_DEVICE: '/device/updateDevice',
  // ********************************************GET****************************************
  // 获取facetrack列表
  GET_FACRTRACKLIST: '/facetrack/getFacetrackList',
  GET_USER_LASTVISIT: '/facetrack/getLastUserVistInfo',
  GET_ALL_USER: '/user/getUserList',
  GET_STRANGER_ANALYSE: '/facetrack/getSimilarPerson',
  GET_PERSONHEADIMAGE: '/user/getPersonHeadImage',
  GET_FACETRACKIMAGE: '/facetrack/getFacetrackImage',
  GET_USERINFOS: '/user/getUserMatchedFacetrack',
  GET_SCENEIMG: '/facetrack/getFacetrackSceneImg',
  GET_FACETRACKIMAGES:'/facetrack/getFacetrackImages',
  GET_USER_UNMATCHED: '/user/getUserSimilarFacetrack',
  GET_CONFIG:'/config/getAllconfig',
  GET_DEVICE: '/device/getDevice',
  GET_LABEL: '/label/getLabel'
}
export default INTERFACE