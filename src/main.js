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
  created(){
  	//初始化axios配置项
  	config.axiosConf()
  	// 初始化用户信息
    if(this.$cookie.get('userinfo')){
      const userinfo = this.$cookie.get('userinfo')
      this.$store.commit('INIT_USERINFO',JSON.parse(userinfo))
    }
  }
})
