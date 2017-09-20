<template>
  <div class="popup" id="intellAnalyse" :class="{notshow:intellNotShow}">
   <div v-if="viewWhich=='intellAnalyse'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="get_facetrackimage(personData.facetrackId)" alt="">
      </div>
      <div class="addUser whiteText">
        <p class="headInfo">来访时间:<span v-text="personData.facetrackCreateTime"></span></p>
        <!-- <p class="headInfo">采集地点:<span v-text="personData.sourceDes"></span></p> -->
        <p>以下是智能分析找到最接近的注册用户</p>
      </div>
    </header>
    <article>
      <div class="content">
        <div class="item" v-for="(item,index) in dataList" @click="chooseMe(index,item.personId)">
          <!-- <input type="radio" name="chooseItem" :value="item.persontag" v-model="chooseItem"> -->
          <div class="bgc" :class="{showme:index==whichBgc}" style="color:white">
            <img src="../../assets/checked.png" height="25" width="25">
          </div>
          <img :src="'data:image/png;base64,'+item.headImage" alt="">
          <p v-text="item.userName">name</p>
        </div>
        <div class="emptyBox" :class="{emptyShow:emptyShow}">
          <p>查询结果为空！！</p>
        </div>
      </div>
      <div class="foot">
        <div>
          <button class="btn footBtn" @click="returnHistory">返回</button>
          <button class="btn footBtn" @click="addFacetrackToPerson">完成</button>
        </div>
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 智能分析组件 -->
<script>
// import $ from 'jquery'
import Axios from 'axios'
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
import common from '@/common'
export default {
  name: 'IntellAnalyse',
  data () {
    return {
      intellNotShow: true,
      dataList: [],
      personData: null,
      emptyShow:false,
      whichBgc: null,
      chooseItem: null,
      intellParams: {
        facetracks: null,
      }
    }
  },
  props: ['viewWhich', 'toIntellAnalyse'],
  // computed: {
  //   emptyShow: function(){
  //     if(this.dataList.length <1){
  //       return true
  //     }else{
  //       return false
  //     }
  //   }
  // },
  methods: {
    get_facetrackimage: function(facetrackId){
      return common.get_facetrackimage(facetrackId)
    },
    close: function () {
      // $('#intellAnalyse').css('display', 'none')
      this.intellNotShow = true
      this.whichBgc = null
      this.dataList = []
      this.emptyShow = false
      // this.chooseItem = null
      // console.log(this.dataList)
      this.$emit('popState', '0')
    },
    // findItem: function (findme) {
    //   if (this.chooseItem.length <= 0) return
    //   for (let i = 0; i < this.chooseItem.length; i++) {
    //     if (findme === this.chooseItem(i)) {
    //       return true
    //     }
    //   }
    //   return false
    // },
    chooseMe: function (msg, item) {
      // alert(item)
      this.whichBgc = msg
      this.chooseItem = item
    },
    getDataList: function () {
      Axios.get(INTERFACE.GET_STRANGER_ANALYSE, {params: this.intellParams}).then(
        (res) => {
            console.log(res)
            if(res.data.status === 200){
              this.dataList = res.data.results.batchVo.list || []
              for(let i in this.dataList){
                //删除其中为空的数据
                if(this.dataList[i]===null){
                  this.dataList.splice(i,1)
                }
              }
              console.log(this.dataList)
              //返回数组长度为0时显示查询结果为空
              this.emptyShow = this.dataList.length ===0 ? true : false
            }else{
              this.dataList.length = 0
              console.log(this.dataList.length === 0)
              this.emptyShow = true
            }
          // console.log(this.dataList)
        }, (err) => {
        console.log(err)
      })
    },
    returnHistory: function () {
      this.whichBgc = null
      this.dataList = []
      this.$emit('popState', 'intell')
    },
    addFacetrackToPerson() {
      const _this = this
      console.log(this.chooseItem)
      console.log(this.intellParams.facetrackId)
      if (this.chooseItem === null) {
        console.warn('选择图片为空值，返回上一界面')
        this.$emit('popState', 'intell')
        return
      }
      // return
      let dataForm = new FormData()
      let facetracks = new Array()
      // WTF personId从数组里可以取值，chooseItem取不到（安卓pad）
      facetracks.push(this.intellParams.facetrackId)
      dataForm.append('personId', this.dataList[this.whichBgc].personId)
      dataForm.append('facetrackIds', facetracks)
      dataForm.append('customName',this.$store.state.userInfo.customName)
      // alert(dataForm.get('personId'))
      Axios({
        method: 'POST',
        url: INTERFACE.PUT_STRANGER2PERSON,
        data: dataForm,
        headers: {
          'Content-Type': ' application/x-www-form-urlencoded'
        }
      }).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          this.$Message.success({content: res.data.message})
          this.close()
          this.$emit('update')
          return
        }
        this.$Message.error({content: res.data.reference})
      }, (err) => {
        // alert(err)
        console.log(err)
      })
    }
  },
  watch: {
    viewWhich: function (val, old) {
      // alert(val)
      if (val === 'intellAnalyse') {
        // $('#intellAnalyse').css('display', 'block')
        this.intellNotShow = false
        this.getDataList()
      } else {
        // $('#intellAnalyse').css('display', 'none')
        this.intellNotShow = true
      }
    },
    toIntellAnalyse: function (val, old) {
      this.personData = val
      this.intellParams = {
        facetrackId: val.facetrackId,
        customName: this.$store.state.userInfo.customName
      }
    }
  }
}
</script>

<style>
/*@import '../../assets/style.css'*/
</style>

<style scoped>
.notshow{
  display: none;
}
.popup header{
  width: 100%;
  height: 200px;
  /*background-color: #2B77D5;*/
  padding: 20px;
  box-sizing: border-box;
}
.popup header>div{
  /*display: inline-block;*/
  float:left;
  height: 160px;
  /*background-color: green*/
}
.popup header .setHead{
  width: 160px;
  height: 160px;
  background-color: white
}
.popup header .setHead img{
  width: 100%;  
}
.popup header .addUser{
  padding-left:10px;
  max-width: 60%
}
.popup header .btn{
  border:1px solid white;
  color: white;
  font-weight: 800;
  margin-top: 20px
}
.popup article{
  clear: both;
  width: 100%;
  height: 280px;
  position: relative;
  /*background-color: lightblue*/
}
.popup article .content{
  display: flex;
  /*justify-content: center;*/
  justify-content: space-around;
  padding-top: 20px
}
.popup article .content>.item{
  color: rgb(70,60,70);
  /*border:3px solid rgba(0,0,0,0.5);*/
  background-color: white;
  border-radius: 5px; 
  width: 140px;
  height: 160px;
  text-align: center;
  position: relative;
}
.popup article .content>.item .bgc{
  background-color: rgba(0,0,0,0.7);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none
}
.popup article .content>.item .bgc>img{
  position: absolute;
  right: 0;
  bottom: 0
}
.popup article .content>.item .bgc.showme{
  display: block;
  border:3px solid #2C78D6;
}
.popup article .content>.item>img{
  width: 120px;
  height: 120px
}

.popup article .foot{
  text-align: center;
  width: 100%;
  position: absolute;
  bottom:0
}
.popup article .foot>div{
  width: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.popup article .foot>div button{
  background-color: #2B77D5;
  color: white
}
input[type="radio"]{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0
}
.emptyBox{
  height: 40px;
  display: none
}
.emptyShow{
  display: block
}
.emptyBox p{
  position: relative;
  width: 100%;
  text-align:center;
  line-height: 40px
}
</style>
