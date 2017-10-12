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
		getUnMatchedList(1);
		pager1 = new PageList("pageDIV1", {
			curPage : pageConfig.firstPage,
			totalCount : totalPage1,
		});
		pager1.init();
	}
	// 识别用户
	if (_index == 1) {
		$(".knowList").children().remove();
		getMatchedPersonList(1);
		pager2 = new PageList("pageDIV2", {
			curPage : pageConfig.firstPage,
			totalCount : totalPage2,
		});
		pager2.init();
	}
	// 注册用户
	if (_index == 2) {
		$(".useList").children().remove();
		getPersonList(1);
		pager3 = new PageList("pageDIV3", {
			curPage : pageConfig.firstPage,
			totalCount : totalPage3,
		});
		pager3.init();
	}

});
$(".intAnalysis .intContent .pItem hr:eq(1)").css("background", "#58CE58");
$(".intAnalysis .intContent .pItem hr:eq(2)").css("background", "#B3DF9D");

var pager1 = null;
var pager2 = null;
var pager3 = null;
var totalPage1 = null;
var totalPage2 = null;
var totalPage3 = null;
var flag1 = true;
var flag2 = true;
var flag3 = true;
/**
 * 未识别用户 TODO
 */
function getUnMatchedList(index) {
	$('.unknowList').empty();
	$
			.ajax({
				type : "post",
				url : config.API_HOST + "facetrackManage/getUnMatchedList",
				async : true,
				data : {
					'userkey' : getUserKey(),
					"deviceId" : getDeviceId(),
					'pageNo' : index,
					'pageCount' : config.pageCount,
					"beginTime" : 1,
					"endTime" : getEndTime()
				},
				success : function(data) {
					var numInfo = '';
					if (checkJson(data) && data.results != null) {
						var results = data.results;
						console.log(results.pageInfo)
						totalPage1 = results.pageInfo.lastPageNo;
						var count = results.list.length;
						for (var i = 0; i < count; i++) {
							var json = results.list[i];
							var createTime = getShortTime(json.createTime);
							var createTime1 = getShortTime1(json.createTime);
							numInfo += '<li class="oUserInfo">';
							numInfo += '<a href="javascript:void(0);"data-reveal-id="intelligentAnalysis"><img src="'
									+ json.facetrackImage
									+ '" alt="头像信息" /></a>';
							numInfo += '<div class="time">'+ createTime1 +'<span >'
									+ createTime + '</span></div>';
							numInfo += '<input type="hidden" name="facetrackId" value="'
									+ json.facetrackId + '">';
							numInfo += '<input type="hidden" name="createTime" value="'
									+ createTime + '">';
							numInfo += '</li>';
						}
					}
					$(".unknowList").append(numInfo);
					if(flag1){
						pager1 = new PageList("pageDIV1", {
							curPage : pageConfig.firstPage,
							totalCount : totalPage1,
						});
						pager1.init();
						flag1 = false;
					}
				}
			});
}

/**
 * 注册用户 TODO
 */
function getPersonList(index) {
	$('.useList').empty();
	$('.recTab').css('text-align','left');
	$
			.ajax({
				type : "get",
				url : config.API_HOST + "/personManage/getPersonList",
				async : true,
				data : {
					'userkey' : getUserKey(),
					'pageNo' : index,
					'pageCount' : config.pageCount
				},
				success : function(data) {
					var numInfo = '';
					if (checkJson(data) && data.results != null) {
						var results = data.results;
						console.log(results.pageInfo)
						totalPage3 = results.pageInfo.lastPageNo;
						var count = results.list.length;
						for (var i = 0; i < count; i++) {
							var json = results.list[i];
							var latestMatchTime = getLongTime(json.latestMatchTime);

							if (latestMatchTime == '') {
								latestMatchTime = DEFAULT_MSG;
							}
							var imgUrl = json.headimage;
							var name = json.name;
							var personId = json.personId;

							var str = 'yname="' + name + '" ytime="'
									+ latestMatchTime + '" imgUrl="' + imgUrl
									+ '" registTime="'
									+ getLongTime(json.registTime)
									+ '" noFrom="' + json.noFrom
									+ '" personId="' + personId + '"';

							numInfo += '<li class="userInfos" ' + str + '>';
							numInfo += '<a href="javascript:void(0);"data-reveal-id="userInfos"><img src="'
									+ imgUrl + '" alt="用户头像" /></a>';
							numInfo += '<div class="recInfo">';
							numInfo += '<p class="name">' + name + '</p>';
							numInfo += '<p class="finalTime">最后到访时间</p>';
							numInfo += '<p class="resTime">'
									+ latestMatchTime.replace(' ', '<br/>')
									+ '</p>';
							numInfo += '<a class="setWord" href="javascript:void(0);" data-reveal-id="leaveMessage" personId="'
									+ personId
									+ '" yname="'
									+ name
									+ '" imgUrl="' + imgUrl + '">设置留言</a>';
							numInfo += '<input type="hidden" name="personId" value="'
									+ personId + '">';
							numInfo += '<input type="hidden" name="matchId" value="'
									+ json.matchId + '">';
							numInfo += '</div></li>';
						}
					}
					$(".useList").append(numInfo);
					if(flag3){
						pager3 = new PageList("pageDIV3", {
							curPage : pageConfig.firstPage,
							totalCount : totalPage3,
						});
						pager3.init();
						flag3 = false;
					}
				}
			});
}

