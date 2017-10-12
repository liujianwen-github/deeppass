/**
 * 页面初始化 TODO
 */
var DEFAULT_MSG = "无到访记录";

function pageInit() {
	if (!isEmpty(getCookie("admin"))) {
		var admin = JSON.parse(getCookie("admin"));
		$(".locationInfo").html(admin.description);// 设备信息
		getFacetrackCount();
		getUnMatchedList();
		
	} else {
		window.location.href = 'login.html';
	}
}

/**
 * 显示栏显示识别的记录情况 TODO
 */
function getFacetrackCount() {
	var numInfo = '';
	$.post(config.API_HOST + 'facetrackManage/getFacetrackCount', {
		"adminId" : getAdminId(),
		"userkey" : getUserKey(),
		"deviceId" : getDeviceId(),
		"beginTime" : 0,
		"endTime" : getEndTime()
	}, function(data) {
		var json = data;
		if (checkJson(json)) {
			numInfo += '<div class="dataInfo">到访人次<span>' + json.results.full
					+ '</span></div>';
			numInfo += '<div class="dataInfo">陌生人<span>' + json.results.unknow
					+ '</span></div>';
			numInfo += '<div class="dataInfo">识别用户<span>' + json.results.know
					+ '</span></div>';
			$(".visitData").append(numInfo);
		} else {
			alert(json.msg);
		}
	});
}

/**
 * 未识别人员 TODO
 * 
 * @param json
 */
function unknowList(json) {
	var numInfo = '';
	if (json.code == json.SUCC_CODE && json.unknowList != null) {
		var unknowList = json.unknowList;
		var count = unknowList.length;
		for (var i = 0; i < count; i++) {
			json = unknowList[i];
			var createTime = getShortTime(json.createTime);
			numInfo += '<li class="oUserInfo">';
			numInfo += '<a href="javascript:void(0);"data-reveal-id="intelligentAnalysis"><img src="'
					+ json.imageUrl + '" alt="头像信息" /></a>';
			numInfo += '<div class="time">到访时间<span>'
					+ getShortTime(createTime) + '</span></div>';
			numInfo += '<input type="hidden" name="matchId" value="'
					+ json.matchId + '">';

			numInfo += '<input type="hidden" name="createTime" value="'
					+ createTime + '">';

			numInfo += '</li>';
		}
	}
	$(".unknowList").append(numInfo);
}

/**
 * 已识别 TODO
 * 
 * @param json
 */
function knowList(json) {
	var numInfo = '';
	if (json.code == json.SUCC_CODE && json.knowList != null) {
		var knowList = json.knowList;
		var count = knowList.length;
		for (var i = 0; i < count; i++) {
			json = knowList[i];
			var imgURL = "data:image/jpg;base64, " + json.imageId;
			var str = 'yname="' + json.name + '" ytime="'
					+ getLongTime(json.createTime) + '" matchId="'
					+ json.matchId + '" imgUrl="' + imgURL + '" registTime="'
					+ getLongTime(json.registTime) + '" noFrom="' + json.noFrom
					+ '" userId="' + json.userId + '"';
			numInfo += '<li class="userInfos" ' + str + '>';
			numInfo += '<a href="javascript:void(0);" data-reveal-id="userInfos"><img src="'
					+ imgURL + '" alt="用户头像" /></a>';
			numInfo += '<div class="recInfo">';
			numInfo += '<p class="name">' + json.name + '</p>';
			numInfo += '<p class="finalTime">最后到访时间</p>';
			numInfo += '<p class="name">' + getShortTime(json.createTime)
					+ '</p>';
			numInfo += '<a class="setWord" href="javascript:void(0);" data-reveal-id="leaveMessage" userId="'
					+ json.userId
					+ '" yname="'
					+ json.name
					+ '" imgUrl="'
					+ json.imageUrl + '">设置留言</a>';
			numInfo += '<input type="hidden" name="matchId" value="'
					+ json.matchId + '">';
			numInfo += '</div></li>';
		}
	}
	$(".knowList").append(numInfo);
}

/**
 * 注册用户 TODO
 * 
 * @param json
 */
function useList(json) {
	var numInfo = '';
	if (json.code == json.SUCC_CODE && json.useList != null) {
		var useList = json.useList;
		var count = useList.length;
		for (var i = 0; i < count; i++) {
			json = useList[i];

			var lastTime = getLongTime(json.latestMatchTime);
			if (lastTime == '') {
				lastTime = DEFAULT_MSG + '<br/><br/>';
			}
			var imgURL = "data:image/jpg;base64, " + json.imageId;
			var str = 'yname="' + json.name + '" ytime="' + lastTime
					+ '" imgUrl="' + imgURL + '" registTime="'
					+ getLongTime(json.createT) + '" noFrom="' + json.noFrom
					+ '" userId="' + json.userId + '"';

			numInfo += '<li class="userInfos" ' + str + '>';
			numInfo += '<a href="javascript:void(0);"data-reveal-id="userInfos"><img src="'
					+ imgURL + '" alt="用户头像" /></a>';
			numInfo += '<div class="recInfo">';
			numInfo += '<p class="name">' + json.name + '</p>';
			numInfo += '<p class="finalTime">最后到访时间</p>';
			numInfo += '<p class="resTime">' + lastTime.replace(' ', '<br/>')
					+ '</p>';
			numInfo += '<a class="setWord" href="javascript:void(0);" data-reveal-id="leaveMessage" userId="'
					+ json.userId
					+ '" yname="'
					+ json.name
					+ '" imgUrl="'
					+ json.imageId + '">设置留言</a>';
			numInfo += '<input type="hidden" name="userId" value="'
					+ json.userId + '">';
			numInfo += '<input type="hidden" name="personId" value="'
					+ json.personId + '">';
			numInfo += '<input type="hidden" name="matchId" value="'
					+ json.matchId + '">';
			numInfo += '</div></li>';
		}
	}
	$(".useList").append(numInfo);
}

