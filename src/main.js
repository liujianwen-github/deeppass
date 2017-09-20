// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import Axios from 'axios' //axios
import iview from 'iview' //iview
import 'iview/dist/styles/iview.css' //iview css
import Cookie from 'vue-cookie' //cookie
import store from './store' //vuex
import config from '@/config/default' //配置文件
import date from '@/date' //date操作
import VeeValidate from 'vee-validate' //表单校验
import '@/validate' //表单验证配置文件
import INTERFACE from '@/INTERFACE' //API
Vue.use(VeeValidate)
Vue.use(iview)

Vue.config.productionTip = false
Vue.prototype.$http=Axios
Vue.prototype.$cookie = Cookie

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  methods:{
    getDevice(customName){
      this.$http({
        method: "GET",
        url:INTERFACE.GET_DEVICE,
        params:{
          customName: customName
        }
      })
      .then((res)=>{
        if(res.data.status ===200){
          this.$store.commit('INIT_DEVICEINFO',res.data.results.batchVo.list)
          console.log('mainjs加载设备信息')
        }
      })
      .catch((error)=>{
        console.log('初始化请求设备信息失败')
        console.log(error)
      })
    }
  },
  created(){
  	//初始化axios配置项
  	config.axiosConf()
  	// 初始化用户信息
    if(this.$cookie.get('userinfo')){
      const userinfo = this.$cookie.get('userinfo')
      this.$store.commit('INIT_USERINFO',JSON.parse(userinfo))
      this.getDevice(this.$store.state.userInfo.customName)
    }
  }
})
