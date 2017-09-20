<template>
  <div class="popup" id="userInfos" :class="{show:isShow}">
   <div v-if="viewWhich=='userInfos'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="get_image(personData.personId)" alt="">
        <!-- {{personData}} -->
      </div>
      <div class="addUser whiteText">
        <p class="headInfo">姓名：<span v-text="personData.userName"></span></p>
        <p class="headInfo">最后到访时间：<br/><span v-text="personData.recordUpdatedTime"></span></p>
        <!-- <p class="headInfo">采集地点: <span v-text="personData.sourceDes">sourceId</span></p> -->
        <div class="btn" style="position:absolute;bottom: 0" @click="setMessage">设置留言</div>
      </div>
      <div @click="searchHistory" class="searchHistory">
          <p align="center">
            <img src="../../assets/search_800px.png" width="40" height="40"  alt="">
          </p>
          <p class="whiteText" align="center">查找未成功识别记录</p>
        </div>
    </header>
    <article>
      <div class="content"> 
        <div class="message">
           <p>识别记录</p>
           <span class="prompt">搜索的识别记录最多为当前时间以前的20条</span>
        </div>
        <div :class="{noScroll:scene.isShow}" class="discern"> 
          <div class="itemList">
            <div>
              <ul>
              <!-- TODO v-for -->
                <li v-for="item in list">
                  <div>
                    <div class="right" @click="viewGif(item.facetrackId)">
                      <div>
                        <img :src="get_facetrackimage(item.facetrackId)" alt="">
                        <span class="gif">GIF</span>
                      </div>
                    </div>
                    <div class="left">
                      <p v-text="item.facetrackCreateTime.split(' ')[0]">date</p>
                      <p v-text="item.facetrackCreateTime.split(' ')[1]">time</p>
                      <p v-text="item.sourceDes">address</p>
                      <button class="btn btn-info" @click="viewScene(item.facetrackId)">场景图</button>
                    </div> 
                  </div>
                </li>
              </ul>
            </div> 
          </div>
          <div class="sceneBox" :class="{show:scene.isShow}" @click="closeScene">
           <!-- <div> -->
              <img :src="scene.img" alt="">
           <!-- </div> -->
          </div>
          <div class="gifBox" :class="{show:gif.isShow}" @click="stopGif">
            <!-- <div> -->
              <img :src="gif.imgHead + gif.imgURL"  alt="" >
            <!-- </div> -->
          </div>
        </div>   
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 查看用户信息组件 -->
<script>
// import $ from 'jquery'
import Axios from 'axios'
import config from '@/config/default'
import common from '@/common'
// import listSide from '@/assets/listSide.png'
import INTERFACE from '@/INTERFACE'

