<template>
  <Row class="container">
    <Col span="24">
      <HeadBox></HeadBox>
    </Col>
    <Col span="4" class="">
      <Sider :item="1"></Sider>
    </Col>
    <Col span="20">
      <div class="nav">
        <Breadcrumb separator=">">
          <BreadcrumbItem href="/home">首页</BreadcrumbItem>
          <BreadcrumbItem>设备管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="operation">
        <button @click="add">添加</button>
      </div>
      <!-- <Table class="data" :columns="titles" :data="dataList"></Table> -->
      <table class="data" border="1" cellspacing="0">
        <thead>
          <td v-for="item in titles" :key="item.key">{{item.title}}</td>
        </thead>
        <tbody>
          <tr v-for="(item,index) in dataList">
            <td>{{index+1}}</td>
            <td>{{item.deviceName}}</td>
            <td>{{item.machineCode}}</td>
            <td>{{item.recordCreateTime.split(' ')[0]}}</td>
            <td>{{item.content}}</td>
            <td>
              <button @click="edit(item)">编辑</button>
              <!-- <button>删除</button> -->
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <table border="1">
        <thead>
          <td>&nbsp;</td>
          <td v-for="item in titles">{{item.title}}</td>
        </thead>
      </table> -->
    </Col>
    <addDevice :viewWhich="popState" :deviceData="deviceData" @changePop="changePop" @update="getDevice" @init="getData"></addDevice>
  </Row>
</template>

<script>
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
import Sider from '../Sider'
import HeadBox from '../Head'
import addDevice from './addDevice.vue'
export default {
  name: 'DeviceManage',
  data(){
    return {
      popState:'0',//添加设备窗口状态
      deviceData:{},//编辑设备时数据
      //表格title列表
      titles:[{
          title:'序号',
          key:'index'
        },{
          title:'名称',
          key:'name'
        },{
          title:'设备码',
          key:'code'
        },{
          title:'添加日期',
          key:'date'
        },{
          title:'备注',
          key:'remarks'
        },{
          title:'操作',
          key:'oper'
      }],
      dataList:[]
    }
  },
  components:{Sider, HeadBox, addDevice},
  methods:{
    // 获取数据
    getDevice(){
      this.$http({
        method: 'GET',
        url: INTERFACE.GET_DEVICE,
        params:{
          customName: this.$store.state.userInfo.customName
        }
      })
      .then((res)=>{
        console.log(res)
        if(res.data.status ===200){
          this.dataList = res.data.results.batchVo.list
          console.log(this.dataList)
        }else{
          this.$Message.error(res.data.message)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getData(){
      // console.log(this.$store.state.userInfo)
      // console.log()
      // this.dataList = this.$store.state.deviceInfo
      this.getDevice()
      console.log(this.dataList)
    },
    // 添加设备
    add(){
      this.popState = 'addDevice'
    },
    // 编辑设备
    edit(item){
      // console.log(item)
      this.deviceData = item
      this.popState = 'addDevice'
    },
    //重置deviceData
    reloadDeviceData(){
      this.deviceData = {}
    },
    // 状态栏切换
    changePop(e){
      this.popState = e
    }
  },
  created(){
    // this.getDevice()
    // console.log(this.$store.state)
    // this.dataList = this.$store.state.deviceInfo
    this.getDevice()
    // console.log(async)
    // await this.$root.getDevice(this.$store.state.userInfo.customName)  
    // await this.getData()
    // console.log('1')
  }
}
</script>

<style lang="scss" scoped>
.container{
  .operation{
    text-align: left;
    button{
      background-color: white;
      border-radius: 5px;
      border:1px solid black;
      padding: 0.5em 1em
    }
  }
  .data{
    width:100%;
  }
}
</style>
