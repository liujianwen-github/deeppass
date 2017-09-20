<template>
	<Row class="container" id="userManage">
    <chooseDevice :popState="popState" @changePop="changePop" :userData="personData" @changeUserData="changeUserData" @update="getAllUser"></chooseDevice>
    <registerUser :viewWhich="popState" :toRegisterUser="personData" @popState="changePop"  @changeUserData="changeUserData" @deleteItem="deleteItem"></registerUser>
    <UserInfos :isHidden = "userInfoIsHidden" :personId="personData.personId" @back="userInfoIsHidden=true"></UserInfos>
		<Col span="24">
      <HeadBox></HeadBox>
		</Col>
    <Col span="4" class="">
      <Sider :item="2"></Sider>
    </Col>
    <Col span="20">
      <div class="nav">
        <Breadcrumb separator=">">
          <BreadcrumbItem href="/home">首页</BreadcrumbItem>
          <BreadcrumbItem>用户管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="operation">
      	<div class="left">
      		<button class="restBtn" @click="go_register('addNewUser')">新建</button>
      		<!-- <button class="restBtn">删除</button>
      		<button class="restBtn">批量分发到设备</button> -->
      	</div>
      	<div class="right">
      		<input type="text" placeholder="从当前数据中检索" name="">
      		<span class="totalNum">共有数据:{{pageInfo.totalNum}}</span>
      	</div>
      </div>
      <!-- <Table class="data" :columns="titles" :data="dataList"></Table> -->
      <table class="content" cellspacing="0">
      	<thead>
      		<td v-for="(item,index) in titles" :key="item.key">{{item.title}}</td>
      		<td>操作</td>
      	</thead>
      	<tbody>
      		<tr v-for="(item,index) in dataList" :key="index">
      			<!-- <td>
      				<input type="checkbox" :id="'item'+index" :value="item.personId" v-model="checkGroup" name="check">
      			</td> -->
      			<td class="name">
      				<label :for="'item'+index">{{item.userName}}</label>
      			</td>
      			<td class="userType">{{item.userType}}type</td>
      			<td class="headImg">
      				<img :src="get_image(item.personId)" alt="">
      			</td>
      			<td class="device">{{item.deviceName}}dd</td>
      			<td class="vip">
      				<span v-if="item.vip===0">是</span>
      				<span v-else>否</span>
      			</td>
      			<td class="operationGroup">
      				<a class="operationBtn" @click="go_register('editUser',item)">编辑</a>
      				<a class="operationBtn" @click="deleteItem(item.personId)">删除</a>
      				<!-- <a class="operationBtn" @click="issued">分发到设备</a> -->
      				<a class="operationBtn" @click="viewHistory(item)">历史记录</a>
      			</td>
      		</tr>
      	</tbody>
      </table>
      {{checkGroup}}
    </Col>
  </Row>
</template>

<script>
import config from '@/config/default'
import common from '@/common'
import INTERFACE from '@/INTERFACE'
import Sider from '../Sider'
import HeadBox from '../Head'
import chooseDevice from './chooseDevice.vue'
import registerUser from './registerUser.vue'
import UserInfos from './searchUserInfos.vue'
export default {
  name: 'user',
  data(){
  	return{
  		titles:[{
  			title:'姓名',
  			key:'customName'
  		},{
  			title:'身份标签',
  			key:'userType'
  		},{
  			title:'头像',
  			key:'img',
  		},{
  			title:'设备',
  			key:'num'
  		},{
  			title:'门禁权限',
  			key:'num'
  		}],
  		dataList: [],
  		pageInfo:{},
  		checkGroup:[],
      popState: '0',
      personData:{},
      userInfoIsHidden: true,
  	}
  },
  components:{Sider, HeadBox, chooseDevice, registerUser, UserInfos},
  methods:{
  	// 获取person头像
  	get_image(personId){
  		return common.get_image(personId,this.$store.state.userInfo.customName)
  	},
    viewHistory(item){
      this.personData = item
      this.userInfoIsHidden = false
    },
  	// 获取用户数据
  	getAllUser(){
  		this.$http({
  			method:'GET',
	  		url: INTERFACE.GET_ALL_USER,
	  		params:{
	  			customName: this.$store.state.userInfo.customName
	  		}
  		})
  		.then((res)=>{
  			console.log(res)
  			if(res.data.status === 200){
  				const data = res.data.results.batchVo
  				this.dataList = data.list
  				this.pageInfo = {
  					totalNum: data.totalNum,
  					current: data.pageNo,
  					pageSize: data.pageSize
  				}
  			}else{
  				this.$Message.error(res.data.message)
  			}
  		})
  		.catch((error)=>{
  			console.log(error)
  		})
  	},
    //下发到设备
    issued(){
      this.changePop('chooseDevice') 
    },
    changePop(msg){
      console.log(msg)
      this.popState = msg
    },
    //删除用户
    deleteItem(personId){
      let r = confirm("是否确定删除?")
      // console.log(window)
      if(!r){
        return
      }
      this.$http({
        method:'GET',
        url:INTERFACE.DELETE_USER,
        params:{
          personIds: personId,
          customName: this.$store.state.userInfo.customName
        }
      })
      .then((res)=>{
        if(res.data.status===200){
          this.$Message.success(res.data.message)
          this.getAllUser()
        }else{
          this.$Message.error(res.data.message)
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    //
    changeUserData(data,type){
      console.log('修改用户信息',data)
      if(data==='0') {
        this.personData = {}
        return
      } //data为0时=>取消编辑用户操作，避免watch监听不到变化

      this.personData = data
      this.personData.editType = type
    },
    go_register(item,data){
      if(item==='addNewUser'){
        this.personData = {
          headImage: '',
          imgs: [],
          userName: '',
          sex: '0',
          time: null,
          cardId: '',
          birthday: null,
          personId: '',
          images:[],
          vip: 0
        }
        console.log('manage',this.personData)
        this.popState = 'addNewUser'

      }else{
        console.log('编辑！！！！！！！！！！')
        this.popState = 'editUser'
        this.personData = data
        console.log(this.personData)
      }
    }
  },
  created(){
  	// console.log
  	this.getAllUser()
  	// common.bibi() 
  }
}
</script>

<style lang="scss" scoped>
#userManage{
	.ivu-table-cell{
		padding:0px!important;
	}
	.operation{
		display:flex;
		justify-content:space-between;
	}
	.content{
    width:100%;
		thead{
			td{
				border:1px solid black;
			}
		}
		tbody{
			tr{
				border-bottom: 1px solid red;
			}
			.headImg{
				img{
					height:40px;
				}
			}
		}

	}
}
</style>
