/**
 * Created by Administrator on 2016/11/30.
 */
/**
 * Created by Administrator on 2016/11/29.
 */
// 判断时间
function toDou(num) {
	if (num < 10) {
		return '0' + num;
	} else {
		return '' + num;
	}
}
var oTime = document.getElementById('timeNow');
var oDate = document.getElementById('timeDate');
var oDay = document.getElementById('timeDay');
function time() {
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes()
	var s = date.getSeconds();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var _date = date.getDate();
	var week = date.getDay();
	oTime.innerHTML = toDou(h) + ':' + toDou(m);
	oDate.innerHTML = year + '-' + toDou(month) + '-' + toDou(_date);
	var weekStr;
	if (week == 0) {
		weekStr = "星期日";
	} else if (week == 1) {
		weekStr = "星期一";
	} else if (week == 2) {
		weekStr = "星期二";
	} else if (week == 3) {
		weekStr = "星期三";
	} else if (week == 4) {
		weekStr = "星期四";
	} else if (week == 5) {
		weekStr = "星期五";
	} else if (week == 6) {
		weekStr = "星期六";
	}
	oDay.innerHTML = weekStr;
}
time();
setInterval(time, 1000);

// 刷卡后成功
function showPart1() {
	$(".userInfoUl li").css({
		"opacity" : "0",
		"top" : "50%",
		"margin-top" : "-150px"
	}).animate({
		"margin-top" : "-131px",
		opacity : 1
	});
}
function oBrushCardSuccess(objDetail) {
	$.get('/faceclient/api/ClientAPI?Method=getFacetrackMatch&Version=1.0',
					{
						"objDetail" : JSON.stringify(objDetail)
					},
					function(data) {
						var json = data;
						var strList = '';
						if (json.code == json.SUCC_CODE) {
							var nd = new Date();
							var dateStr = nd.getHours() + ":" + nd.getMinutes()
									+ ":" + nd.getSeconds();
							var results = json.results;
							if (results != null && results != ''
									&& results.list != null
									&& results.list != '') {
								var userList = results.list;
								for ( var i in userList) {
									var item = userList[i];
									var user = item.user;
									var message = item.message;

									var strList = '<div class="dlItem"><table><tr><td class="userHead" ><img src="data:image/jpg;base64, '
											+ user.imageId
											+ '" alt=""/></td><td><div class="userInformation"><p class="name">'
											+ user.name
											+ '<p class="time">到访时间：'
											+ dateStr
											+ '</p>';

									if (message != null) {
										strList += '<div class="message">'
												+ message.messageContent
												+ '</div>';
									}
									strList += '</div></td></tr></table></div>';
								}
							}
						}
						if (strList != '') {
							$(".scanIng").hide();
							$(".scanSuccess").show();
							var box = $(".slideContent");
							box.append(strList);
							if (getUserCount() > 0) {
								doscroll();
								// console.log("doscroll = " + getUserCount());
							}
							addUserCookies();
						}
					}, 'json');
}

/**
 * TODO
 * 
 * @param objDetail
 */
//function getNewPersonSuccess(objDetail) {
//	if (objDetail == null) {
//		console.log("objDetail == null");
//		return;
//	}
////	var json = eval("(" + objDetail.arr.msg + ")");
//	var json =  objDetail;
//	var strList = '';
//	if (json != null && json.code == json.succ_code) {
//		var nd = new Date();
//		var dateStr = nd.getHours() + ":" + nd.getMinutes() + ":"
//				+ nd.getSeconds();
//		var results = json.results;
//		if (results != null && results != '' && results.user != null
//				&& results.user != '') {
//			var user = results.user;
//			var imgUrl = user.image;
//			var message = user.message;
//			var strList = '<div class="dlItem"><table><tr><td class="userHead" ><img src="'
//					+ imgUrl
//					+ '" alt=""/></td><td><div class="userInformation"><p class="name">'
//					+ user.name + '<p class="time">到访时间：' + dateStr + '</p>';
//
//			if (message != null && message != "") {
//				strList += '<div class="message">' + message + '</div>';
//			}
//			strList += '</div></td></tr></table></div>';
//
//		}
//	} else {
//		var timeOut = document.getElementById("timeOut");
//		timeOut.play();
//		setTimeout(function() {
//			timeOut.pause();
//			timeOut.currentTime = 0;
//		}, 4 * 1000);
//	}
//	if (strList != '') {
//		$(".scanIng").hide();
//		$(".scanSuccess").show();
//		var box = $(".slideContent");
//		box.append(strList);
//		if (getUserCount() > 0) {
//			doscroll();
//		}
//		addUserCookies();
//
//		var audio = document.getElementById("audio1");
//		audio.play();
//		setTimeout(function() {
//			audio.pause();
//			audio.currentTime = 0;
//		}, 4 * 1000);
//	}
//}