/**
 * 创建用户成功 TODO
 * 
 * @param imgUrl
 * @param name
 * @param createTime
 * @param qrCode
 */
function buildUserSucc(imgUrl, name, createTime, qrCode) {
	$('#createUserSuccess').html("");
	var str = '';

	str = '<a class="close-reveal-modal" >&#215;</a>'
			+ '<div class="dialogTop">'
			+ '<img src="'
			+ imgUrl
			+ '" alt="头像" />'
			+ '<p>'
			+ name
			+ '</p>'
			+ '<p>到访时间'
			+ createTime
			+ '</p>'
			+ '</div>'
			+ '<div class="dialogBottom">'
			+ '<img src="'
			+ qrCode
			+ '" alt="二维码" />'
			+ '<p>扫描二维码关注微信公众公众号</p>'
			+ '<p>随时查询自己的识别记录</p>'
			+ '<div class="intAnalysisBtn">'
			+ '<a href="javascript:void(0);" title="完成" class="close-reveal-modal close-reveal-modal-sure" >完成</a>'
			+ '</div>' + '</div>';
	$('#createUserSuccess').html(str);
}

/**
 * 
 * @param time
 */
function getLongTime(time) {
	if (time == "" || time == undefined)
		return "";
	var times = time.split(' ');
	return times[0] + " " + times[1].substr(0, 5);
}

function getShortTime(time) {
	if (time == "" || time == undefined)
		return "";

	var times = time.split(' ');
	return times[1].substr(0, 5);
}
function getShortTime1(time) {
	if (time == "" || time == undefined)
		return "";

	var times = time.split(' ');
	times = times[0].substr(5, 9);
	times = times.replace('-','月');
	return times + '日';
}
/**
 * TODO 页面刷新
 */
$('.close-reveal-modal-sure').on('click', function() {
	alert("reload");
	window.location.reload();
})
// $('.close-reveal-modal').on('click', function() {
// window.location.reload();
// })

/**
 * 判断是否为空
 * 
 * @param inputVal
 * @returns {Boolean}
 */

function isEmpty(inputVal) {
	if (inputVal != null && inputVal != undefined && inputVal != '') {
		if (inputVal.replace(/(^\s*)|(\s*$)/g, "").length > 0) {
			return false;// 不是空格
		}
	}
	return true;// 为空
}

/**
 * 陌生人新建用户;如果本地长传，则用本地照片代替摄像头获取的照片
 */
$('#intelligentAnalysis').on('change', "#editImg", function() {
	console.log('click')
})

function editImg() {
	var input1 = document.getElementById('editImg');
	if (typeof FileReader === 'undefined') {
		// result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
		input1.setAttribute('disabled', 'disabled');
	} else {
		// 如果支持则绑定事件
		var imgUrl = $(this).attr("dataimg");
		input1.addEventListener('change', function() {
			var file = this.files[0];
			if (!/image\/\w+/.test(file.type)) {
				// 图片文件的type值为image/png或image/jpg
				alert("文件必须为图片！");
				return false;
			}
			// 获取文件
			var reader = new FileReader();
			reader.readAsDataURL(file);
			// 获取成功
			reader.onload = function(e) {
				var img = new Image();
				img.src = e.target.result;
				// alert('1')
				$('.setHead img').attr('src', img.src);
				// console.log($('.setHead img'))
				// 获取图片URL
				// var data = e.target.result.split(',');
				// var tp = (file.type == 'image/png') ? 'png' : 'jpg';
				// imgUrl = data[1];//图片的url，去掉(data:image/png;base64,)

			}
			// console.log('最后一条'+imgUrl)
		}, false);
	}
}
/**
 * 查询的记录的开始时间 TODO
 */

function getBeginTime(limitTime) {
	if (limitTime == "" || limitTime == null) {
		return 1;
	}

	var time = new Date().getTime();
	if (limitTime == "0.5") {
		var newTime = time - 1800000;
		return newTime;
	}
	if (limitTime == '4') {
		var newTime = time - 14400000;
		return newTime;
	}
	if (limitTime == "12") {
		var newTime = time - 43200000;
		return newTime;
	}
	if (limitTime == "24") {
		var newTime = time - 86400000;
		return newTime;
	} else if (limitTime == "25") {
		var a = $('.hourNum').find('input').val();
		var newTime = time - parseInt(a) * 3600000;
		return newTime;
	}
}

/**
 * 查询记录的结束时间（当前时间） TODO
 * 
 * @returns
 */
function getEndTime() {
	return new Date().getTime();
}
