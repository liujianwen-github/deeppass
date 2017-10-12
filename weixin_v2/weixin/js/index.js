/**
 * 用户详情页 init TODO
 */
var personId = null
function onload() {
	getUserInfoById();
}

/**
 * 获取用户信息 TODO
 */
function getUserInfoById() {
	var getCookies = getCookie('userId') || localStorage.getItem('userId');
	$.post(config.HOST + 'userManager/getUserInfoById', {
		'userId' : getCookies
		// 'userId' : '9766da785418450fa830459add842018'
	}, function(data) {
		var json = data;
		if (checkJson(json)) {
			user = json.results.user;
			setUserCookies(user);

			getCookies = getCookie('userId') || localStorage.getItem('userId');

			writeUserInfo(user);
			if (user.personId != null && user.personId != undefined
					&& user.personId != "") {
				personId = user.personId
				getPersonMatchedList(user.personId);
			}
		} else {
			alert(json.msg);
		}
	});
}

/**
 * 显示用户信息 TODO
 * 
 * @param user
 */
function writeUserInfo(user) {
	var userHeadstr = '<div class="head">' + '<img src="' + user.imageId
			+ '" />' + '</div>' + '</div>' + '<p class="uName">' + user.name
			+ '</p>' + '<p class="uInfo">' + '<span>'
			+ user.createTime.substring(0, 16) + '</span>'
	if (user.noFrom == "" || user.noFrom == "WX") {
		userHeadstr += '<span>手机注册</span>' + '</p>'
	} else if (user.noFrom == "AD") {
		userHeadstr += '<span>后台注册</span>' + '</p>'
	}
	$('.userHead').html(userHeadstr);
}

/**
 * 用户的识别记录 TODO
 * 
 * @param personId
 */
function getPersonMatchedList(personId,pageNo) {
	$
			.post(
					"http://demo.deepdot.cn"+config.API_HOST + 'personManage/getPersonMatchedList',
					{
						'userkey' : config.USERKEY,
						'pageNo' : pageNo || 1,
						'pageCount' : config.pageCount,
						'personId' : personId,
						'beginTime': 0,
						'endTime': new Date().getTime()
					},
					function(data) {
						$('#scrollBox').css('display','block')
						// 判断是否全部数据加载完毕
						if (data.results.pageInfo.lastPageNo <= pageNo) {
							// 全部加载完毕，加载中变为没有更多数据提示
							window.removeEventListener('scroll',addscroll)
							$('#scrollBox').html('没有更多的数据啦！')
//							setTimeout(function(){
//							},3000)
						}
						var json = data;
						if (checkJson(json)) {
							var str = '';
							var results = data.results;
							if (results != "") {
								var list = results.list;
								for ( var i in list) {
									var item = list[i];
									var times = item.createTime.split(' ');
									str += '<li>'
											+ '<div class="leftInfo">'
											+ '<p class="time">'
											+ // 时间
											times[1].substr(0, 5)
											+ '</p>'
											+ '<p class="date">'
											+ times[0]
											+ '</p>'
											+ // 年月日
											'<p class="date">'
											+ getDayOfWeek(times[0])
											+ // 星期几
											'</p><p align="center" style="margin-top:3em">'
											+ '<span  style="border-radius:2px;color: white;background-color:rgba(88,144,196,0.8);padding:0.4em 0.6em;font-size:12px;" '
											+ " onclick='showSourceImg(\""
											+ item.sourceImg + "\");'"
											+ '>现场图片</span>' + '</p></div>';

									str += '<div style="position: relative;" class="userPic">'
											+ '<span style="padding: 0.1em 0.2em;color: rgb(242,242,242);background-color: rgba(88,144,196,0.8);position: absolute;right: 4px;bottom: 3px;border-top-left-radius: 10%;font-size:12px">动图</span>'
											+ '<img style="opacity: 1;" src="'
											+ item.facetrackImage
											+ '" alt="" style="width:100%" '
											+ " onclick='seachImgs(\""
											+ item.facetrackId
											+ "\");'"
											+ '/ >' + '</div>' + '</li>';
								}
							}
							$('.Info').append(str);
							// 临时绑定时间，正式要调seachImgs函数
						} else {
							alert(json.msg);
						}
					});
}

/**
 * 展示记录现场图 TODO
 */
function showSourceImg(sourceImg) {
	$('#tab .weui-dialog__bd').html(' ');
	$('#tab').css('display', 'block');
	$('#tab').on('touchend', function() {
		$('#tab').css('display', 'none');
		return false;
	})
	var img = new Image();
	img.src = sourceImg;
	img.style.width = "100%";
	img.alt = "sourceImg";
	img.onerror = function() {
		var img = event.srcElement;
		img.src = "images/noFacetrak.png";
	};
	$('#tab .weui-dialog__bd').append(img);
}

/**
 * 获取facetrack图片序列，页面形成弹窗播放动图 TODO
 * 
 * @param matchId
 * @param methodUrl
 */
function seachImgs(facetrackId) {
	$.post(config.API_HOST + "facetrackManage/getFacetrackImgs", {
		'userkey' : config.USERKEY,
		'count' : 0,
		'facetrackId' : facetrackId
	}, function(data) {
		var json = data;
		$('#tab').css('display', 'block');
		$('#tab').on('touchend', function() {
			$('#tab').css('display', 'none');
			clearInterval(animaImg);// 清除循环
			return false;
		})
		str = "";
		if (checkJson(json)) {
			var results = data.results;
			var imgs = results.imgs;
			for (var i = 0; i < results.size; i++) {
				str += '<img  src="' + results.imgHead + imgs[i]
						+ '" alt="" />';
			}
			$('#tab .weui-dialog__bd').html(str);
			var images = $('#tab').find('img');
			var pos = 0;
			var len = images.length;
			var animaImg = self.setInterval(function() {
				images[pos].style.display = 'none';
				pos = ++pos == len ? 0 : pos;
				images[pos].style.display = 'inline';
			}, 100);
		} else {
			alert(data.msg);
		}
	})
}

/**
 * 搜索页 TODO
 */
$('.uNav').on('touchend', function() {
	window.location.href = "search.html";
})
