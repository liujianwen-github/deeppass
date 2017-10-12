var g_personID = ""; // 当前识别成功的personID 
var g_personTime = new Date().getTime(); // 识别出当前person的时间
var g_ICCardLen = 8; //IC卡，卡号长度
var g_personKeepTime = 10000; //人脸识别成功后保留时间(单位：毫秒)。 即：刷脸、刷卡允许间隔的最大时间。

//自动运行
$(document).ready(function(){
	MyAutoRun();
});


function MyAutoRun() {
	// 1. 查询刷脸信息
	setInterval(function () {
		QueryNewPerson();
	}, 1500); 
	
	// 2. 查询刷IC卡信息
	setInterval(function () {
		QueryICCard();
	}, 1500);
	
}
//刷脸
function QueryNewPerson() {
    var xhr = new XMLHttpRequest();  
	xhr.open("post", config.deepdotHost);  
	xhr.setRequestHeader("Content-Type", "application/json");
	var request = '{\"jsonrpc\":\"2.0\",\"method\":\"getunprocessedmatchedfacetrack",\"params\":{\"appkey\":\"' + config.appKey + '\", \"count\":1, \"matched_count\":3},\"id\":1}'; 
	xhr.onreadystatechange = function () {  
		if (xhr.readyState === 4) {    
			var strTmp = xhr.response;
			var obj = JSON.parse(strTmp);
			if (obj.result.code == 0)  //调用成功
			{
				if (obj.result.results.ids.length > 0)
				{
					var objDetail = obj.result.results.ids[0];  //只取第一个匹配的
					AckFacetrack(objDetail.id);  //汇报此facetrack已成功获取，部署时需取消此注释
					if(objDetail.matchs[0].percent >= config.matchscore) //如果超过匹配阀值
					{
						g_personID = objDetail.matchs[0].id_person;
						g_personTime = new Date().getTime();
						DealStep(1);
					}
				}
			}
        }  
    };  
    xhr.send(request);  
    return true;  
}

//读取IC 卡号
function QueryICCard()
{
	// IC 卡号输入到光标所在输入框，需要一定时间
	var str = document.getElementById('edt_ICCard').value;
	if (str.length >= g_ICCardLen)
	{
		document.getElementById('edt_ICCard').value = "";
		if (g_personID == "") //尚未通过面部识别
		{
			DealStep(0);
			return;
		}
		var strTmp = GetPersonIDByIC(str); //查找对应的person
		if(strTmp == g_personID) //刷卡和刷脸对应的同一个人
		{
			DealStep(3);
            if(objDetail.matchs[0].percent<=0.85)
            {
           	 	Addfacetracktoperson();
            }
		}
		else //刷脸和刷卡不匹配
		{
			DealStep(2);
		}
	}
}
//将facetrack图像导入person
function Addfacetracktoperson()
{
    var xhr = new XMLHttpRequest();  
	xhr.open("post", config.deepdotHost);  
	xhr.setRequestHeader("Content-Type", "application/json");
	var request = '{\"jsonrpc\":\"2.0\",\"method\":\"addfacetracktoperson",\"params\":{\"appkey\":\"' + config.appKey + '\", \"id_facetrack\":\"' + objDetail.id + '\",\"id_person\":\"' + objDetail.matchs[0].id_person + '},\"id\":1}';  
	send(request);
	return;
}


// 处理不同阶段的状况
function DealStep(step){
	if (step == 0) //正在识别中
	{	
		$('#shibie').html('正在识别中...');		
             
	}
	if (step == 1) //刷脸成功，等待刷卡
	{		
        $('#shibie').html('刷脸成功，等待刷卡');
               
	}
	if (step == 2) //刷脸成功，刷卡失败
	{		
		$('#shibie').html('刷脸成功,刷卡失败');
               
	}
	else if (step == 3) //刷脸成功，刷卡成功: 开门
	{       
        ShowPersonImage(g_personID);
		if (config.openDoor == '1') {
			$('#shibie').html('成功，开门！');
			OpenDoor();  //开门
		}
	}
}

