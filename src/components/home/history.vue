<template>
  <div class="popup" id="history" :class="{show:isShow}">
   <div v-if="viewWhich=='history'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="get_image(personData.personId)" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">
          <span v-text="personData.name"  class="whiteText"></span>&nbsp;
          <span class="whiteText">智能分析查找</span>
        </p>
        <p class="headInfo">
          <span>
            <input type="radio" id="radio1" name="chooseTime" value="0.5" v-model="chooseTime" @click="resetPersonSetTime"><label for="radio1" class="whiteText">半小时</label>
            
          </span>
          <span>
            <input type="radio" id="radio2" name="chooseTime" value="4" v-model="chooseTime" @click="resetPersonSetTime"><label for="radio2" class="whiteText">4小时</label>
            
          </span>
          <span>
            <input type="radio" id="radio3" name="chooseTime" value="12" v-model="chooseTime" @click="resetPersonSetTime"><label for="radio3" class="whiteText">12小时</label>
            
          </span>
          <span>
            <input type="radio" id="radio4" name="chooseTime" value="24" v-model="chooseTime" @click="resetPersonSetTime"><label for="radio4" class="whiteText">24小时</label>
            
          </span>
          <span>
            <input type="radio" id="radio5" name="chooseTime" value="personSet" v-model="personSetTime" @click="toZero"><label for="radio5" class="whiteText">自定义</label>
            
          </span>
          <span>
            <input type="text" name="" value="" v-model="chooseTime" autofocus :class="{isShow:personSetTime=='personSet'}">
          </span>
        </p>
        <div>
          <button class="btn" @click="searchNoMatchedList">查找</button>
          <button class="btn" @click="returnUserInfos">返回</button>
        </div>
      </div>
    </header>
    <article>
     <div class="content">
       <div :class="{emptyBox:emptyHide}">
         <p style="width: 100%;text-align:center;line-height: 40px">查询结果为空！！</p>
       </div>
       <div class="item" v-for="(item,index) in historyList">
         <img :src="get_facetrackimage(item.facetrackId)"  alt="">
         <p><span v-text="item.facetrackCreateTime.split(' ')[0]"></span></p>
         <p><span v-text="item.facetrackCreateTime.split(' ')[1]"></span></p>
         <p>
           <button class="btn" @click="confirmFacetrack(item.facetrackId)">确定</button>
         </p>
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
import INTERFACE from '@/INTERFACE'
export default {
  name: 'history',
  data () {
    return {
      isShow: false,
      personSetTime: '',
      chooseTime: '0.5',
      personData: null,
      searchImgList: null, // 查找未成功识别记录数据
      historyList: [],
      emptyHide:true
    }
  },
  props: ['viewWhich', 'toHistory'],
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
      this.emptyHide = true
      // this.
    },
    toZero: function () {
      this.chooseTime = ''
    },
    confirmFacetrack: function (facetrackId, index) {
      // alert('push img')
      // console.log(this.personData)
      // let dataList = new FormData()
      // dataList.append('facetrackId', facetrackId)
      // dataList.append('personId', this.personData.personId)
      // dataList.append('userkey', config.userkey)
      const facetrackIds = new Array()
      facetrackIds.push(facetrackId)
      console.log(facetrackIds.__proto__ ===Array.prototype)
      let data = {
        facetrackIds: facetrackIds,
        personId:this.personData.personId
      }
      let dataList = new FormData()
      for(let key in data){
        dataList.append(key,data[key])
      }
      Axios({
        method: 'POST',
        url: INTERFACE.PUT_STRANGER2PERSON,
        data: dataList,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
         this.$Message.success('添加成功')
         this.searchNoMatchedList()
        }else{
          this.$Message.error(res.data.message)
        }
      }, (err) => {
        this.$Message.error(err.data.message)
      })
    },
    resetPersonSetTime: function () {
      this.personSetTime = ' '
    },
    searchNoMatchedList: function () {
      console.log(this.personData)
      alert('1')
      Axios({
        methods: 'GET',
        url: INTERFACE.GET_USER_UNMATCHED,
        params: {
          beginTime: new Date().getTime() - this.chooseTime * 3600000,
          endTime: new Date().getTime(),
          personId: this.personData.personId,
          deviceId:111,
          customName: this.$store.state.userInfo.customName
        }
      }).then((res) => {
        console.log(res)
        this.historyList = res.data.results.batchVo.list
//后台空数据时返回null
        this.emptyHide = this.historyList ===null ? false : true
        // console.log(this.historyList)
      }, (err) => {
        console.log(err)
      })
    },
    returnUserInfos: function () {
      this.$emit('popState', 'userInfos')
      this.isShow = false
      this.emptyHide = true
    }
  },
  watch: {
    viewWhich: function (val, old) {
      if (val === 'history') {
        this.isShow = true
        // 清空列表
        this.historyList = []
        // 恢复默认时间
        this.chooseTime = '0.5'
      } else {
        this.isShow = false
      }
    },
    toHistory: function (val, old) {
      this.personData = val
      console.log(this.personData)
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.popup{
  display: none
}
.isShow{
  display: inline-block!important
}
.popup header{
  width: 100%;
  height: 200px;
  padding: 20px;
  border-bottom: 1px solid black
}

.popup header>div:not(.closeWindow){
  /*display: inline-block;*/
  float:left;
  height: 160px;
  /*background-color: green*/
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
  padding-left:10px;
  width: 60%;
  text-align: left;
}
.popup header .addUser>.headInfo:nth-child(2) span{
/*background-color: red;*/
display: inline-block;
}
.popup header .addUser>div{
  display: inline-block;
}
.popup .btn{
  background-color: #6AA0E2;
  width: 120px;
  max-width: 45%;
  height: 30px;
  color: white;
  font-weight: 800;
  margin-top: 20px;
}
article .content{
  overflow-x: auto;
  white-space: nowrap;
}
article .content .item{
  padding: 10px;
  width: 26%;
  display: inline-block;
}
article .content .item img{
  width: 100%;
}
article .content .item p{
  text-align: center;
}
input[type="text"]{
  width: 50px;
  display: none
}
.emptyBox{
  display: none
}

</style>
