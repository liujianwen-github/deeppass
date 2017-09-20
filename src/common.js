import INTERFACE from '@/INTERFACE'
import config from '@/config/default'
const common={
  bibi(){
    console.log(this)
  },
	/**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器person图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_image: function (personId,customName){
    // alert(config.baseEnv.HOST + config.baseEnv.projectpath + INTERFACE.GET_PERSONHEADIMAGE+'?personId='+ personId)
    return config.baseEnv.HOST + config.baseEnv.projectpath + INTERFACE.GET_PERSONHEADIMAGE+'?personId='+ personId + '&customName=' +customName
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器facetrack图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_facetrackimage :function(facetrackId,customName){
    return config.baseEnv.HOST + config.baseEnv.projectpath + INTERFACE.GET_FACETRACKIMAGE + '?facetrackId=' + facetrackId + '&customName=' +customName
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器场景图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_sceneimg: function(facetrackId,customName){
     return config.baseEnv.HOST + config.baseEnv.projectpath + INTERFACE.GET_SCENEIMG + '?facetrackId=' + facetrackId + '&customName=' +customName
  },
  deepCopy: function (source) {
    let result = {}
    for (var key in source) {
      result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key]
    }
    return result
  },
}
export default common