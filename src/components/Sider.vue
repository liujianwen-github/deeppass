<template>
  <div class="container" id="sider">
    <div class="logo">logo</div>
    <div class="sideBox">
      <div class="sideItem" >
        <button class="itemBtn" @click="switchRouter(0)" :class="{selectd:item==0}">首页</button>
      </div>
      <div class="sideItem" >
        <button class="itemBtn" @click="switchRouter(1)" :class="{selectd:item==1}">设备管理</button>
      </div>
      <div class="sideItem" >
        <button class="itemBtn" @click="switchRouter(2)" :class="{selectd:item==2}">用户管理</button>
      </div>
      <div class="sideItem" >
        <button class="itemBtn" @click="switchRouter(3)" :class="{selectd:item==3}">系统管理</button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
export default {
  name: 'sider',
  props:["item"],
  methods:{
    switchRouter(item){
      const routerList= ['home','device','user','system']
      this.$router.push('/'+routerList[item])
    }
  }
}
</script>

<style scoped>
.container{
  background-color: red;
  height: 620px
}
.logo{
  width: 100%;
  height: 40px;
  background-color: yellow
}
.sideBox{
  height: 500px
}
.sideItem{
  height: 40px
}
.itemBtn{
  width: 100%;
  height: 30px;
  /*background-color: transparent;*/
}
.selectd{
  background-color: green
}
</style>
