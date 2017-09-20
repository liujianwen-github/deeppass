import configDev from './config.dev.js'
import configPro from './config.pro.js'
// import configPro from 
import axios from 'axios'
const config = {
	appname: configDev.appname,
	baseEnv: configDev,
	minImageCount: 1,
  maxImageCount: 1,
	cropImg: {
	    img: '',
	    info: true,
	    size: 1,
	    outputType: 'jpeg',
	    canScale: false,
	    autoCrop: true,
	    // 只有自动截图开启 宽度高度才生效
	    autoCropWidth: 300,
	    autoCropHeight: 300,
	    // 开启宽度和高度比例
	    fixed: true,
	    fixedNumber: [1,1]
	  },
	axiosConf(){
		axios.defaults.baseURL = this.baseEnv.HOST
	    axios.defaults.timeout = 5000
	    // axios.defaults.responseType = 'json'
	    // axios.defaults.xsrfCookieName = '111'
	    // axios.defaults.xsrfHeaderName = 'demo'
	    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
	},
	dayBefore: {
    // 筛选规则，不能选择今天之后的时间
    disabledDate(date) {
          return date > Date.now()
        }
  },
}
export default config