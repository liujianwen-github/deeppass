import INTERFACE from '@/INTERFACE'
import config from '@/config/default'
const common={
	/**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器person图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_image: function (personId){
    // alert(config.baseEnv.HOST + config.baseEnv.projectpath + INTERFACE.GET_PERSONHEADIMAGE+'?personId='+ personId)
    return config.baseEnv.HOST + config.baseEnv.projectpath + INTERFACE.GET_PERSONHEADIMAGE+'?personId='+ personId
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器facetrack图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_facetrackimage :function(facetrackId){
    return config.baseEnv.HOST + config.baseEnv.projectpath + INTERFACE.GET_FACETRACKIMAGE + '?facetrackId=' + facetrackId
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器场景图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_sceneimg: function(facetrackId){
     return config.baseEnv.HOST + config.baseEnv.projectpath + INTERFACE.GET_SCENEIMG + '?facetrackId=' + facetrackId
  },
}
export default common