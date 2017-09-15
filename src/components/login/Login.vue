<template>
  <Row class="container">
    <Col span="24" class="logo"></Col>
    <Col span="24" class="content">
      <div class="loginBox">
        <div class="customName">
          <label for="login_user">用户名</label>
          <input id="login_user" type="text" v-model="userinfo.customName" name="">
        </div>
        <div class="password">
          <label for="login_psd">密码</label>
          <input id="login_psd" type="password" v-model="userinfo.password" name="">
        </div>
        <div class="loginBtn">
          <Button type="success" @click="login">登陆</Button>
        </div>
      </div>
    </Col>
  </Row>
</template>

<script>
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'welcome',
    }
  },
  computed:{
    userinfo(){
      let userinfo = this.$store.state.userInfo
      // let userinfo =JSON.stringify(userinfo)
      return userinfo
    }
  },
  methods:{
    login(){
      // 用户信息添加进cookie
      let userinfo = JSON.stringify(this.userinfo)
      this.$cookie.set('userinfo',userinfo)
      // 创建上传的表单数据
      let data = new FormData()
      data.append('customName',this.userinfo.customName)
      data.append('password',this.userinfo.password)
      // http请求
      this.$http({
        method: 'POST',
        url:INTERFACE.LOGIN,
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:data
      })
      .then((res)=>{
        // 请求成功
        console.log(res)
        //密码校验正确处理
        if(res.status===200){
          console.log(this.$router)
          this.$router.push('/home')
        }
      })
      .catch((err)=>{
        // 异常处理
        console.log(err)
      })
    }
  },
  created(){
    console.log(config)
    console.log(this.$store.state)
    // let userinfo = {
    //   customName:'liu',
    //   password:'123'
    // }
    // this.$cookie.set('userinfo',JSON.stringify(userinfo))
    // 加载获取cookie中的userinfo信息
    // let cookie = JSON.parse(this.$cookie.get('userinfo'))
    // if(cookie){
    //   this.$store.commit('INIT_USERINFO',cookie)
    // }
  }
}
</script>

<style scoped>
.container{
  margin-top:100px;
}
.logo{
  background-color: blue;
  height: 100px
}
.content{
  text-align: center;
}
/*中心输入框内容*/
.loginBox{
  display: inline-block;
}
.loginBox>div{
  margin-top: 20px
}
.loginBox label{
  display: inline-block;
  width: 60px
}
.loginBox input{
  outline: none;
  border: none;
  border-bottom: 2px solid grey
}
</style>
