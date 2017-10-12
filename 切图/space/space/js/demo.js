//进度条
function go(Num,wd){
    document.getElementsByClassName("bar")[Num].style.width = wd + "%"; 
} 
//上传信息
function sendMine(){
		var userName=$('#userName').val();
		var userId=$('#userId').val();
		var Vip=0;
		if($('#che').is(':checked')) {
   			Vip=1;
		}
		var add={'userName':userName,'userId':userId,'Vip':Vip};
		// 保存用户信息
		localStorage.setItem(userId,JSON.stringify(add));
}
//刷新列表
function refresh(){
	window.location.reload();
}
//json读写
//json写
function funSave() {
	var id = $('#testText1')[0].value;
	var name = $('#testText2')[0].value;
	var str = '{mydata:[' + '{id:' + id + ',name:' + name + '}' + ']}';
	 
	str = "{MyData:[{id:'" + id + "',name:'" + name + "'}]}";
	 
	//var json = eval('(' + str + ')');
	 
	var fso, tf;
	try{
	fso = new ActiveXObject("Scripting.FileSystemObject");
	      tf = fso.CreateTextFile("/Users/deepdot/HBuilderProjects/json/js/data.json", true);
	      tf.WriteLine(str);
	}catch(err){
	 
	 
	      }finally{
	      tf.Close();
	      }
}
 //json读
function funSearch(num) {
	var fso, ts, s;
	var ForReading = 1;
	try{
	fso = new ActiveXObject("Scripting.FileSystemObject");
	      ts = fso.OpenTextFile("/Users/deepdot/HBuilderProjects/json/js/data.json", ForReading);
	      s = ts.ReadLine();
	      var json = eval('(' + s + ')');
	      alert(json.MyData[num].id);
	}catch(err){
	 
	 
	}finally{
	ts.Close();
	}
}




	go(1,100);
	go(0,20);
	go(2,56);
	go(3,32);
	go(4,34);
	go(5,76);
	function QueryNewPerson() {
		var xhr = new XMLHttpRequest();
		xhr.open("post", config.deepdotHost);
		xhr.setRequestHeader("Content-Type", "application/json");
		var request = '{\"jsonrpc\":\"2.0\",\"method\":\"getunprocessedmatchedfacetrack",\"params\":{\"appkey\":\"'
				+ config.appKey
				+ '\", \"count\":1, \"matched_count\":3},\"id\":1}';
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				var strTmp = xhr.response;
				var obj = JSON.parse(strTmp);
				if (obj.result.code == 0) //调用成功
				{
					var results = obj.result.results;
					if (results != null && results != '') {
						var objDetail = results.ids[0]; //只取第一个匹配的
						console.log(objDetail);
						var str='';
						for(var i=0;i<objDetail.matchs.length;i++){
							str+=
						}
						objDetail.matchs[0].percent;
						AckFacetrack(objDetail.id); //汇报此facetrack已成功获取，部署时需取消此注释
					}
				}
			}
		};
		xhr.send(request);
		return true;
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
