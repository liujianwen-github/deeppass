<template>
  <Row class="container">
    <Intell :viewWhich='popState' :toIntell="personData" @popState="changePop"></Intell>
    <IntellAnalyse :viewWhich="popState" @update="update" @popState="changePop" :toIntellAnalyse="personData"></IntellAnalyse>
    <createUser :viewWhich="popState" @update="update" @modalMessage="modalMessage" @popState="changeState" :toCreateUser="createUserData"></createUser>
    <Col span="4" class="">
      <Sider :item="0"></Sider>
    </Col>
    <Col span="20">
      <HeadBox></HeadBox>
      <!-- 登录信息 -->
      <Row class="loginInfo">
        <Col span="14">
          <p>
            <span class="date">{{time.Format('yyyy')}}年{{time.Format('MM')}}月{{time.Format('dd')}}日</span>
            <span class="day">星期{{'日一二三四五六'.charAt(time.getDay())}}</span> 
          </p>
          <p>
            欢迎使用deeppass管理系统
          </p>
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
                <p class="time">{{item.recordUpdatedTime.split(' ')[1].split(':')[0]}}:{{item.recordUpdatedTime.split(' ')[1].split(':')[1]}}</p>
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
export default {
  name: 'hello',
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
      time:new Date(),
      // 查询条件
      deviceCondition:'',
      // 设备列表
      deviceList:[{
        value:'1',
        label:'摄像头1'
      },{
        value:'2',
        label:'摄像头2'
      },{
        value:'3',
        label:'摄像头3'
      }],
      //弹窗状态
      popState: '0',
      personData:{}
    }
  },
  components:{HeadBox, Sider, Intell, IntellAnalyse},
  methods:{
    search(){
      //
    },
    //获取facetrack图片
    GET_FACETRACK_IMG(facetrackId){
      return common.get_facetrackimage(facetrackId)
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
      }
    },
    //翻页
    changePage(pageNo){
      console.log(pageNo)
      let opt = {
        pageNo:pageNo
      }
      this.getData(opt)
    },
    changePop(msg){
      this.popState = msg
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
        console.log(res)
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
      console.log(val)
    }
  },
  created(){
    console.log(this.$store.state)
    console.log(this.time.__proto__)
    this.getData()
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
            width: 80%;
            height: 80px;
            border:1px dashed green;
            text-align:center;
            left: 10%;
            top: 10%;
            img{
              height:100%
            }
          }
          .info{
            position:absolute;
            bottom: 10px;
            width:100%
          }
        }
        
      }
   }
}

</style>
