
var $newPerson = $('<div class="person"><span><img src="images/A.jpg"/></span><p class="per-name">王一</p><p class="time" id="time"></p><p class="message">今天10点有会议要开！</p></div>');
var $newPerson2 = $('<div class="person normalPerson"><span><img src="images/normalPerson.png"/></span><p class="message1">需刷卡验证</p></div>');
var $newPerson3 = null;

var p = [];//缓冲池
function createPersonInfo(json) {
	var strList = '';
	if (json != null && json.code == json.succ_code) {
		var results = json.results;
		if (results != null && results != '' && results.user != null
				&& results.user != '') {
			var user = results.user;
			var imgUrl = user.image;
			var message = user.message;
			var userName = user.name;
			var birthDate = user.birthDate;
			var strList = '<div class="person"><span><img src="' + imgUrl
					+ '"/></span><p class="per-name">' + userName
					+ '</p><p class="time" id="time"></p>';

			if (message != null && message != "") {
				strList += '<p class="message">' + message + '</p>';
			}
			strList += '</div>';
			var A = {
				"birthday": birthDate,
				"strList": strList
			}
			p.push(A);
//			var create = setInterval(function(){
//				var leng = p.length;
//				if(leng >= 1){
//					$newPerson3 = $(p[0].strList);
//
//					if (p[0].birthDate != null && p[0].birthDate != "") {
//						var nowDate = new Date().format("MM-dd");
//						p[0].birthDate = new Date(p[0].birthDate).format("MM-dd");
//						if (p[0].birthDate == nowDate) {
//							specialPerson(imgUrl);
//						}
//					}
//					createVipPerson($newPerson3);
//					p.shift();
//				} else{
//					clearInterval(create);
//				}
//			}, 300);
		}
	}
}

var cer = null;
function vip(){
	clearInterval(cer);
	var leng = p.length;
	cer = setInterval(function(){
		if(leng > 0){
			$newPerson3 = $(p[0].strList);
			if (p[0].birthDate != null && p[0].birthDate != "") {
				var nowDate = new Date().format("MM-dd");
				p[0].birthDate = new Date(p[0].birthDate).format("MM-dd");
				if (p[0].birthDate == nowDate) {
					specialPerson(imgUrl);
				}
			}
			createVipPerson($newPerson3);
			p.shift();
		}
	},500);
}
