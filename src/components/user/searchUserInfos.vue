<template>
	<div id="searchUserInfos" :class="{notshow:isHidden}">
		<div>
    <p align="center">
      <span style="color:rgb(100,100,100);font-size: 12px">搜索的识别记录最多为当前时间以前的20条</span>
      <span @click="back" style="position:absolute;right:0;top:0;display:table-cell;width:70px;height:50px;margin-right:1em;vertical-align:middle;text-align:center;cursor: pointer">
        <img src="../../assets/arrow_back_533px_1143264_easyicon.net.png" style="vertical-align:middle" width="30" height="30" alt="">返回
      </span>
    </p>
    <p class="emptyMsg" :class="{show:emptyRes}">
      查询结果为空
    </p>
        <ul>
            <li v-for="item in userinfoList">
              <div>
                    <div class="right" @click.stop="viewGif(item.facetrackId)">
                      <div>
                        <img :src="get_facetrackimage(item.facetrackId)" alt="">
                        <span class="gif">GIF</span>
                      </div>
                    </div>
                    <div class="left">
                      <p v-text="item.facetrackCreateTime.split(' ')[0]">date</p>
                      <p v-text="item.facetrackCreateTime.split(' ')[1]">time</p>
                      <p v-text="item.sourceDes">address</p>
                      <button class="btn btn-info" @click.stop="viewScene(item.facetrackId)">场景图</button>
                    </div> 
                  </div>
            </li>
        </ul>
        <div class="sceneBox" :class="{show:scene.isShow}" @click.stop="closeScene">
         <!-- <div> -->
            <img :src="scene.img" alt="">
         <!-- </div> -->
        </div>
        <div class="gifBox" :class="{show:gif.isShow}" @click.stop="stopGif">
          <!-- <div> -->
            <img :src="gif.imgHead + gif.imgURL"  alt="" >
          <!-- </div> -->
        </div>  
    </div>
  </div>
</template>
<script type="text/javascript">
import INTERFACE from '@/INTERFACE'
import config from '@/config/default'
import common from '@/common'
export default{
  name:'searchUserInfos',
  data(){
    return {
      userinfoList: [],
      emptyRes: false,
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
  	}
  },
  props:["isHidden", "personId"],
  methods: {
  	get_facetrackimage: function(facetrackId){
      return common.get_facetrackimage(facetrackId,this.$store.state.userInfo.customName)
    },
  	searchUserInfos: function(personId){
  	  this.emptyRes = false
  	  const _this = this
      this.$http(INTERFACE.GET_USERINFOS,{params:{personId:_this.personId,customName:_this.$store.state.userInfo.customName}})
      .then((res)=>{
        console.log(res)
        if(res.data.status===200){
          this.userinfoList = res.data.results.batchVo.list
          if(this.userinfoList.length ===0){
          	//返回数据长度为0，提示用户查询结果为空
          	this.emptyRes = true
          }
          console.log(this.userinfoList)
        }else{
          this.$message.info(res.data.reference)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    back: function(){
    	this.$emit('back')
    },
    viewGif: function (facetrackId,e,f,i) {
    	console.log(e,f,i)
      // alert(msg)
      this.$http({
        method: 'get',
        url: INTERFACE.GET_FACETRACKIMAGES,
        params: {
          facetrackId: facetrackId,
          customName:this.$store.state.userInfo.customName
        }
      }).then((res) => {
        console.log(res.data.results.facetrackImagePos)
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
        img: common.get_sceneimg(facetrackId,this.$store.state.userInfo.customName)
      }
    },
    closeScene: function () {
      this.scene = {
        isShow: false,
        img: ' '
      }
    },
  },
  watch:{
  	isHidden: function(val,old){
  		console.log(val)
  		if(!val){
  			this.searchUserInfos()
  		}
  	},
    personId:function (val,old) {
      console.log(val)
    }
  }
}
</script>
<style scoped>
/*userinfo样式*/
#searchUserInfos{
  width: 100%;
  max-width:500px;
  min-width: 300px;
  height: 300px;
  position: fixed;
  left: 50%;
  bottom: 50%;
  z-index: 100;
}
#searchUserInfos>div{
  border: 1px solid black;
  background-color: white;
  width: 100%;
  height: 100%;
  position: relative;
  left: -50%;
  bottom: -50%;
}
#searchUserInfos .emptyMsg{
	text-align: center;
	display: none
}
#searchUserInfos ul{
  /*width: 10000px;*/
  height: 240px;
  list-style:none; 
  overflow: auto; 
  margin:0; 
  padding:0; 
  zoom:1; 
  white-space: nowrap;
}
#searchUserInfos li{  
  list-style-type: none; 
  text-align:center; 
  display: inline-block; 
  height: 130px;
  width: 160px;
}

#searchUserInfos li>div{
  /*display: flex;*/
  height: 100%
}
#searchUserInfos li>div>div{
  /*display: inline-block;*/
  /*padding-left: 30px;*/
  /*text-align: center;*/
  width: 100%
}
#searchUserInfos li>div>.right{
  display: flex;
  justify-content: center;
}
#searchUserInfos li>div>.left p{
  margin:0 
}
#searchUserInfos li>div>.right>div{
  width: 120px;
  height: 120px;
  position: relative;
  /*text-align: center;*/
}
#searchUserInfos li>div>.right img{
  width: 100%;
}
#searchUserInfos li>div>.right>div .gif{
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
.show{
  display: block
}
.notshow{
  display: none
}
</style>