//数据接口
const INTERFACE = {
	LOGIN: '/custom/login',
	// POST
  POST_USER_IMAGE: '/user/createUserByImage',
  POST_USER_FACETRACK: '/user/createUserByFacetrack',
  // DELETE
  DELETE_USER: '/user/deleteUser',
  // PUT
  PUT_USER: '/user/updateUserInfo',
  PUT_STRANGER2PERSON: '/user/addFacetracks2Person',
  PUT_CONFIG: '/config/updateConfigs',
  // GET
  GET_FACRTRACKLIST: '/facetrack/getFacetrackList',
  GET_USER_LASTVISIT: '/facetrack/getLastUserVistInfo',
  GET_ALL_REGISTERUSER: '/user/getUserList',
  GET_STRANGER_ANALYSE: '/facetrack/getSimilarPerson',
  GET_PERSONHEADIMAGE: '/user/getPersonHeadImage',
  GET_FACETRACKIMAGE: '/facetrack/getFacetrackImage',
  GET_USERINFOS: '/user/getUserMatchedFacetrack',
  GET_SCENEIMG: '/facetrack/getFacetrackSceneImg',
  GET_FACETRACKIMAGES:'/facetrack/getFacetrackImages',
  GET_USER_UNMATCHED: '/user/getUserSimilarFacetrack',
  GET_CONFIG:'/config/getAllconfig',
}
export default INTERFACE