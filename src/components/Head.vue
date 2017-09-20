<template>
  <Row class="container" id='head'>
    <Col span="24" class="content">
      <Col span="4" class="logo">logo</Col>
      <Col span="14">
        <p>
          <span v-text="userinfo.customName"></span>
          <span>您好，欢迎进入</span>
          <!-- <span>{{}}</span> -->
          <span>deeppass后台管理系统</span>
        </p>
      </Col>
      <Col span="3">
        <span v-text="userinfo.customName"></span>
      </Col>
      <Col span="3">
        <button>播放视频</button>
      </Col>
    </Col>
  </Row>
</template>

<script>
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
export default {
  name: 'Head',
  computed:{
    userinfo(){
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 40px;
  // background-color: blue;
  border-bottom:1px solid black;
  // color: white;
  .content{
    .logo{
      height: 40px;
      border:1px solid black;
      // background-color: yellow;
      // color:red;
    }
  }
}
</style>
