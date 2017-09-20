<template>
	<Row id="systemManage">
		<Col span="24">
			<HeadBox></HeadBox>
		</Col>
		<Col span="4">
			<Sider :item="3"></Sider>
		</Col>
		<Col span="20" class="content">
			<div class="nav">
        <Breadcrumb separator=">">
          <BreadcrumbItem href="/home">首页</BreadcrumbItem>
          <BreadcrumbItem>系统管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="adminManage">
      	<h3>管理员账号管理</h3>
      	<div class="adminContent">
      		<Row>
      			<Col span="12">
      				<div class="regularItems">
      					<div class="regularItem">
      						<span class="label">管理员账号：</span>
      						<span class="item">{{admin_regular.customName}}</span>
      					</div>
      					<div class="regularItem">
      						<span class="label">公司名称：</span>
      						<span class="item">{{admin_regular.nickName}}</span>
      					</div>
      					<div class="regularItem">
      						<span class="label">上次登录时间：</span>
      						<span class="item">{{}}</span>
      					</div>
      					<!-- {{userInfo}} -->
      				</div>
      			</Col>
      			<Col span="12">
      				<div class="changeItems">
      					<div class="changeItem">
      						<label class="label">原密码：</label>
      						<input type="text" class="item" name="">
      					</div>
      					<div class="changeItem">
      						<label class="label">新密码：</label>
      						<input type="password" class="item" name="">
      					</div>
      					<div class="changeItem">
      						<label class="label">确认密码：</label>
      						<input type="password" class="item" name="">
      					</div>
      				</div>
      			</Col>
      			<Col span="4" push="20">
      				<button>确认提交</button>
      			</Col>
      		</Row>
      	</div>
      </div>
      <div class="userTypeManage">
      	<h3>
      		<span class="left">用户类型管理</span>
      		<span class="btnGroup">
      			<button class="operation">添加</button>
      			<button class="operation">删除</button>
      		</span>	
      	</h3>
      	<div class="userContent">
      		<table border="1" cellspacing="0">
      			<thead>
      				<!-- <Row class='titles'> -->
      					<!-- <Col span="2"> -->
      						<td>&nbsp;</td>
      					<!-- </Col> -->
      					<!-- <Col span="2"> -->
      						<td class="num">序号</td>
      					<!-- </Col> -->
      					<!-- <Col span="2"> -->
      						<td class="type">类型</td>
      					<!-- </Col> -->
      					<!-- <Col span="2"> -->
      						<td class="color">颜色</td>
      					<!-- </Col> -->
      					<!-- <Col span="2"> -->
      						<td class="remarks">备注</td>
      					<!-- </Col> -->
      					<!-- <Col span="2"> -->
      						<td class="operation">操作</td>
      					<!-- </Col> -->
      				<!-- </Row> -->
      			</thead>
      			<tbody>
      				<tr>
      					<td>
	      					<input type="checkbox" name="usertype">
	      				</td>
	      				<td>{{index}}</td>
	      				<td></td>
	      				<td></td>
	      				<td></td>
	      				<td></td>
      				</tr>
      			</tbody>
      		</table>
      	</div>
      </div>
		</Col>
	</Row>
</template>

<script>
import config from '@/config/default'
import INTERFACE from '@/INTERFACE'
import Sider from '../Sider'
import HeadBox from '../Head'
export default {
  name: 'system',
  components:{Sider,HeadBox},
  computed:{
  	admin_regular:function(){
  		let userInfo = this.$store.state.userInfo
  		return userInfo
  	}
  },
  methods:{
  	getData(){
  		this.$http({
  			method:'GET',
  			url:INTERFACE.GET_LABEL,
  		})
  		.then((res)=>{
  			console.log(res)
  		})
  	}

  }
}
</script>

<style lang="scss" scoped>
#systemManage{
	.content{
		//管理员账号管理
		.adminManage{
			padding:1em;
			text-align:left;
			min-width: 450px;
			max-width: 800px;
			.adminContent{
				border:1px solid black;
				padding:1em;
				.regularItems{
					.regularItem{
						height:35px;
						.label{
							display:inline-block;
							width:50%;
							height:30px;
						}
						.item{
							height:30px;
						}
					}
				}
				.changeItems{
					.changeItem{
						height:35px;
						.label{
							display:inline-block;
							width:32%;
							height:30px;
							vertical-align:bottom;
						}
						.item{
							width:65%;
							height:30px;
							vertical-align:bottom;
						}
					}
				}
			}
		}
		// 用户类型管理
		.userTypeManage{
			padding:1em;
			>h3{
				text-align:left;
				.btnGroup{
					float: right;
				}
			}
			.userContent{
				table{
					width:100%;
					thead{
						>.titles{
							// width:100%;
						}
					}
				}
			}
		}
	}
}
</style>
