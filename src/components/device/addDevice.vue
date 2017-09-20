<template>
	<div id="addDevice" class="popup" v-if="viewWhich==='addDevice'">
		<div>
			<header>
				<p>添加新设备</p>
			</header>
			<article>
				<div class="inputGroup">
					<label for="deviceName">名称</label>
					<input type="text" id="deviceName" name="" v-model="deviceInfo.name">
					<span><!-- 错误提示 --></span>
				</div>
				<div class="inputGroup">
					<label for="deviceCode">设备码</label>
					<input type="text" id="deviceCode" name="" v-model="deviceInfo.Code">
					<span>&nbsp;</span>
				</div>
				<div class="inputGroup">
					<label for="remarks">备注</label>
					<input type="text" id="remarks" name="" v-model="deviceInfo.remarks">
					<span>&nbsp;</span>
				</div>
			</article>
			<footer>
				<button class="footBtn" @click="cancel">取消</button>
				<button class="footBtn" @click="operationEnd">确定</button>
			</footer>
		</div>
	</div>
</template>
<script>
import INTERFACE from '@/INTERFACE'
	export default{
		data(){
			return{
				deviceInfo:{
					name:'',
					Code:'',
					remarks:''
				}
			}
		},
		props:['viewWhich','deviceData'],
		methods:{
			init(){
				//初始化数据
				this.deviceInfo = {
					name:'',
					Code:'',
					remarks:''
				}
				// this.deviceData = {}
				this.$emit('init')
			},
			cancel(){
				this.$emit('changePop','0')
				this.init()
			},
			operationEnd(){
				// console.log(this.deviceData.deviceId)
				// return
				let data = new FormData();
				data.append('customName',this.$store.state.userInfo.customName)
				data.append('deviceName',this.deviceInfo.name)
				data.append('machineCode',this.deviceInfo.Code)
				if(typeof this.deviceData.deviceId ==='undefined'){
					//从deviceData中随便选一个数据用作判断
					this.addDevice(data)
				}else {
					this.updateDevice(data)
				}
			},
			addPerson2Devices(){

			},
			addDevice(data){
				// console.log(data.get('deviceName'))
				// data.append('remarks',this.deviceInfo.remarks) //现在缺少备注
				this.$http({
					method:'POST',
					url:INTERFACE.POST_DEVICE,
					headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
				}).
				then((res)=>{
					console.log(res)
					if(res.data.status ===200){
						this.$Message.success(res.data.message)
						this.init() //初始化数据
						this.$emit('changePop','0')
						this.$emit('update')
					}else{
						this.$Message.error(res.data.message)
					}
				})
				.catch((error)=>{
					console.log(error)
				})
			},
			updateDevice(data){
				this.$http({
					method:"POST",
					url: INTERFACE.PUT_DEVICE,
					headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
				})
				.then((res)=>{
					if(res.data.status ===200){
						this.$Message.success(res.data.message)
						this.init() //初始化数据
						this.$emit('changePop','0')
						this.$emit('update')
					}else{
						this.$Message.error(res.data.message)
					}
				})
				.catch((error)=>{
					console.log(error)
				})
			}
		},
		watch:{
			deviceData(val,old){
				// handler(val,old){
					console.log(val)
					this.deviceInfo = {
						name:val.deviceName,
						Code:val.machineCode,
						remarks:''
					}
				// }
			}
		}
	}
</script>
<style>
@import '../../assets/style.css'
</style>
<style lang="scss" scoped>
#addDevice{
	>div{
		background-color:white!important;
		border: 1px solid grey;
		height:300px;
		min-width: 440px;
		header{
    text-align:left;
		background-color:white;
		height:auto;
		padding:1em;
	  }
	  article{
	  	padding-top: 20px;
	  	.inputGroup{
	  		margin: 5px;
	  		height:40px;
	  	  label{
	  	  	display:inline-block;
	  	  	width:60px;
	  	  }
	  	  input{
	  	  	width:150px;
	  	  	height:30px;
	  	  	border-bottom:2px solid grey;
	  	  }
	  	  span{
	  	  	// background-color:red;
	  	  	display:inline-block;
	  	  	width:200px;
	  	  	line-height: 30px;
	  	  	height:30px;
	  	  	text-overflow:ellipsis; // 超出省略
	  	  	white-space: nowrap;
	  	  	overflow:hidden;
	  	  	vertical-align: bottom;
	  	  }
	  	}
	  }
	  footer{
	  	letter-spacing: 2em;
	  	>button{
	  		letter-spacing:0;
	  		width: 60px;
	  		height:35px;
	  		background-color:white;
	  		border:1px solid grey；
	  	}
	  }
	}
  
}
</style>