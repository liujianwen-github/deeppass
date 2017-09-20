<template>
  <div class="popup" id="leaveMessage" :class="{show:isShow}">
   <div v-if="viewWhich=='leaveMessage'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="get_image(personData.personId)" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">
          <span v-text="personData.userName" class="whiteText"></span>
        </p>
        <p class="headInfo whiteText">留言设置</p>
        <div class="headInfo">
          <div>
            <input type="radio" name="timeLine" value="short" v-model="messageForm.timeLine"><span class="whiteText">短期留言</span>
          </div>
          <div>
            <input type="radio" name="timeLine" value="long" v-model="messageForm.timeLine"><span class="whiteText">长期留言</span>
          </div>
        </div>
        <div class="headInfo" :class="{notShow:messageForm.timeLine === 'long'}">
          <span class="whiteText">留言日期:</span>
          <Date-picker type="date" :clearable="false" :options="beginTimeOPT" v-model="messageForm.baseTime" format="yyyy-MM-dd "></Date-picker>
        </div>
        <div class="headInfo" :class="{notShow:messageForm.timeLine === 'long'}">
        <!-- 开始时间结束时间限制条件一样 -->
          <span class="whiteText">留言时段:</span>
          <Time-picker confirm type="timerange"
          hide-disabled-options
          v-model="stime"
          @on-change="editTime"
          :disabled-hours="timeHOPT"
           placement="bottom-end" format="HH:mm" placeholder="选择时间"></Time-picker>
          <!-- <Date-picker type="datetime" class="date" :clearable="false" :options="beginTimeOPT" v-model="messageForm.startTime" format="yyyy-MM-dd HH:mm"></Date-picker> -->
        </div>
        <div class="headInfo" :class="{notShow:messageForm.timeLine === 'long'}">
          <!-- <span class="whiteText">结束时间：</span> -->
           <!-- <Time-picker type="time" placeholder="选择时间" style="width: 168px"></Time-picker> -->
          <!-- <Date-picker type="datetime" class="date" :clearable="false" :options="endTimeOPT" v-model="messageForm.endTime" format="yyyy-MM-dd HH:mm"></Date-picker> -->
        </div>
      </div>
    </header>
    <article>
      <div class="msgBox">
        <p class="message">留言会在设定时间段内识别时出现</p>
        <textarea autofocus placeholder="请输入留言内容" name="leaveMessage"  v-model="messageForm.message" v-validate="'required|leaveMessage'"></textarea>
        <p v-show="errors.has('leaveMessage')" style="margin:0">&nbsp;{{ errors.first('leaveMessage') }}</p>
      </div>
      <div class="foot">
        <button class="btn" @click="returnUserInfo">取消</button>
        <button class="btn" @click="setMessage">确定</button>
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 查看用户信息组件 -->
<script>
// import $ from 'jquery'
import config from '@/config/default'
import common from '@/common'
import Axios from 'axios'
import INTERFACE from '@/INTERFACE'
export default {
  name: 'history',
  data () {
    return {
      msg:null,
      isShow: false,
      update: true,
      endTimeOPT: {
        disabledDate(date) {
          return date < Date.now()
        }
      },
      beginTimeOPT: {
        disabledDate(date) {
          return date <= Date.now()
        }
      },
      timeHOPT:[],
      // timeMOPT:[],
      stime: null,
      etime: null,
      messageForm: {
        timeLine: 'short',
        baseTime: new Date().Format('yyyy-MM-dd'),
        startTime: null,
        endTime: null,
        message: ' '
      },
      personData: {
        image: null,
        name: null,
        personId: null
      }
    }
  },
  props: ['viewWhich', 'toMessage'],
  methods: {
    get_image: function(personId){
      return common.get_image(personId)
    },
    editTime: function (msg){
      console.log(msg)
      // 用户修改过的时间
      this.messageForm.startTime = this.messageForm.baseTime +' '+ msg[0]
      this.messageForm.endTime = this.messageForm.baseTime +' '+ msg[0]
      console.log(this.messageForm)
      // const h = msg[0].substring(0,2) //当前选中的小时
      // console.log(typeof minute)
      // console.log(typeof new Date().getHours())
      // console.log(Number(h) === new Date().getHours())
      // const curr = Number(h) === new Date().getHours()
      // if(curr) {
      //   //选择时间等于当前时间的小时
      //   const min = new Date().getMinutes() //获取当前的分钟数
      //   for(let i =0;i<min;i++){
      //     this.timeMOPT[i] = i
      //   }
      // } else{
      //    this.timeMOPT = []
      // }
      // this.$forceUpdate()
      // console.log(this.timeMOPT)
      // // 这种方法并不能生效，修改之后的时间限制条件没有刷新视图
    },
    close: function () {
      // $('#leaveMessage').css('display', 'none')
      this.isShow = false
      this.messageForm = {
        timeLine: 'short',
        baseTime: new Date().Format('yyyy-MM-dd '),
        startTime: null,
        endTime: null,
        message: ' '
      }
      this.$emit('popState', '0')
    },
    returnUserInfo: function () {
      this.close()
      this.$emit('popState', 'userInfos')
    },
    viewGif: function () {
      alert('viewgif')
    },
    viewScene: function () {
      alert('viewScene')
    },
    searchHistory: function () {
      this.$emit('popState', 'history')
    },
    setMessage: function () {
      this.update = true // 默认允许更新
      this.$validator.validateAll().then(result => {
        console.log(result)
        if (!result) {
          this.$Message.error('请按照提示完整填写')
          console.log(this)
          this.update = false
          return false
        }
      }).then((data)=>{
        console.log(typeof this.messageForm.startTime)
        if(this.messageForm.timeLine ==='short') {
          if (this.messageForm.startTime === "" ||this.messageForm.endTime === "" ) {
            this.msg = this.$Message.error({content: '短期留言时间区间不能为空',duration: 5})
            this.update = false
          }
        }
        // if (new Date(this.messageForm.startTime).getTime() >=new Date(this.messageForm.endTime).getTime()) {
        //   this.update = false
        //   this.$Message.error('留言结束时间早于开始时间')
        // }
        if (this.update === false) return false
        let messageList = new FormData()
        // config.changeDateType(this.messageForm.startTime)
        messageList.append('personId', this.personData.personId)
        messageList.append('customName', this.$store.state.userInfo.customName)
        // TODO 长期留言时间
        if(this.messageForm.timeLine ==='short') {
          messageList.append('msgBeginTime', this.messageForm.startTime)
          messageList.append('msgEndTime', this.messageForm.endTime)
        } 
        messageList.append('message', this.messageForm.message)
        console.log(messageList)
        Axios({
          url: INTERFACE.PUT_USER,
          method: 'POST',
          data: messageList,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.status === 200) {
            // msg内容消失
            // this.msg()
            // console.log(this.msg)
            // if (this.msg === null) alert('empty')
            this.$Message.info({content:'留言成功'})
            this.close()
            return
          }
           this.$Message.error({content:res.data.message})
           this.close()
        }, (err) => {
          console.log(err)
        })
      })
      
    },
    stringifyDate: function (date) {
      console.log(date)
    }
  },
  watch: {
    viewWhich: function (val, old) {
      if (val === 'leaveMessage') {
        this.isShow = true
        // 用户如果没有修改过时间，留言开始结束时间是这个
        this.messageForm.startTime = this.messageForm.baseTime +' '+ new Date().Format('hh:mm')
        this.messageForm.endTime = this.messageForm.baseTime +' '+ new Date().Format('hh:mm')
      } else {
        this.isShow = false
      }
    },
    messageForm: {
      handler (val, old) {
        // console.log(val)
      },
      deep: true
    },
    toMessage: {
      handler (val, old) {
        this.personData = val
        console.log(this.personData)
        this
      },
      deep: true
    },
    stime: function (val, old){
      // console.log(val[0].getHours())
    }
  },
  created() {
    // 根据当前时间设置禁用的小时
    let now = new Date().getHours()
     this.stime = [new Date().Format('hh:mm'),new Date().Format('hh:mm')]
    for(let i =0;i<now;i++){
      this.timeHOPT[i] = i
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
.notShow{
  display: none
}
.show{
  display: block!important
}

.popup header{
  width: 100%;
  height: 200px;
  padding: 20px;
}
.popup>div{
  background-color: #F6F7FB
}
.popup header>div{
  float:left;
  height: 160px;
}
.popup header .setHead{
  width: 160px;
  height: 160px;
  max-width: 38%;
  background-color: white;
  overflow: hidden;
}
.popup header .setHead img{
  width: 100%;  
}
.popup header .addUser{
  padding-left:10px;
  max-width: 60%
}
.popup header .addUser p{
  margin: 0
}
.popup header .addUser .headInfo>div{
  display: inline-block;
}
.popup header .addUser .headInfo .date{
  width: 160px;
  height: 30px
}
.message{
  color: rgb(100,100,100)
}
.popup .btn{
  /*border:1px solid white;*/
  /*color: white;*/
  background-color: #2B77D5;
  width: 120px;
  height: 30px;
  color: white;
  font-weight: 800;
  margin-top: 20px;
}
article{
  text-align: center;
}
textarea{
  width: 80%;
  height: 180px;
  resize: none
}
article .msgBox{
  min-height: 240px
}
.foot{
  letter-spacing: 20px
}
.foot>button{
  letter-spacing: 0
}
.headInfo>span{
  display:inline-block;
  width: 75px
}
</style>
