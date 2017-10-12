/**
 * 2017.04.26
 */
// "use strict";//这里不用严格模式（返回计时器）
var value = 0;
var visitList=angular.module('visitList', ["ui.bootstrap"]);
visitList.controller('visitListControl', function($scope,$http,$log){

	$("[name='viewType-checkbox']").each(function(index){
		console.log(index+1)
		$(this).bootstrapSwitch({
			onText:"时间",  
	        offText:"频率",  
	        // onColor:"success",  
	        onColor:"info",
	        offColor:"info",  
	        size:"small",  
	        onSwitchChange:function(event,state){  
	            if(state==true){  
	                $(this).val("time");
	                console.log(today);
	                console.log($(this).parents('span').siblings().find('select').val());

	               	$scope.getPersonList(index+1,0);
	            }else{  
	                $(this).val("frequency"); 
	                console.log(today);
	                $scope.personReach(index+1,0)
	                console.log($(this).parents('span').siblings().find('select').val()); 
	            }  
	        }  
		});
	})
	//点击首页刷新一次页面
	$('.nav-tabs>li').eq(0).on('click',function(){
		window.location.reload()
	});
	//firstPage下拉选框触发事件
	$('#dateList').on('change',function(){
		value = $(this).val();
		$('#dateList option[value='+value+']').attr('selected','selected').siblings().removeAttr('selected');
		console.log($(this).val());
		today =new Date(today).getTime();
		switch($(this).val()){
			case '0':
				startTime=today;
				firstPage(startTime);
				break;
			case '1':
				startTime=yesterDay;
				endTime=today;
				firstPage(startTime,endTime);
				break;
			case '7':
				// alert('7');
				startTime=withInWeek;
				firstPage(startTime);
				break;
			case '30':
				// alert('30');
				startTime=withInMonth;
				firstPage(startTime);
				console.log(startTime)
				break;
		}
		$('#dateList4 option[value='+value+']').attr({selected:'selected'}).siblings().removeAttr("selected")
	})

	$('#dateList1').on('change',function(){
		console.log($(this).val());
		console.log($(this).parent().siblings().find('input').val());
		today=new Date(today).getTime();
		switch($(this).val()){
			case '0':
				// alert('0')
				// TODO BUG endtime覆盖
				startTime=today;
				endTime=new Date().getTime();
				console.log(startTime);
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(1,0);
				}else{
					$scope.personReach(1,0)
				}
				
				break;
			case '1':
				// alert('1');
				startTime=yesterDay;
				endTime=today;
				console.log(startTime)
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(1,0);
				}else{
					$scope.personReach(1,0)
				}
				break;
			case '7':
				// alert('7');
				startTime=withInWeek;
				endTime=new Date().getTime();
				console.log(startTime)
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(1,0);
				}else{
					$scope.personReach(1,0)
				}
				break;
			case '30':
				// alert('30');
				startTime=withInMonth;
				endTime=new Date().getTime();
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(1,0);
				}else{
					$scope.personReach(1,0)
				}
				console.log(startTime)
				break;
		}
	})

	$('#dateList2').on('change',function(){
		today=new Date(today).getTime();
		console.log($(this).val());
		switch($(this).val()){
			case '0':
				startTime=today;
				endTime=new Date().getTime();
				console.log(startTime);
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(2,0);
				}else{
					$scope.personReach(2,0)
				}
				break;

			case '1':
				// alert('1');
				startTime=yesterDay;
				endTime=today;
				console.log(startTime)
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(2,0);
				}else{
					$scope.personReach(2,0)
				}
				break;
			case '7':
				// alert('7');
				startTime=withInWeek;
				endTime=new Date().getTime();
				console.log(startTime)
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(2,0);
				}else{
					$scope.personReach(2,0)
				}
				break;
			case '30':
				// alert('30');
				startTime=withInMonth;
				endTime=new Date().getTime();
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(2,0);
				}else{
					$scope.personReach(2,0)
				}
				console.log(startTime)
				break;
		}
	})

	$('#dateList3').on('change',function(){
		today=new Date(today).getTime();
		console.log($(this).val());
		switch($(this).val()){
			case '0':
				startTime=today;
				endTime=new Date().getTime();
				console.log(startTime);
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(3,0);
				}else{
					$scope.personReach(3,0)
				}
				break;

			case '1':
				// alert('1');
				startTime=yesterDay;
				endTime=today;
				console.log(startTime)
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(3,0);
				}else{
					$scope.personReach(3,0)
				}
				break;
			case '7':
				// alert('7');
				startTime=withInWeek;
				endTime=new Date().getTime();
				console.log(startTime)
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(3,0);
				}else{
					$scope.personReach(3,0)
				}
				break;
			case '30':
				// alert('30');
				startTime=withInMonth;
				endTime=new Date().getTime();
				// 判断数据查看方式
				if ($(this).parent().siblings().find('input').val()=='time') {
					$scope.getPersonList(3,0);
				}else{
					$scope.personReach(3,0)
				}
				console.log(startTime)
				break;
		}
	})

	$('#dateList4').on('change',function(){
		value = $(this).val();
		console.log($(this).val());
		today =new Date(today).getTime();
		console.log(yesterDay);
		console.log(today);
		console.log($scope.detailHead.fkPerson);
		var fkPerson=$scope.detailHead.fkPerson;
		var personType=$scope.detailHead.personType;
		switch($(this).val()){
			case '0':
				startTime=today;
				endTime=new Date().getTime();
				$scope.viewDetails(fkPerson,personType,0,4)
				break;
			case '1':
				startTime=yesterDay;
				endTime=today;
				$scope.viewDetails(fkPerson,personType,0,4)
				break;
			case '7':
				startTime=withInWeek;
				endTime=new Date().getTime();
				$scope.viewDetails(fkPerson,personType,0,4)
				break;
			case '30':
				startTime=withInMonth;
				endTime=new Date().getTime();
				$scope.viewDetails(fkPerson,personType,0,4)
				console.log(startTime)
				break;
		}
	})

	$('#dateList4').on('change',function(){
		today=new Date(today).getTime();
		switch($(this).val()){
			case '0':
				startTime=today;
				endTime=new Date().getTime();
				console.log(startTime);
				$scope.getPersonList($scope.detailHead.personType,0);
				break;
//			case '今日 ('+new Date(today).getFullYear()+'/'+(new Date(today).getMonth()+1)+'/'+new Date(today).getDate()+')':
//				console.log(today)
//				startTime=today;
//				endTime=new Date().getTime();
//				console.log(startTime);
//				$scope.getPersonList(4,0);
//				break;
			case '1':
				// alert('1');
				startTime=yesterDay;
				endTime=today;
				console.log(startTime)
				$scope.getPersonList($scope.detailHead.personType,0);
				break;
			case '7':
				// alert('7');
				startTime=withInWeek;
				endTime=new Date().getTime();
				console.log(startTime)
				$scope.getPersonList($scope.detailHead.personType,0);
				break;
			case '30':
				// alert('30');
				startTime=withInMonth;
				endTime=new Date().getTime();
				$scope.getPersonList($scope.detailHead.personType,0);
				console.log(startTime)
				break;
		}
	})


	$scope.maxSize = 5;//设置当前显示的页数
	// alert('111')
	// $scope.currentPage=1;
	/*
	*	页面初始化加载
	 */
	var modifiedPersonType;//修改之后的person类型

	/**********************事件监听列表**********************/
	/*
	*	1：按时间查看来访列表选项
	*	2：visitItem表头查看详情选项
	* 	3:details详情页，修改person类型事件
	* 	
	*	
	 */
	// 1.按日期查看按钮的监听事件
	// document.getElementById('dateList').addEventListener('change',function(){
	// 	console.log($(this));
	// 	var startTime=$(this).val()+' 00:00:00';
	// 	var endTime=$(this).val()+' 24:00:00';
	// 	startTime = startTime.replace(new RegExp("-","gm"),"/");//斜杠替换横杠
	// 	endTime = endTime.replace(new RegExp("-","gm"),"/");
	// 	// console.log($(this).valueAsDate=new Date());
		
	// 	console.log(new Date(startTime).getTime());
	// 	console.log(new Date(endTime).getTime());
	// 	/*
	// 	* @Author:ljw
	// 	* @date: 2017.04.26 20:53
	// 	* @description:默认情况下，时间为当前日期，获取的时间条件需要修改
	// 	*/
	// 	alert('开始时间：'+new Date(startTime).getTime()+';结束时间：'+new Date(endTime).getTime())

	// },false)

	// 2.visitItem表头查看详情选项--住客、陌生人、黑名单的详情按钮监听事件（图标->）
	// $('.visitItem .listHead>p>span:last-child').on('click',getmessageDetails)

	/**********************事件监听列表**********************/
	//3.修改person类型的下拉菜单
	//
	$('.detailsModel .detailHead .dropdown li a').on('click',function(){
		var icon='<span class="caret"></span>';//下拉图标
		//需要用到这一条|
		modifiedPersonType=($(this).attr('type'));//修改后的person类型
		console.log(modifiedPersonType)
		var btnValue=$(this).text()+icon;//修改后的菜单显示项
		$(this).parents('.dropdown').find('button').html(btnValue);//替换
		
	})
	
	//4.修改用户类型后，确认
	$('#btnModifiy').on('click',function(){
		/**
		 * 需要考虑，用户在没有做修改下的误操作，点击确定（判断退回？不做反应）
		 */
		// console.log($(this).parent()
		console.log($(this));
		console.log(modifiedPersonType);
		var fkPerson=$(this).attr('title');
		var personType=$(this).attr('type');
		var value=modifiedPersonType;//if not undefind
		if (!value) {
			alert('无效操作');
			return
		}
		// else if(){

		// }
		console.log(fkPerson);
		console.log("personType:"+value);
		//修改person类型上传
		$.post(HOST+'lowRentHouse/personManage/updatePersonType',{
			userkey:userkey,
			fkPerson:fkPerson,
			personType:modifiedPersonType
		},function(response){
			// $('.tab-pane').eq(personType).css('display','block');
			$('.tab-pane').eq(personType).slideDown(100);
			$('#detailBox').css('display','none');
			alert('修改成功');
			$scope.getPersonList(personType,0);

		})

	})


