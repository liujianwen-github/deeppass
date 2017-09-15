<template>
  <div class="popup" id="intell" :class="{notshow:intellNotShow}">
   <div v-if="viewWhich=='intell'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img v-bind:src="get_facetrackimage(toIntell.facetrackId)" alt="">
      </div>
      <div class="addUser whiteText">
        <p class="headInfo">来访时间: <span v-text="toIntell.facetrackCreateTime"></span></p>
        <!-- <p class="headInfo">采集地点: <span v-text="toIntell.sourceDes"></span></p> -->
        <div class="btn" @click="createUser">新建用户</div>
        <div class="btn" @click="intellAnalyse">智能分析</div>
      </div>
    </header>
    <article>
      <div class="content">
        <img v-bind:src="sourceImg" alt="">
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 陌生人操作组件 -->
<script>
// import $ from 'jquery'
import config from '@/config/default'
import common from '@/common'
export default {
  name: 'intell',
  data () {
    return {
      intellNotShow: true
    }
  },
  props: ['toIntell', 'viewWhich'],
  computed:{
    sourceImg:function(){
      return common.get_sceneimg(this.toIntell.facetrackId)
    }
  },
  methods: {
    get_image: function(personId){
      return common.get_image(personId)
    },
    get_facetrackimage: function(facetrackId){
      return common.get_facetrackimage(facetrackId)
    },
    close: function () {
      // $('#intell').css('display', 'none')
      this.$emit('popState', '0')
      console.log(this.toIntell)
    },
    createUser: function () {
      this.$emit('popState', 'createUser')
    },
    intellAnalyse: function () {
      this.$emit('popState', 'intellAnalyse')
    }
  },
  watch: {
    viewWhich: function (val, old) {
      console.log(val)
      if (val === 'intell') {
        this.intellNotShow = false
        console.log(this.intellNotShow)
        console.log(this.toIntell)
      } else {
        this.intellNotShow = true
      }
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
/*#intell{
  display: none;
}*/
.notshow{
  display: none;
}
.popup header>div{
  display: inline-block;
  vertical-align: top
}
.popup header:after{
  content:'';
  clear: both
}
.popup header .setHead{
  width: 160px;
  height: 160px;
  background-color: white
}
.popup header .setHead img{
  /*width: 100%;  */
  height: 100%
}
.popup header .addUser{
  padding-left:10px;
  height: 160px
}
.popup header .btn{
  border:1px solid white;
  /*color: white;*/
  font-weight: 800;
  margin-top: 20px
}
.popup article{
  clear: both;
  width: 100%;
  height: 300px;
  overflow-y: auto
  /*background-color: lightblue*/
}
.popup article .content{
  text-align: center;
  padding-top: 10px
}
@media only screen and (max-width: 768px){
    
  }
</style>