function getNewPersonSuccess(objDetail) {
	if (objDetail == null) {
		console.log("objDetail == null");
		return;
	}
	var json = eval("(" + objDetail + ")");
	var strList = '';
	if (json != null && json != '' && json != 'null') {
		var nd = new Date();
		var dateStr = nd.getHours() + ":" + nd.getMinutes() + ":"
				+ nd.getSeconds();
		var user = json.userInfo;
		if (user != null && user != '' && user != 'null') {
			var imgUrl = user.headImage;
			var userName = user.userName;
			var message = user.message;
			var strList = '<div class="dlItem"><table><tr><td class="userHead" ><img src="data:image/jpg;base64,'
					+ imgUrl
					+ '" alt=""/></td><td><div class="userInformation"><p class="name">'
					+ userName + '<p class="time">到访时间：' + dateStr + '</p>';

			if (message != null && message != "") {
				strList += '<div class="message">' + message + '</div>';
			}
			strList += '</div></td></tr></table></div>';

		}
	} else {
		var timeOut = document.getElementById("timeOut");
		timeOut.play();
		setTimeout(function() {
			timeOut.pause();
			timeOut.currentTime = 0;
		}, 4 * 1000);
	}
	if (strList != '') {
		$(".scanIng").hide();
		$(".scanSuccess").show();
		var box = $(".slideContent");
		box.append(strList);
		if (getUserCount() > 0) {
			doscroll();
		}
		addUserCookies();

		var audio = document.getElementById("audio1");
		audio.play();
		setTimeout(function() {
			audio.pause();
			audio.currentTime = 0;
		}, 4 * 1000);
	}
}



var times = null;
var num = 0;
function clearShowInfo() {
	$("#holder").html("");
}

function AutoScroll(obj) {

	num++;
	$(obj).find("ul:first").animate({
		marginTop : "-262px"
	}, 500, function() {
		$(this).css({
			marginTop : "0px"
		}).find("li:first").appendTo(this);
	});
	if ((($(obj).find("li").length) - 3) == num) {
		clearInterval(times);
		num = 0;
	}

}

// 刷脸后出现请刷卡
function oBrushFace() {
	$(".promptTip").css("opacity", "0").animate({
		left : "2px",
		opacity : 1
	}).text("请刷卡");
}

// 刷卡后失败
function oBrushCardFail() {
	$(".promptTip").css("opacity", "0").animate({
		left : "2px",
		opacity : 1
	}).text("验证失败");
}

// 返回原始状态
function backOriginal() {

	clearShowInfo();
	$(".scanIng").show();
	$(".scanSuccess").hide();
	$(".promptTip").css("opacity", "0").animate({
		left : "2px",
		opacity : 1
	}).text("正在识别中...");
}

/**
 * TODO 整体向下推
 */
function showPart1() {
	$(".userInfoUl li").css({
		"opacity" : "0",
		"top" : "50%",
		"margin-top" : "-150px"
	}).animate({
		"margin-top" : "-131px",
		opacity : 1
	});
}
/**
 * TODO
 */
function firstToTop() {
	$(".userInfoUl li").css({
		"opacity" : "0",
		"top" : "0%",
		"margin-top" : "0"
	}).animate({
		"margin-top" : "0",
		opacity : 1
	});
}