/***************************************************$scope数据以及方法******************************************************/


	//数据初始化加载
	$scope.load=function(){
		// $('article .tab-pane').css('opacity','0')
		getCanvasData();//获取数据绘图
		firstPage(startTime);//首页下边表格
	}

	//初始化来访列表详情页的数据请求
	function firstPage(startTime,endTime){
		// endTime=new Date().getTime();
		$http({
			method: 'GET',
			//接口：firstpage
			/**
			 * @Author    liujianwen
			 * @DateTime  2017-04-26
			 * @remarks	 [visitItem详情请求输出]
			 * @param     {[string]}    	fkperson	[facetrackPerson de 标识]
			 * @param     {[string]}    	userkey		
			 * @param     {[Number]}    	startTime	[开始时间]
			 * @param     {[Number]}    	pagesize	[返回数据的条数]
			 * @return    {[type]}                [description]
			 */
			url: HOST+"lowRentHouse/lowRentHouse/firstPage",
			params:{
				'fkDeviceId':fkDeviceId,
				'userkey':userkey,
				'startTime':startTime,
				'endTime':endTime || new Date().getTime(),
				'pageSize':5	
			}
			
		}).then(function successCallback(response) {
				//预期返回值

				var res=response.data.results.firstPageDto;
				console.log(res);
				//判断之前是否获取过，如果对象类型不是undefined并且总数不为0
				if (typeof $scope.householdVisit !='undefined'&&$scope.householdVisit.total!=0) {
					console.log($scope.householdVisit)
					$scope.householdVisit.personMatchCountsList.splice(0,$scope.householdVisit.personMatchCountsList.length);
					console.log($scope.householdVisit)
				}
				if (typeof $scope.stranger !='undefined'&&$scope.stranger.total!=0) {
					console.log($scope.stranger.personMatchCountsList);
					$scope.stranger.personMatchCountsList.splice(0,$scope.stranger.personMatchCountsList.length)
					// $scope.stranger.personMatchCountsList.splice(0,$scope.stranger.length);
				}
				if (typeof $scope.blackList !='undefined'&&$scope.blackList.total!=0) {
					// $scope.blackList.personMatchCountsList!=null
					console.log($scope.blackList)
					$scope.blackList.personMatchCountsList.splice(0,$scope.blackList.personMatchCountsList.length);
				}
				$scope.householdVisit=res.renter;//住客
				$scope.stranger=res.stranger;//陌生人
				$scope.blackList=res.blackList;//黑名单
				// console.log($scope.householdVisit);
				// console.log($scope.stranger);
				// console.log(res.blackList.personMatchCountsList.length);
				// if (res.blackList.personMatchCountsList.length<5) {
				// 	var personMatchCountsList=[];
				// 	var option={
				// 		matchCounts:" "
				// 	}
				// 	for(var i=0;i<5;i++){
				// 		personMatchCountsList[i]=option;
				// 	}
				// 	$scope.blackList={
				// 		personMatchCountsList:personMatchCountsList
				// 	}
				// }
				// console.log($scope.blackList);
				// $scope.blackList=
			}, function errorCallback(error) {
				// 请求失败执行代码
				console.log(error)
				
		});	
	}

	//详情列表
	$scope.viewDetails=function(fkPerson,personType,currentIndex,fromIndex){
		stopClick();
		console.log($('#dateList').val());
		// alert("viewDetails中fkPerson的初始值："+fkPerson);
		// var fkPerson=fkPerson;
		/**
		 * @Author    liujianwen
		 * @DateTime  2017-04-27
		 * @remarks	 [列表详情下单条数据查看]
		 * @param     {[person标识]}      fkperson [选中人物标识]
		 * @param     {[viewtype]}  显示方式（时间、频率）
		 * @return    {[type]}               [description]
		 */
		
		//隐藏列表页，显示详情页
		//

		// $('.tab-pane').css('display','none');
		$('.tab-pane').each(function(){
			$(this).removeClass('active')//隐藏tabpanel
		})
		$('.tab-pane').css('display','none');

		//获取弹出层高度赋给article（由于弹出层abslote,所以article高度不会自适应
		var detailHeight=$('#detailBox').height();
		// alert(detailHeight)
		$('article').css('height',detailHeight+50);
		// $('#detailBox').css('display','block');
		$('#detailBox').slideDown(500);
		/************************DOM操作结束*********************************/
		console.log($('article').height());
		console.log(fkPerson);
		$('.nav-tabs>li>a').on('click',function(){
			// console.log($(this).attr('href'));
			var goTo=$(this).attr('href');
			$('#detailBox').css('display','none')
			// $(goTo).css('display','block');
			$(goTo).slideDown(500);
			$(goTo).siblings().css('display','none')
		})

		// 详情页上半部分数据请求
		$http({
			method:'GET',
			url:HOST+"lowRentHouse/lowRentHouse/getPersonInfo",
			/**
			 * fkperson
			 * userkey
			 */
			// context:$(''),
			params:{
				'fkPerson':fkPerson,
				'userkey':userkey
			}
		}).then(function successCallback(response) {
				//预期返回值
				console.log(response);
				// $scope
				$scope.detailHead={
					'img':response.data.results.personInfoDto.headImage,
					'personType':response.data.results.personInfoDto.personType,
					'fkPerson':response.data.results.personInfoDto.fkPerson
				}

				console.log($scope.detailHead.personType);
				//TODO
				//数据已经判断过了，写法没问题，数据有问题

				//根据返回值修改下拉菜单的显示选项
				if ($scope.detailHead.personType==1) {
					$('.detailHead .dropdown button').html('住客'+'<span class="caret"></span>')
				}else if ($scope.detailHead.personType==2) {
					$('.detailHead .dropdown button').html('陌生人'+'<span class="caret"></span>')
				}else if ($scope.detailHead.personType==3) {
					$('.detailHead .dropdown button').html('黑名单'+'<span class="caret"></span>')
				}

			}, function errorCallback(error) {
				// 请求失败执行代码
				console.log(error)
				
		}).then(startClick);	
		console.log(startTime+','+endTime);
		// var currentPage=currentIndex || 0;
		//详情页下半部分数据请求
		$http({
			method:'GET',
			url:HOST+"lowRentHouse/lowRentHouse/personDetails",
			contentType:'json',
			//TODO
			/**
			 * 	(获取cookie)
			 * @userkey 登陆用户
			 * @deviceId 设备id
			 * @pageSize 数据总条数，除以每页显示数据量得到页数
			 * 	(获取全局变量currentNum)
			 * @currentIndex 当前页码	
			 * （获取页面input的value）
			 * startTime 开始时间
			 * endTime 结束时间
			 * （函数传值【attr persontype】）
			 * personType person类型（住客、陌生人、黑名单）
			 *  (函数传值【attr fkPerson】)
			 * fkperson person标识
			 */
			//
			params:{
				'userkey':userkey,
				'fkDeviceId':fkDeviceId,
				'pageSize':16,
				'currentIndex':currentIndex || 0,
				'startTime':startTime,
				'endTime':endTime,
				// 'personType':personType,
				// 'fkPerson':fkPerson
				// 适应数据所做修改
				'personType':personType,
				'fkPerson':fkPerson
			}
		}).then(function successCallback(response) {
				//预期返回值
				console.log(response);
				console.log(personType+'personType');
				console.log(fromIndex);
				$scope.detailPersonType=personType;
				console.log($scope.detailPersonType+'+606line')
				// $('#detailBox .contentBox .closeDetail').attr('title',personType);
				if (typeof fromIndex!="undefined") {
					if (fromIndex==0) {
						//判断是否为主页进入的详情
						$scope.detailPersonType=0;
						$('#detailBox .contentBox .closeDetail').attr('title',0);
						var value=$('#dateList').val();
						$('#dateList4 option[value='+value+']').attr({selected:'selected'}).siblings().removeAttr("selected")
					}
				}
				
				
				// var response=JSON.stringify(response);
				 if (response.data.msg!="SUCC") {
				 	alert('chaxunwuxiao');
					console.log('没有查询结果')
					return
				}
				// $('#detailBox .contentBox').on('click','.close',function(){
				// 	alert(personType)
				// })
				
				console.log($scope.currentPage);
				console.log(response.data.results.batchPersonDetailDto.currentIndex);//当前页
				// $scope.currentPage=response.data.results.batchPersonDetailDto.currentIndex+1;
				// alert('获取数据之后当前页：'+$scope.currentPage)
				// var totalPage=Math.ceil(response.data.results.batchPersonDetailDto.totalNum/16);
				$scope.totalPage=Math.ceil(response.data.results.batchPersonDetailDto.totalNum/16);//总页数
				// alert(personType)
				console.log('person类型'+personType)
				// console.log("当前为第"+currentIndex+"页，总页数为"+totalPage);
				// currentNum=response.data.results.batchPersonDetailDto.currentIndex;
				// totalNum=Math.ceil(response.data.results.batchPersonDetailDto.totalNum/10);
				// alert(currentNum)
				// console.log($('#modelContent .detailFoot>div>ul').attr('ng-model'));
				// $('#modelContent .detailFoot>div>ul').attr('last-text',totalPage);
				// console.log($('#modelContent .detailFoot>div>ul').attr('last-text'));
				// 获取到的数组
				$scope.detailBox=response.data.results.batchPersonDetailDto.personDetailList;
				console.log($scope.detailBox)
    			$scope.bigTotalItems = $scope.totalPage*10;//设置总页数
    			// $scope.currentPage=currentPage;
    			// $scope.setPage = function (pageNo) {
    			// 	alert('change')
		     //    	$scope.currentPage = pageNo;
		    	// };

			    $scope.pageChanged = function() {
			        $log.log('Page changed to: ' + $scope.currentPage);
			    };
			 //   
				
				 // alert($scope.currentPage)
				 $scope.detailFlip=function(){
				 	// alert(fkPerson+','+$scope.currentPage)
				 	$http({
		        			method:'GET',
		        			url:HOST+"lowRentHouse/lowRentHouse/personDetails",
							contentType:'json',
							params:{
							'userkey':userkey,
							'fkDeviceId':fkDeviceId,
							'pageSize':16,
							'currentIndex':$scope.currentPage-1 || 0,
							'startTime':startTime,
							'endTime':endTime,
							// 'personType':personType,
							// 'fkPerson':fkPerson
							// 适应数据所做修改
							'personType':personType,
							'fkPerson':fkPerson
						}
		        		}).then(function succ(response){
		        			$scope.detailBox=response.data.results.batchPersonDetailDto.personDetailList
		        			console.log($scope.detailBox);
		        			
		        		}, function(error){
		        			console.log(error);
		        		})
					 }
	 			// var watch = $scope.$watch('currentPage',function(newValue,oldValue, scope){
	 			// 		//脏值检查重复请求
			  //   		// alert()
		   //      		console.log('当前页'+newValue);
		   //      		console.log('上一页'+oldValue);
		   //      		if (newValue<=0) {
		   //      			return
		   //      		}
		   //      		alert("脏检查fkPerson值"+fkPerson);
		   //      		$http({
		   //      			method:'GET',
		   //      			url:HOST+"lowRentHouse/lowRentHouse/personDetails",
					// 		contentType:'json',
					// 		params:{
					// 		'userkey':userkey,
					// 		'fkDeviceId':fkDeviceId,
					// 		'pageSize':16,
					// 		'currentIndex':newValue-1 || 0,
					// 		'startTime':startTime,
					// 		'endTime':endTime,
					// 		// 'personType':personType,
					// 		// 'fkPerson':fkPerson
					// 		// 适应数据所做修改
					// 		'personType':personType,
					// 		'fkPerson':fkPerson
					// 	}
		   //      		}).then(function succ(response){
		   //      			$scope.detailBox=response.data.results.batchPersonDetailDto.personDetailList
		   //      			console.log($scope.detailBox);
		        			
		   //      		}, function(error){
		   //      			console.log(error);
		   //      		})

					// });

			}, function errorCallback(error) {
				// 请求失败执行代码
				console.log(error)
				
		});	
	}
	
	//住客、陌生人、黑名单列表
	$scope.getPersonList=function(personType,currentIndex){
		stopClick();
			console.log('ready :getpersonList函数'+personType);
			$('.tab-pane').eq(personType).find('input').attr('disabled','disabled');
			console.log($('.tab-pane').eq(personType).find('input').attr('id'));
			// endTime=new Date().getTime();//starttime重新赋值
			// startTime=today;
			
			var pageSize=20;
			$http({
				method:'GET',
				url:HOST+"lowRentHouse/lowRentHouse/personDetails",
				params:{
					'userkey':userkey,
					'fkDeviceId':fkDeviceId,
					'pageSize':pageSize,
					'currentIndex':currentIndex || 0,
					'startTime':startTime,
					'endTime':endTime,
					// 'personType':personType,
					// 'fkPerson':fkPerson
					// 适应数据所做修改
					'personType':personType
				}

			}).then(function successCallback(response) {
				//预期返回值
				console.log(personType);
				console.log(startTime)
				console.log(response);
				
				// alert('type'+personType);
				// $('.tab-pane').eq(personType).css('display','block');
				$('.tab-pane').eq(personType).slideDown(500);
				$('.tab-pane').eq(personType).siblings('.tab-pane').css('display','none');
				//隐藏查看频率列表，显示查看时间列表
				// $('.tab-pane .contentBox>.timeView').css('display','block');
				$('.tab-pane .contentBox>.timeView').slideDown(500);
				$('.tab-pane .contentBox>.frequencyView').css('display','none');
				//分页列表组
				$('.tab-pane').eq(personType).find('.pagination-sm').eq(0).css('display','inline-block');
				$('.tab-pane').eq(personType).find('.pagination-sm').eq(1).css('display','none');
				$('.tab-pane').eq(personType).find('timeView').css('display','inline-block');
				$('.tab-pane').eq(personType).find('frequencyView').css('display','none');
		    	// $('.tab-pane .contentBox .foot>ul').eq(1).css('display','none');
		    	// $('.tab-pane .contentBox .foot>ul').eq(0).css('display','inline-block');
		    	$('.tab-pane .bootstrap-switch-small').removeClass('bootstrap-switch-off');
		    	//时间开关样式
		    	$('.tab-pane .bootstrap-switch-small').addClass('bootstrap-switch-on');
		    	$('.tab-pane .bootstrap-switch-small .bootstrap-switch-container').css('margin-left','0');
		    	$('.tab-pane .bootstrap-switch-small .bootstrap-switch-container input').val('time');

		    	//scope中的对应的数据不为空，先清空再赋值
		    	if (typeof $scope.visitListBox1 != 'undefined') {
		    			$scope.visitListBox1.personDetailList.splice(0,$scope.visitListBox1.personDetailList.length);
		    		}
	    		if (typeof $scope.visitListBox2 != 'undefined') {
		    			$scope.visitListBox2.personDetailList.splice(0,$scope.visitListBox2.personDetailList.length);
		    		}
				if (typeof $scope.visitListBox3 != 'undefined') {
		    			$scope.visitListBox3.personDetailList.splice(0,$scope.visitListBox3.personDetailList.length);
		    		}


		    	if(response.data.msg!="SUCC"){
		    		//获取数据失败，返回
		    		// alert(response.data.msg);
		    		// window.location.reload()    		
					return
				}
				var totalNum=0;
				//分页变量赋值
				if (personType==1) {
					$scope.visitListBox1=response.data.results.batchPersonDetailDto;
					totalNum=Math.ceil($scope.visitListBox1.totalNum/pageSize) ||0;
					$scope.currentPage1=$scope.visitListBox1.currentIndex+1;//当前页码
					$scope.totalPage1=totalNum*10;//*10算出总页码数
					$scope.setPage = function (pageNo) {
			        	$scope.currentPage1 = pageNo;
			        	// alert(pageNo)
			    	};
				}else if (personType==2) {
					$scope.visitListBox2=response.data.results.batchPersonDetailDto;
					totalNum=Math.ceil($scope.visitListBox2.totalNum/pageSize);
					$scope.currentPage2=$scope.visitListBox2.currentIndex;//当前页码
					$scope.totalPage2=totalNum*10;//*10算出总页码数
					$scope.setPage = function (pageNo) {
			        	$scope.currentPage2 = pageNo;
			        	// alert(pageNo)
			    	};
				}else if (personType==3) {
					$scope.visitListBox3=response.data.results.batchPersonDetailDto;
					totalNum=Math.ceil($scope.visitListBox3.totalNum/pageSize);
					$scope.currentPage3=$scope.visitListBox3.currentIndex;//当前页码
					$scope.totalPage3=totalNum*10;//*10算出总页码数
					$scope.setPage = function (pageNo) {
			        	$scope.currentPage3 = pageNo;
			        	// alert(pageNo)
			    	};
				}else{
					console.log('person类型出错');
				}
				console.log(totalNum);
				//检查器列表（住客、陌生人、黑名单currentPage监测）
				var watch1=$scope.$watch('currentPage1',function(newValue,oldValue,scope){
					if (typeof newValue =='undefined') {
						return
					}
					bibi(1,oldValue,newValue)
				})
				var watch2=$scope.$watch('currentPage2',function(newValue,oldValue,scope){
					
					if (typeof newValue =='undefined') {
						return
					}
					bibi(2,oldValue,newValue)
				})
				var watch3=$scope.$watch('currentPage3',function(newValue,oldValue,scope){
					if (typeof newValue =='undefined') {
						return
					}
					bibi(3,oldValue,newValue)
				})
				//currentPage值触发脏检查的函数
				function bibi(personType,oldValue,newValue){
					stopClick();
					if (newValue<=0 || oldValue==newValue) {
		        			return
		        		}
					$http({
						method:'GET',
						url:HOST+"lowRentHouse/lowRentHouse/personDetails",
						params:{
							'userkey':userkey,
							'fkDeviceId':fkDeviceId,
							'pageSize':20,
							'currentIndex':newValue-1,
							'startTime':startTime,
							'endTime':endTime,
							'personType':personType
							// 'fkPerson':fkPerson
							// 适应数据所做修改
							// 'personType':1
						}
					}).then(function succ(response){
						console.log(response);

						// $('.tab-pane .contentBox>.timeView').css('display','block');
						$('.tab-pane .contentBox>.timeView').slideDown(500);
						$('.tab-pane .contentBox>.frequencyView').css('display','none');
						$('.tab-pane .contentBox .visitHead button').eq(1).css('display','none');
						$('.tab-pane .contentBox .visitHead button').eq(0).css('display','inline-block');
						//分页列表组
				    	$('.tab-pane .contentBox .foot>ul').eq(1).css('display','none');
				    	$('.tab-pane .contentBox .foot>ul').eq(0).css('display','inline-block');
				    	$('.tab-pane .bootstrap-switch-small .bootstrap-switch-container input').val('time');

						
						if (personType==1) {
							$scope.visitListBox1=response.data.results.batchPersonDetailDto;
						}else if (personType==2) {
							$scope.visitListBox2=response.data.results.batchPersonDetailDto;
						}else if (personType==3) {
							$scope.visitListBox3=response.data.results.batchPersonDetailDto;
						}else{
							console.log('person类型出错');
						}
					}, function error(){
						console.log(error);
					}).then(startClick)
				}
			}, function errorCallback(error) {
				// 请求失败执行代码
				console.log(error)			
			}).then(startClick);	
	}	
	//住客、陌生人、黑名单列表(按照频率查看)参数跟personlist差不多
	$scope.personReach=function(personType,currentIndex){
		stopClick();
		// $('tab-pane.active .contentBox .visitHead button').html('按照日期查看')；
		// $('.tab-pane').each(function(){
		// 	// console.log($(this));
		// 	if ($(this).hasClass('active')) {
		// 		var activePane='#'+$(this).attr('id');
		// 		console.log($(activePane+' .contentBox .visitHead button'));
		// 	}
		// })
		//同步标题栏	
		$('.nav-tabs>li').eq(personType).addClass('active');
		$('.nav-tabs>li').eq(personType).siblings().removeClass('active')
		//隐藏查看时间列表，显示查看频率列表
		$('.tab-pane .contentBox>.timeView').css('display','none');
		// $('.tab-pane .contentBox>.frequencyView').css('display','block');
		$('.tab-pane .contentBox>.frequencyView').slideDown(500);
		//分页列表组
		$('.tab-pane').eq(personType).find('.pagination-sm').eq(1).css('display','inline-block');
		$('.tab-pane').eq(personType).find('.pagination-sm').eq(0).css('display','none');
		$('.tab-pane').eq(personType).find('.timeView').css('display','none');
		$('.tab-pane').eq(personType).find('.frequencyView').css('display','inline-block');
    	// $('.tab-pane .contentBox>.foot>ul').eq(0).css('display','none');
    	// $('.tab-pane .contentBox>.foot>ul').eq(1).css('display','inline-block');
    	$('.tab-pane .bootstrap-switch-small .bootstrap-switch-container input').val('frequency');
    	setTimeout(function(){
		$('.tab-pane .visitHead .bootstrap-switch-on .bootstrap-switch-container').css('margin-left','-44px')
	},50)
		
		//判断是否重新请求
		// console.log($scope.load_personReachList);
		// if (typeof $scope.load_personReachList!="undefined") {
		// 	console.log($scope.load_personReachList.personType==personType);
		// 	// console.log(personType);
		// 	if ($scope.load_personReachList.personType==personType&$scope.load_personReachList.currentPage==currentIndex) {
		// 		alert('1');
		// 		return
		// 	}
		// 	// if ($scope.load_personReachList.personType==personType&&$scope.load_personReachList.currentPage=currentIndex) {
		// 	// 	startClick();
		// 	// 	return
		// 	// }
		// }
		// $scope.load_personReachList={
		// 	personType:personType,
		// 	currentPage:currentIndex
		// }

		
		// $('.tab-pane.active .contentBox>.visitHead button').html('按日期查看');
		// $('.tab-pane').eq(personType).css('display','block');
		$('.tab-pane').eq(personType).slideDown(500);
		$('.tab-pane').eq(personType).siblings().css('display','none');
		var pageSize=20;
		console.log('ready 安频率查看'+currentIndex);
		$http({
			method:'GET',
			url:HOST+"lowRentHouse/lowRentHouse/personReach",
			params:{
				'userkey':userkey,
				'fkDeviceId':fkDeviceId,
				'pageSize':pageSize,
				'currentIndex':currentIndex,
				'startTime':startTime,
				'endTime':endTime,
				'personType':personType,
			}
		}).then(function succ(response){
			console.log(response.data.results.batchPersonCountingDto);
			if (response.data.msg!="SUCC") {
				alert('查询数据无效');
				return 
			}
			var totalNum;
			if (personType==1) {
				$scope.detailFrequency1=response.data.results.batchPersonCountingDto;
				totalNum=Math.ceil($scope.detailFrequency1.totalNum/pageSize);
				console.log(personType+'开始输出');
				$scope.currentPage11=$scope.detailFrequency1.currentIndex+1;//当前页码
				$scope.totalPage11=totalNum*10;//*10算出总页码数
				$scope.setPage = function (pageNo) {
		        	$scope.currentPage11 = pageNo;
		    	};
			}else if (personType==2) {
				$scope.detailFrequency2=response.data.results.batchPersonCountingDto;
				totalNum=Math.ceil($scope.detailFrequency2.totalNum/pageSize);
				console.log(personType+'开始输出');
				$scope.currentPage21=$scope.detailFrequency2.currentIndex+1;//当前页码
				$scope.totalPage21=totalNum*10;//*10算出总页码数
				$scope.setPage = function (pageNo) {
		        	$scope.currentPage21 = pageNo;
		        	// alert(pageNo)
		    	};
			}else if (personType==3) {
				$scope.detailFrequency3=response.data.results.batchPersonCountingDto;
				totalNum=Math.ceil($scope.detailFrequency3.totalNum/pageSize);
				console.log(personType+'开始输出');
				$scope.currentPage31=$scope.detailFrequency3.currentIndex+1;//当前页码
				$scope.totalPage31=totalNum*10;//*10算出总页码数
				$scope.setPage = function (pageNo) {
		        	$scope.currentPage31 = pageNo;
		        	// alert(pageNo)
		    	};
			}else{

				console.log('person类型出错');
			}

			//检查器列表（住客、陌生人、黑名单currentPage监测）
			var watch11=$scope.$watch('currentPage11',function(newValue,oldValue,scope){
				if (typeof newValue =='undefined') {
					return
				}
				console.log(newValue);
				console.log(oldValue);
				console.log('persontype'+personType);
				checkFrequencyCurr(1,oldValue,newValue);
			})
			var watch21=$scope.$watch('currentPage21',function(newValue,oldValue,scope){
				
				if (typeof newValue =='undefined') {
					return
				}
				console.log(newValue);
				console.log(oldValue);
				checkFrequencyCurr(2,oldValue,newValue);
			})
			var watch31=$scope.$watch('currentPage31',function(newValue,oldValue,scope){
				if (typeof newValue =='undefined') {
					return
				}
				console.log(newValue);
				console.log(oldValue);	
				checkFrequencyCurr(3,oldValue,newValue);
			})

				//按频率查看住客、陌生人、黑名单列表页的currentPage脏值检测
				function checkFrequencyCurr(personType,oldValue,newValue){
					stopClick();
					$('.tab-pane.active .bootstrap-switch-small .bootstrap-switch-container input').val('frequency');
					if (newValue<=0 ||oldValue==newValue) {
						return
					}
					console.log('ready 安频率差查看currentpage脏值检查 '+personType);
			        	$http({
			        		method:'GET',
							url:HOST+"lowRentHouse/lowRentHouse/personReach",
							params:{
								'userkey':userkey,
								'fkDeviceId':fkDeviceId,
								'pageSize':pageSize,
								'currentIndex':newValue-1,//当前页码-1，等于currentindex
								'startTime':startTime,
								'endTime':endTime,
								'personType':personType,
							}
			        	}).then(function succ(response){
			        		if(personType==1){
			        			$scope.detailFrequency1=response.data.results.batchPersonCountingDto;
			        		}else if(personType==2){
			        			$scope.detailFrequency2=response.data.results.batchPersonCountingDto;
			        		}else if(personType==3){
			        			$scope.detailFrequency3=response.data.results.batchPersonCountingDto;
			        		}else{
			        			console.log('查询数据无效');
			        		}
			        	}, function error(error){
			        		console.log(error);
			        	}).then(startClick)
				}	//checkFrequencyCurr函数结束
			//function succ结束
			}, function error(error){
			// $Log.warn(error);
			console.log(error);
		}).then(startClick)
	}
    /*****************页面弹出层******************/
    //显示gif的图层
    $scope.viewGif=function(arg){
    	$('#viewGif').css('visibility','visible');
    	// console.log(arg);
    	// if (arg.length<=1) {
    	// 	return
    	// }
    	$('#viewGif .body').html('');
    	for (var i = 0; i < arg.length; i++) {
    		var img=new Image();
    		img.src=arg[i];
    		$('#viewGif .body').append(img)
    	}
    	var num=0;//图片初始显示的下标
    	var cvs=document.getElementById('viewCanvas');
		return gifInterval=setInterval(function () {

			$('#viewGif .body img').eq(num).css('display','block');
			// $('#viewGif .body img').eq(num).slideDown(500);
			$('#viewGif .body img').eq(num).siblings().css('display','none')
			 num = ++num >= arg.length? 0 : num;
		},200)
    }
    //查看场景图
    $scope.viewScene=function(pic){
    	$('#scene').css('visibility','visible');
    	// console.log(pic)
    	$('#scene .content .body img').css('backgroundColor','rgba(0,0,0,0.7)')
    	$('#scene .content .body img').attr('src',pic);
    }
	//关闭显示动图图层
	$scope.closeScene=function(){
		$('#scene').css('visibility','hidden')
	}
	$scope.closeGif=function(){
		// alert('1')
		$('#viewGif').css('visibility','hidden');
		clearInterval(gifInterval)
	}

	//关闭详情页
	$scope.closeDetail=function(personType){
		console.log(personType);
		$scope.currentPage=0;//重置当前页码
		$scope.detailBox.length=0;//清空数组
		 	
		if (personType==1||personType==2 ||personType==3) {
			$('.tab-pane').eq(personType).addClass('active');
			// $('.tab-pane').eq(personType).css('display','block');
			$('.tab-pane').eq(personType).slideDown(500);
			$('.tab-pane').eq(personType).siblings().removeClass('active');
			$('#detailBox').css('display','none');
		}else if(personType==0){
			window.location.reload();
		}else{
			alert('error');
			window.location.reload();
		}
		
	}
	

})

