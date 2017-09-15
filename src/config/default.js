import configDev from './config.dev.js'
import configPro from './config.pro.js'
// import configPro from 
import axios from 'axios'
const config = {
	appname: configDev.appname,
	baseEnv: configDev,
	axiosConf(){
		axios.defaults.baseURL = this.baseEnv.HOST
	    axios.defaults.timeout = 5000
	    // axios.defaults.responseType = 'json'
	    // axios.defaults.xsrfCookieName = '111'
	    // axios.defaults.xsrfHeaderName = 'demo'
	    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
	}
}
export default config