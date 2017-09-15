<template>
  <div class="container" id="sider">
    <div class="logo">logo</div>
    <div class="sideBox">
      <div class="sideItem" >
        <button class="itemBtn" :class="{selectd:item==0}">首页</button>
      </div>
      <div class="sideItem" >
        <button class="itemBtn" :class="{selectd:item==1}">设备管理</button>
      </div>
      <div class="sideItem" >
        <button class="itemBtn" :class="{selectd:item==2}">用户管理</button>
      </div>
      <div class="sideItem" >
        <button class="itemBtn" :class="{selectd:item==3}">系统管理</button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
export default {
  name: 'sider',
  props:["item"]
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
