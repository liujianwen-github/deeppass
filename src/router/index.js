import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Device from '@/components/device/DeviceManage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //默认路由重定向到login
      redirect: { name: 'Login' }
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/device',
      name: 'device',
      component: Device
    }
  ]
})
