<template>
  <Row class="container">
    <Intell :viewWhich='popState' :toIntell="personData" @popState="changePop"></Intell>
    <IntellAnalyse :viewWhich="popState" @update="update" @popState="changePop" :toIntellAnalyse="personData"></IntellAnalyse>
    <createUser :viewWhich="popState" @update="update" @popState="changePop" :toCreateUser="personData"></createUser>
    <userInfos :viewWhich="popState" :toUserInfos="personData" @popState="changePop"></userInfos>
    <leaveMessage :viewWhich="popState" @popState="changePop" :toMessage="personData"></leaveMessage>
    <history :viewWhich="popState" :toHistory="personData" @popState="changePop"></history>
    <Col span="24">
      <HeadBox></HeadBox>
    </Col>
    <Col span="4" class="">
      <Sider :item="0"></Sider>
    </Col>
    <Col span="20">      <!-- 登录信息 -->
      <Row class="loginInfo">
        <Col span="14">
          <p>
            <span class="date">{{date.Format('yyyy')}}年{{date.Format('MM')}}月{{date.Format('dd')}}日</span>
            <span class="day">星期{{'日一二三四五六'.charAt(date.getDay())}}</span> 
            <span class="time">{{time}}</span>
          </p>
          <!-- <p>
            欢迎使用deeppass管理系统
          </p> -->
        </Col>
        <Col span="10">
          <p>上次登录时间：{{}}</p>
        </Col>
      </Row>
      <!-- 查询内容 -->
      <div class="content">
        <!-- 查询条件选择 -->
        <div class="query-condition">
          <Select v-model="deviceCondition" style="width:100px">
              <Option v-for="item in deviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <button @click="search">确定</button>
        </div>
        <Row class="itemBox">
          <Col span="12" class="item" v-for="item in list" :key="item.value">
            <div @click="operation(item)">
              <div class="tag">{{item.matchStatus}}</div>
              <div class="img" >
                <img :src="GET_FACETRACK_IMG(item.facetrackId)" alt="">
              </div>
              <div class="info">
                <p class="name">{{item.userName}}</p>
                <p class="time">{{item.facetrackCreateTime.split(' ')[1].split(':')[0]}}:{{item.facetrackCreateTime.split(' ')[1].split(':')[1]}}</p>
              </div>
            </div>
          </Col>
        </Row>
        <div class="footer">
          <Page :total="pageInfo.totalNum" :current="pageInfo.pageNo" :page-size="pageInfo.pageSize" @on-change="changePage" show-elevator></Page>
        </div>

      </div>
    </Col> 
  </Row>
</template>

<script>
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
import common from '@/common'
import HeadBox from '@/components/Head'
import Sider from '@/components/Sider'
import Intell from './intell.vue' 
import IntellAnalyse from './intellAnalyse.vue'
import createUser from './createUser.vue'
import userInfos from './userInfos.vue'
import leaveMessage from './leaveMessage.vue'
import history from './history.vue'
export default {
  name: 'Home',
  data(){
    return{
      //分页信息
      pageInfo:{
        totalNum:0,
        pazeSize:20,
        pageNo:1
      },
      //facetrack列表
      list:[],
      date:new Date(),
      time:'',
      // 查询条件
      deviceCondition:'',
      // 设备列表
      // deviceList:[{
      //   value:'1',
      //   label:'摄像头1'
      // },{
      //   value:'2',
      //   label:'摄像头2'
      // },{
      //   value:'3',
      //   label:'摄像头3'
      // }],
      //弹窗状态
      popState: '0',
      personData:{}
    }
  },
  components:{HeadBox, Sider, Intell, IntellAnalyse, createUser, userInfos, leaveMessage, history},
  computed:{
    deviceList(){
      console.log(this.$store.state)
      const devices = this.$store.state.deviceInfo
      let deviceList = []
      let item = {}
      for(let i in devices){
        item = {
          value: devices[i].deviceId,
          label:devices[i].deviceName
        }
        deviceList.push(item)
      }
      deviceList.unshift({
        value: '',
        label:'全部'
      })
      return deviceList
    }
  },
  methods:{
    search(){
      console.log(this.deviceCondition)
      let opt = {
        customName: this.$store.state.userInfo.customName,
        deviceId:this.deviceCondition
      }
      this.getData(opt)
    },
    getTime(){
      let time = new Date()
      time = time.Format('hh:mm:ss')
      this.time = time
      // return time
    },
    //获取facetrack图片
    GET_FACETRACK_IMG(facetrackId){
      return common.get_facetrackimage(facetrackId,this.$store.state.userInfo.customName)
    },
    //列表操作
    operation(item){
      // console.log(matchStatus)
      this.personData = item
      //陌生人跳转intell,用户跳转userinfo
      if(item.matchStatus==='0'||item.matchStatus===0){
        this.popState = 'intell'
        console.log('stranger')
      }else if(item.matchStatus==='1'||item.matchStatus===1){
        console.log('user')
        this.popState = 'userInfos'
      }
    },
    //翻页
    changePage(pageNo){
      //获取当前页码信息，并添加当前账户名
      let opt = {
        pageNo:pageNo,
        customName: this.$store.state.userInfo.customName
      }
      this.getData(opt)
    },
    changePop(msg){
      this.popState = msg
      // alert(msg)
    },
    update(){
      this.$emit('update', 1)
    },
    // 获取facetrack列表
    getData(opt){
      this.$http({
        method:'GET',
        url:INTERFACE.GET_FACRTRACKLIST,
        params: opt
      })
      .then((res)=>{
        // console.log(res)
        if(res.data.status===200){
          const data = res.data.results.batchVo
          this.list = data.list
          this.pageInfo = {
            totalNum:data.totalNum,
            pazeSize:data.pageSize,
            pageNo:data.pageNo
          }
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  watch:{
    //弹窗状态
    popState(val,old){
      // console.log(val)
      // console.log(this.personData)
    }
  },
  created(){
    this.getTime()//加载立即显示时间，取消setinterval的一秒延迟
    setInterval(this.getTime,1000)
    
    // 获取当前登录用户的账户名
    const opt = {
      customName: this.$store.state.userInfo.customName
    }
    this.getData(opt)
  }
}
</script>

<style lang="scss" scoped>
.loginInfo{
  border-bottom: 1px solid pink;
  height:50px
}
.content{
   .query-condition{
      text-align: right;
      height:30px
   }
   .itemBox{
      position:relative;
      min-height: 500px;
      background-color:lightblue;
      .item{
        border:1px dashed red;
        height: 150px;
        overflow: hidden;
        display: inline-block;
        text-align: center;
        >div{
          width:100%;
          height:100%;
          position:relative;
          .tag{
            color: white;
            background-color: blue;
            width: 100px;
            height:20px;
            transform: rotate(-45deg);
            position: absolute;
            left: -33px;
            top: 10px
          }
          .img{
            position: relative;
            // width: 80%;
            height: 80px;
            // border:1px dashed green;   
            text-align:center;
            // left: 10%;
            // top: 10%;
            img{
              height:100%
            }
          }
          .info{
            // position:absolute;
            // bottom: 10px;
            width:100%
          }
        }
        
      }
   }
}

</style>
