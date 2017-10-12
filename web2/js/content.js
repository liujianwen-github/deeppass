/**
 * Created by Administrator on 2016/11/11.
 */

$('.option a').click(function() {
	var _index = $(this).index();
	$(this).addClass('cur').siblings().removeClass('cur');
	$('.optionTab').eq(_index).show().siblings().hide();
	// 陌生人
	if (_index == 0) {
		$(".unknowList").children().remove();
		getUnMatchedList();
	}
	// 识别用户
	if (_index == 1) {
		$(".knowList").children().remove();
		getMatchedPersonList();
	}
	// 注册用户
	if (_index == 2) {
		$(".useList").children().remove();
		getPersonList();
	}

});
$(".intAnalysis .intContent .pItem hr:eq(1)").css("background", "#58CE58");
$(".intAnalysis .intContent .pItem hr:eq(2)").css("background", "#B3DF9D");

/**
 * 未识别用户 TODO
 */
function getUnMatchedList() {
	$
			.ajax({
				type : "post",
				url : API_HOST + "facetrackManage/getUnMatchedList",
				async : true,
				data : {
					'userkey' : getUserKey(),
					'pageNo' : 1,
					'pageCount' : 3
				},
				success : function(data) {
					var numInfo = '';
					if (checkJson(data) && data.results != null) {
						var results = data.results;
						var count = results.list.length;
						for (var i = 0; i < count; i++) {
							var json = results.list[i];
							var createTime = getShortTime(json.createTime);
							numInfo += '<li class="oUserInfo">';
							numInfo += '<a href="javascript:void(0);"data-reveal-id="intelligentAnalysis"><img src="'
									+ json.facetrackImage
									+ '" alt="头像信息" /></a>';
							numInfo += '<div class="time">到访时间<span >'
									+ createTime + '</span></div>';
							numInfo += '<input type="hidden" name="facetrackId" value="'
									+ json.facetrackId + '">';
							numInfo += '<input type="hidden" name="createTime" value="'
									+ createTime + '">';
							numInfo += '</li>';
						}
					}
					$(".unknowList").append(numInfo);
				}
			});
}

/**
 * 今日识别用户 TODO
 */
function getMatchedPersonList() {
	$
			.ajax({
				type : "get",
				url : API_HOST + "personManage/getMatchedPersonList",
				async : true,
				data : {
					'userkey' : getUserKey(),
					'pageNo' : 1,
					'pageCount' : 3
				},
				success : function(data) {
					var numInfo = '';
					if (checkJson(data) && data.results != null) {
						var results = data.results;
						var count = results.list.length;
						for (var i = 0; i < count; i++) {
							var json = results.list[i];
							var imgUrl = json.headimage;
							var name = json.name;
							var latestMatchTime = getShortTime(json.latestMatchTime);
							var str = 'yname="' + name + '" ytime="'
									+ getLongTime(json.latestMatchTime)
									+ '" matchId="' + json.matchId
									+ '" imgUrl="' + imgUrl + '" registTime="'
									+ getLongTime(json.registTime)
									+ '" noFrom="' + json.noFrom + '" userId="'
									+ json.userId + '"';
							numInfo += '<li class="userInfos" ' + str + '>';
							numInfo += '<a href="javascript:void(0);" data-reveal-id="userInfos"><img class="imgUrl" src="'
									+ imgUrl + '" alt="用户头像" /></a>';
							numInfo += '<div class="recInfo">';
							numInfo += '<p class="name">' + json.name + '</p>';
							numInfo += '<p class="finalTime">最后到访时间</p>';
							numInfo += '<p class="name">' + latestMatchTime
									+ '</p>';
							numInfo += '<a class="setWord" href="javascript:void(0);" data-reveal-id="leaveMessage" userId="'
									+ json.userId
									+ '" yname="'
									+ name
									+ '" imgUrl="' + imgUrl + '">设置留言</a>';
							numInfo += '<input type="hidden" name="matchId" value="'
									+ json.matchId + '">';
							numInfo += '</div></li>';
						}
					}
					$(".knowList").append(numInfo);
				}
			});
}

/**
 * 注册用户 TODO
 */
function getPersonList() {
	$
			.ajax({
				type : "get",
				url : API_HOST + "personManage/getPersonList",
				async : true,
				data : {
					'userkey' : getUserKey(),
					'pageNo' : 1,
					'pageCount' : 3
				},
				success : function(data) {
					var numInfo = '';
					if (checkJson(data) && data.results != null) {
						var results = data.results;
						var count = results.list.length;
						for (var i = 0; i < count; i++) {
							var json = results.list[i];
//							console.log(json);
							var latestMatchTime = getLongTime(json.latestMatchTime);

							if (latestMatchTime == '') {
								latestMatchTime = DEFAULT_MSG;
							}
							var imgUrl = json.headimage;
							var name = json.name;
							var userId = json.personId;

							var str = 'yname="' + name + '" ytime="'
									+ latestMatchTime + '" imgUrl="' + imgUrl
									+ '" registTime="'
									+ getLongTime(json.registTime)
									+ '" noFrom="' + json.noFrom + '" userId="'
									+ userId + '"';

							numInfo += '<li class="userInfos" ' + str + '>';
							numInfo += '<a href="javascript:void(0);"data-reveal-id="userInfos"><img src="'
									+ imgUrl + '" alt="用户头像" /></a>';
							numInfo += '<div class="recInfo">';
							numInfo += '<p class="name">' + name + '</p>';
							numInfo += '<p class="finalTime">最后到访时间</p>';
							numInfo += '<p class="resTime">'
									+ latestMatchTime.replace(' ', '<br/>')
									+ '</p>';
							numInfo += '<a class="setWord" href="javascript:void(0);" data-reveal-id="leaveMessage" userId="'
									+ json.userId
									+ '" yname="'
									+ name
									+ '" imgUrl="' + imgUrl + '">设置留言</a>';
							numInfo += '<input type="hidden" name="userId" value="'
									+ userId + '">';
							numInfo += '<input type="hidden" name="personId" value="'
									+ userId + '">';
							numInfo += '<input type="hidden" name="matchId" value="'
									+ json.matchId + '">';
							numInfo += '</div></li>';
						}
					}
					$(".useList").append(numInfo);
				}
			});
}