//开门，5秒钟后关门
function OpenDoor() {
	//先声明一个异步请求对象
	var xmlHttpReg = null;
	if (window.ActiveXObject) {//如果是IE
		xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttpReg = new XMLHttpRequest(); //实例化一个xmlHttpReg
	}
	//如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
	if (xmlHttpReg != null) {
		var url = config.openDoorURL;  //此处IP需换成实际值(web项目test部署的IP)
		xmlHttpReg.open("get", url, true);
		xmlHttpReg.send();
		//xmlHttpReg.onreadystatechange = doResult; //设置回调函数
	}
	/*
	//回调函数
	//一旦readyState的值改变,将会调用这个函数,readyState=4表示完成相应
	//设定函数doResult()
	function doResult() {
		if (xmlHttpReg.readyState == 4) {//4代表执行完成
			if (xmlHttpReg.status == 200) {//200代表执行成功
				document.getElementById('m_text1').value = xmlHttpReg.responseText;
			}
		}
	}
	*/
}


//回应已成功接收此facetrack
function AckFacetrack(facetrackId) {
    var xhr = new XMLHttpRequest();  
	xhr.open("post", config.deepdotHost);  
	xhr.setRequestHeader("Content-Type", "application/json");
	var request = '{\"jsonrpc\":\"2.0\",\"method\":\"ackfacetrack",\"params\":{\"appkey\":\"' + config.appKey + '\", \"id\":\"' + facetrackId + '\"},\"id\":1}';  
    xhr.send(request);  
    return false;  
}

//显示此person的照片
function ShowPersonImage(personId) {  
	var xhr = new XMLHttpRequest();  
	xhr.open("post", config.deepdotHost);  
	xhr.setRequestHeader("Content-Type", "application/json");  
	var request = '{\"jsonrpc\":\"2.0\",\"method\":\"getpersoninfo",\"params\":{\"appkey\":\"' + config.appKey + '\", \"id\":\"' + personId + '\"},\"id\":1}';  
	xhr.onreadystatechange = function () {  
		if (xhr.readyState === 4) {  
			var strTmp = xhr.response;
			var obj = JSON.parse(strTmp);
			if (obj.result.code == 0)  //调用成功
			{
				if (obj.result.results.imgs.length > 0)
				{
					function toDou(num){
					    if(num<10){
					        return '0'+num;
					    }else{
					        return ''+num;
					    }
					}
					function time(){
					    var date = new Date();
					    var h = date.getHours();
					    var m = date.getMinutes()
					    var s = date.getSeconds();
					    var year = date.getFullYear();
					    var month = date.getMonth()+1;
					    var _date = date.getDate();
					    var  Nowtime= toDou(h)+':'+toDou(m);
					    var Nowday=year+'年'+toDou(month)+'月'+toDou(_date)+'日';
					    return [Nowtime,Nowday];
					}
					var imageId = obj.result.results.imgs[0];  //只取第一个张图片
					var imageURL = config.imageURL + '?type=1&appid=' + config.appKey +'&id=' + personId + '&fn=' + imageId;
					if(personId==localStorage.getItem(personId)){
							var Item='';
							Item+='<dl class="dlItem">'+
									'<dt><img src="imageURL"/></dt>'+
									'<dd>'+
										'<h2>'+localStorage.getItem(personId.userName)+'</h2>'+
										'<p>'+time()[1]+'</p>'+
										'<p>'+time()[0]+'</p>'+
									'</dd>'+
								'</dl>';
							$('.main_l').append(str);
					}
					
				}
			}
        }  
        return true;
    };  
    xhr.send(request);  
}

//根据icCard，查找对应的personID
function GetPersonIDByIC(icCard)
{
	var personID = "";
	for (var i=0; i<personDB.length; i++)
	{
		if (personDB[i][0] == icCard)
		{
			personID = personDB[i][1];
			break;
		}
	}
	return personID;
}