export default {
  name: 'userInfos',
  props: ['toUserInfos', 'viewWhich'],
  data () {
    return {
      // liBgc: 'background: url(' + listSide + ') no-repeat',
      isShow: false,
      personData: null,
      scene: {
        isShow: false,
        img: ''
      },
      gifChange: null,
      gif: {
        imgHead: 'data:image/png;base64,',
        imgURL: null,
        gifList: [],
        isShow: false,
        curr: 0
      },
      list: null,
      getParams: {
        personId: null,
      }
    }
  },
  methods: {
    get_image: function(personId){
      return common.get_image(personId,this.$store.state.userInfo.customName)
    },
    get_facetrackimage: function(facetrackId){
      return common.get_facetrackimage(facetrackId,this.$store.state.userInfo.customName)
    },
    close: function () {
      this.$emit('popState', '0')
      this.isShow = false
      this.stopGif()
      this.closeScene()
    },
    viewGif: function (facetrackId) {
      // alert(msg)
      Axios({
        method: 'get',
        url: INTERFACE.GET_FACETRACKIMAGES,
        params: {
          facetrackId: facetrackId,
          customName:_this.$store.state.userInfo.customName
        }
      }).then((res) => {
        // console.log(res.data.results.facetrackImagePos)
        const data = res.data.results.facetrackImagePos
        this.gif = {
          imgHead: 'data:image/png;base64,',
          imgURL: data[0].imageContent,
          gifList: data,
          isShow: true,
          curr: 0
        }
        this.gifAnimation()
      }, (err) => {
        console.log(err)
      })
      // TODO 动图 场景图
      // console.log(this.personData.personId)
    },
    gifAnimation: function () {
      // var i = 0
      const _this = this
      if (_this.gif.gifList.legnth <= 1) {
        return
      }
      _this.gifChange = setInterval(function () {
        // console.log(_this)
        let i = _this.gif.curr
        _this.gif.imgURL = _this.gif.gifList[i].imageContent
        // 播放到最后一张时下标退回到0
        _this.gif.curr = _this.gif.curr === _this.gif.gifList.length - 1 ? 0 : _this.gif.curr + 1
      }, 200)
    },
    stopGif: function () {
      // 清除动图
      clearInterval(this.gifChange)
      this.gif = {
        imgHead: null,
        imgURL: null,
        gifList: [],
        isShow: false,
        curr: 0
      }
    },
    viewScene: function (facetrackId) {
      this.scene = {
        isShow: true,
        img: common.get_sceneimg(facetrackId)
      }
    },
    closeScene: function () {
      this.scene = {
        isShow: false,
        img: ' '
      }
    },
    searchHistory: function () {
      this.$emit('popState', 'history')
      this.stopGif()
      this.closeScene()
    },
    setMessage: function () {
      this.$emit('popState', 'leaveMessage')
      this.stopGif()
      this.closeScene()
    }
  },
  watch: {
    toUserInfos: function (val, old) {
      // alert(val)
      // console.log(val)
      this.personData = val
      console.log(this.personData)
      this.getParams = {
        personId: this.personData.personId,
        customName: this.$store.state.userInfo.customName
      }
      Axios.get(INTERFACE.GET_USERINFOS, {params: this.getParams}).then(
        (res) => {
          this.list = res.data.results.batchVo.list
          // console.log(this.list)
          // TODO 根据personId获取场景图 动图
        }, (err) => {
        console.log(err)
      })
    },
    viewWhich: function (val, old) {
      // console.log('createUser->viewWhich:' + val)
      if (val === 'userInfos') {
        this.isShow = true
        // console.log(this.$el)
      } else{
        this.isShow = false
      }
      // alert(val)
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
/*.show{
  display: block!important;
}*/
.noScroll{
  overflow-y: hidden!important;
}
.popup{
  display: none;
}
.popup>div{
  background-color: white!important;
}
.popup header{
  width: 100%;
  height: 200px;
  padding: 20px;
  overflow: auto
}
.popup header>div:not(.closeWindow){
  float:left;
  height: 160px;
}
.popup header .setHead{
  width: 160px;
  height: 160px;
  background-color: white;
  overflow: hidden;
}
.popup header .setHead img{
  width: 100%;  
}
.popup header .addUser{
  position: relative;
  padding-left:10px;
  width: 30%
}
.popup header .btn{
  /*border:1px solid white;*/
  /*color: white;*/
  background-color: #6AA0E2;
  color: white;
  font-weight: 800;
  margin-top: 20px
}
header .searchHistory{
  /*width: 35%;*/
  cursor: pointer;
  text-align: center;
  padding-top: 60px;  
}

.popup article{
  color: rgb(10,10,10);
  clear: both;
  width: 100%;
  height: 300px;
}
.popup article .content{
  /*display: flex;*/
  position: relative;
  height: 300px;
  /*overflow: hidden;*/
}
.popup article .content>div:first-child{
  cursor: pointer;
  width: 100%;
  text-align: center;
  /*border-right: 1px solid red*/
}
.popup article .content>.discern{
  /*overflow-x:auto ;*/
  /*overflow-y: hidden;*/
  width: 100%;
  height: 260px
}
.popup article .content>.discern>.itemList{
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  height: 250px
}
.popup article .content>.discern>.itemList>div{
  display: inline-block;
}
.popup article .content>.discern>.itemList ul{
  /*width: 10000px;*/
    height: 240px;
    list-style:none; 
    overflow: auto; 
    margin:0; 
    padding:0; 
    zoom:1; 
    white-space: nowrap;
}
.popup article .content>.discern>.itemList li{   
    text-align:center; 
    display: inline-block; 
    height:100%; 
    width: 160px;
}

article .content>p{
  /*color: red*/
  display: inline-block;
  height: 20px
}
article .content>span{
  display: inline-block;
  height: 20px
}
article .discern{
  /*margin-top: 40px;*/
  position: relative;
  border: 1px solid grey;
  border-radius: 5px;
  /*background-color: red;*/
  width: 50%;
  height: 220px
  /*border-bottom: 1px solid grey;
  border-bottom-left-radius: 5px*/
}
article span.prompt{
  color: rgb(100,100,100);
  font-size: 12px
}
article .content .message{
  height: 40px;
  /*display:inline-block;*/
}
article .content .message p{
  margin: 0
}
/*识别记录*/
article .content .itemList ul{
  padding: 5px 0 0 0;
}
article .content .itemList li{
  list-style-type: none;
  display: block;
  height: 130px;
}
article .content .itemList li>div{
  /*display: flex;*/
  height: 100%
}
article .content .itemList li>div>div{
  /*display: inline-block;*/
  /*padding-left: 30px;*/
  /*text-align: center;*/
  width: 100%
}
article .content .itemList li>div>.right{
  display: flex;
  justify-content: center;
}
article .content .itemList li>div>.left p{
  margin:0 
}
article .content .itemList li>div>.right>div{
  width: 120px;
  height: 120px;
  position: relative;
  /*text-align: center;*/
}
article .content .itemList li>div>.right img{
  width: 100%;
}
article .content .itemList li>div>.right>div .gif{
  background-color: rgba(0,0,0,0.6);
  color: white;
  padding:0.3em 0.5em;
  position: absolute;
  bottom: 0;
  right: 0
}

.sceneBox,.gifBox{
  width: 100%;
  height: 100%;
  position: absolute!important;
  /*display: table-cell;*/
  vertical-align: bottom;
  right: 0;
  top: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 10;
  display: none;
  text-align: center

}
/*.sceneBox>div{
  display: table-cell;
  vertical-align: middle
}*/
.sceneBox img{
  /*width: 100%;*/
  height: 100%;
  position: relative;
  /*left: -50%;*/
  /*top:-50%;*/
  max-height: 100%;
  max-width: 100%;
}
.gifBox  img{
  /*width: 100%;*/
  height: 100%;
  max-width: 100%;
  max-height: 100%
}


</style>
