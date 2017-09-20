<template>
	<div id="chooseDevice" v-if="popState==='chooseDevice'">
		<div>
			<header>
				<p>请选择要分发到的的设备</p>
			</header>
			<article>
				<p><input type="checkbox" name="checkAll"  v-model="checkAll">全选</p>
				<div>
					<ul>
						<li v-for="(item,index) in deviceList" :key="item.deviceId">
							<label :for="item.machineCode">{{item.deviceName}}</label>
							<input type="checkbox" :id="item.machineCode" :value="item.deviceId" name="deviceList" v-model="checked">
						</li>
					</ul>
					<!-- {{checked}} -->
				</div>
				<div class="foot">
					<button @click="cancel">取消</button>
					<button @click="push">确定</button>
				</div>
			</article>
		</div>
	</div>
</template>
<script>
import INTERFACE from '@/INTERFACE'
	export default{
		data(){
			return {
				checkAll: false,
				checked:[],
				deviceList:[],
			}
		},
		props:["popState","userData"],
		methods:{
			pageInit(){
				this.checkAll = false
				this.checked = []
				this.deviceList = []
			},
			//取消
			cancel(){
				this.$emit('changePop','0') //修改弹窗状态
				this.pageInit() //初始化组件数据
			},
			getDevice(){
				this.$http({
					method:"GET",
					url: INTERFACE.GET_DEVICE,
					params:{
						customName:this.$store.state.userInfo.customName
					}
				})
				.then((res)=>{
					console.log(res)
					if(res.data.status ===200){
						this.deviceList = res.data.results.batchVo.list
					}
				})
				.catch((error)=>{
					console.log(error)
				})
			},
			addNew(data,devices){
				// data.append('personId',this.userData.personId)
				for(let i in this.userData.images){
					data.append('images',this.userData.images[i])
				}
				this.$http.all([
					this.$http({
						method:'POST',
						url: INTERFACE.POST_USER_IMAGE,
						data: data,
						headers: {
	              'Content-Type': 'application/x-www-form-urlencoded'
	            }
					}),
					this.$http({
						method:'POST',
						url: INTERFACE.POST_USER2DEVICES,
						data: devices,
						headers: {
	              'Content-Type': 'application/x-www-form-urlencoded'
	            }
					}),
				])
				.then(this.$http.spread((user,device)=>{
					if(user.data.status===200){
						this.$Message.success('创建用户'+user.data.message)
						this.$emit('update')
						this.$emit('changePop','0')
					}else{
						this.$Message.error(user.data.message)
					}
					if(device.data.status===200){
						this.$Message.success('设备信息'+user.data.message)
						this.$emit('update')
						this.$emit('changePop','0')
					}else{
						this.$Message.error(user.data.message)
					}
				}))
				.catch((error)=>{
					console.log(error)
				})
			},
			edit(data,devices){
				console.log(data)
				// devices.append('personId',this.userData.personId)
				// devices.append('personId',this.userData.personId)
				// data.append('personId',this.userData.personId)
				console.log(this.$http.__proto__)
				this.$http.all([
					this.$http({
						method:'POST',
						url: INTERFACE.PUT_USER,
						data: data,
						headers: {
	              'Content-Type': 'application/x-www-form-urlencoded'
	            }
					}),
					this.$http({
						method:'POST',
						url: INTERFACE.POST_USER2DEVICES,
						data: devices,
						headers: {
	              'Content-Type': 'application/x-www-form-urlencoded'
	            }
					})
				])
				.then(this.$http.spread((user,device)=>{
					console.log(user.data)
					console.log(device.data)
					if(user.data.status===200){
						this.$Message.success('用户信息'+user.data.message)
						// this.$emit('update')
						// this.$emit('changePop','0')
					}else{
						this.$Message.error(user.data.message)
					}
					if(device.data.status===200){
						this.$Message.success('设备信息'+user.data.message)
						this.$emit('update')
						this.$emit('changePop','0')
					}else{
						this.$Message.error(user.data.message)
					}
				}))
				.catch((error)=>{
					console.log(error)
				})
				// (user,device)=>{
					// console.log(user)
					// if(user.data.status===200){
					// 	this.$Message.success(user.data.message)
					// 	this.$emit('update')
					// 	this.$emit('changePop','0')
					// }else{
					// 	this.$Message.error(user.data.message)
					// }
				// }
				// .catch((error)=>{
				// 	console.log(error)
				// })
			},
			// 提交
			push(){
				let data = new FormData()
				data.append('customName',this.$store.state.userInfo.customName)
				data.append('vip',this.userData.vip)
				data.append('userName',this.userData.userName)
				data.append('sex',this.userData.sex)
				data.append('headImage',this.userData.headImage)
				data.append('birthday',this.userData.birthday)
				data.append('personId',this.userData.personId)
				let devices = new FormData()
				devices.append('customName',this.$store.state.userInfo.customName)
				devices.append('personId',this.userData.personId)

				for(let i in this.checked){
					devices.append('deviceIds',this.checked[i])
				}
				console.log(this.userData)
				if(this.userData.editType ==='新建'){
					this.addNew(data,devices)
				}else if(this.userData.editType ==='编辑'){
					console.log('edit')
					this.edit(data,devices)
				}
			}
		},
		watch: {
			//弹窗状态
			popState(val,old){
				if(val === 'chooseDevice'){
					this.deviceList = this.$store.state.deviceInfo
					console.log(this.userData)
					// console.log(this.editType)
				}
			},
			checkAll(val,old){
				if(val){
					for(let i in this.deviceList){
						console.log(this.deviceList[i])
						this.checked.push(this.deviceList[i].deviceId)
					}
				}else{
					this.checked.length = 0
				}
			},
			userData(val,old){
				console.log(val)
			}
		},
		created(){		
			console.log(this.$store.state.deviceInfo)//创建时候请求是空数组
		}
	}
</script>
<style lang="scss" scoped>
	#chooseDevice{
		width:50%;
		min-width: 300px;
		height:200px;
		position: absolute;
		top: 50%;
		left:50%;
		>div{
			width:100%;
			height: 100%;
			position:relative;
			left: -50%;
			top:-50%;
			background-color:white;
			border:1px solid black;
			z-index: 100;
			text-align: left;
			>header{
				border-bottom:1px solid black;
				padding: 1em;
			}
			>article{
				padding:2em;
				>div{
					>ul{
						li{
							display:inline-block;
							list-style-type: none;
							margin: 0 5px;
						}
					}
				}
			}
		}

	}
</style>