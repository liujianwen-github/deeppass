var limitTime = getCookie("limitTime");
if (limitTime == null || limitTime == "") {
	limitTime = 0.5;
}

var titleStr = '<div class="listTip">以下是智能分析在<span>'
		+ limitTime
		+ '小时内</span>查找到与您最接近的来宾<br/>'
		+ '</div><div class="listTip"><span>偷偷告诉你：确认记录可以大大提高下次的识别度哦!</span></div>';

/**
 * 初始化页面 TODO
 */
function pageInit() {
	var limitTime = $('.current').attr('vl');

	$.post(config.API_HOST + 'personManage/getPersonUnMatchedList', {
		'userkey' : config.USERKEY,
		"personId" : getCookie('personId'),
		'beginTime' : getBeginTime(limitTime),
		'endTime' : getEndTime()
	}, function(data) {

		if (checkJson(data)) {
			var infoStr = "";
			var matchList = data.results.list;
			$('.Info').html("");
			$('.Info').html(titleStr);
			$('.listTip span').eq(1).css({
				'font-size' : '10px',
				'color' : 'white'
			})

			for ( var i in matchList) {
				var item = matchList[i];
				var times = item.createTime.split(' ');
				var facetrackId = item.facetrackId;
				infoStr += '<li>' + '<div class="leftInfo">'
						+ '<p class="time">' + times[1].substr(0, 5) + '</p>'
						+ '<p class="date">' + times[0] + '</p>'
						+ '<p class="date">' + getDayOfWeek(times[0]) + '</p>';

				infoStr += '<a class="btns" ' + " onclick='logConfirm(\""
						+ item.facetrackId + "\");'" + ');">确认</a>';

				infoStr += '</div>'
						+ '<div style="position: relative;" class="userPic">'
						+ '<img style="opacity: 1;" src="'
						+ item.facetrackImage + '" alt="头像" '
						+ " onclick='seachImgs(\"" + item.facetrackId + "\");'"
						+ '/ >' + '</div>' + '</li>';
			}
			$('.Info').append(infoStr);
		}
	})
}

/**
 * 用户确认未识别的记录 TODO
 * 
 * @param personId
 * @param facetrackId
 */
function logConfirm(facetrackId) {
	$.post(config.API_HOST + "personManage/confirmFacetrackByPerson", {
		'userkey' : config.USERKEY,
		// "personId" : getCookie('personId'),
		"personId" : "e95fb8dd-00ae-4cbd-8e26-550f7b502f19",
		'facetrackId' : facetrackId
	}, function(data) {
		if (checkJson(data)) {
			alert("确认成功，记录已添加");
			pageInit();
		} else {
			alert(data.msg);
		}
	})
}