import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //默认路由重定向到login
      redirect: { name: 'Login' }
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/Home',
      name: 'Home',
      component: Home
    }
  ]
})
