/**
 * 今日识别用户 TODO
 */
function getMatchedPersonList(index) {
	$('.knowList').empty();
	$('.recTab').css('text-align', 'left');
	$
			.ajax({
				type : "get",
				url : config.API_HOST + "personManage/getMatchedPersonList",
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
						totalPage2 = results.pageInfo.lastPageNo;
						var count = results.list.length;
						for (var i = 0; i < count; i++) {
							var json = results.list[i];
							var imgUrl = json.headimage;
							var name = json.name;
							var personId = json.personId;
							var latestMatchTime = getShortTime(json.latestMatchTime);
							var str = 'yname="' + name + '" ytime="'
									+ getLongTime(json.latestMatchTime)
									+ '" imgUrl="' + imgUrl + '" registTime="'
									+ getLongTime(json.registTime)
									+ '" noFrom="' + json.noFrom
									+ '" personId="' + personId + '"';
							numInfo += '<li class="userInfos" ' + str + '>';
							numInfo += '<a href="javascript:void(0);" data-reveal-id="userInfos"><img class="imgUrl" src="'
									+ imgUrl + '" alt="用户头像" /></a>';
							numInfo += '<div class="recInfo">';
							numInfo += '<p class="name">' + name + '</p>';
							numInfo += '<p class="finalTime">最后到访时间</p>';
							numInfo += '<p class="name">' + latestMatchTime
									+ '</p>';
							numInfo += '<a class="setWord" href="javascript:void(0);" data-reveal-id="leaveMessage" personId="'
									+ personId
									+ '" yname="'
									+ name
									+ '" imgUrl="' + imgUrl + '">设置留言</a>';
							numInfo += '<input type="hidden" name="matchId" value="'
									+ json.matchId + '">';
							numInfo += '</div></li>';
						}
					}
					$(".knowList").append(numInfo);
					if (flag2) {
						pager2 = new PageList("pageDIV2", {
							curPage : pageConfig.firstPage,
							totalCount : totalPage2,
						});
						pager2.init();
						flag2 = false;
					}
				}
			});
}

/**
 * 识别用户详情 TODO
 */
$('.knowList')
		.on(
				'click',
				'.userInfos',
				function() {
					var imgUrl = $(this).find('img').attr('src');
					var name = $(this).attr('yname');
					var ytime = $(this).attr('ytime');
					var personId = $(this).attr('personId');
					var registTime = $(this).attr('registTime');
					var noFrom = $(this).attr('noFrom');
					var _index = $(this).index();
					var str = '';
					$('#userScroll').html('');
					str = '<div class="setHead"><img src="' + imgUrl
							+ '" alt="头像" />' + '</div>'
							+ '<div class="leaveMessageTop">'
							+ '<p class="name">' + name + '</p>'
							+ '<p class="userInfoTime">'
							+ '<span>最后到访时间：</span>' + ytime + '</p>'
							+ '<p class="userInfoTime">' + '<span>注册时间：</span>'
							+ registTime.substr(0, 19) + '</p>'
							+ '<p class="userInfoTime">' + '<span>注册方式：</span>'
							+ getUserInfoByPersonId(noFrom) + '</p>'
							+ '</div>'
							+ '<input type="hidden" id="sendz" imgUrl="'
							+ imgUrl + '" name="' + name + '" personId="'
							+ personId + '">'
					$('#userInfos .dialogTop').html(str);

					$
							.post(
									config.API_HOST
											+ 'personManage/getPersonMatchedList',
									{
										'userkey' : getUserKey(),
										'pageNo' : 1,
										'pageCount' : config.pageCount,
										'personId' : personId
									},
									function(data) {
										var list = '';
										var matchList = data.results.list;
										for ( var i in matchList) {
											var item = matchList[i];
											list += '<li><br/>'
													+ '<div class="time">'
													+ '<p class="date">'
													+ item.createTime.substr(0,
															10)
													+ '</p>'
													+ '<p class="btn" '
													+ " onclick='showSourceImg(\""
													+ item.sourceImg
													+ "\");'"
													+ 'style="color: black;padding:0.1em 0.2em;font-size:12px;">查看场景图</p>'
													+ '<p class="num">'
													+ item.createTime.substr(
															11, 12) + '</p>'
													+ '</div> <img src="'
													+ item.facetrackImage + '"';
											list += " onclick='seachImgs(\""
													+ item.facetrackId
													+ "\");'";
											list += ' alt="" />' + '<hr />'
													+ '</li>';
										}
										$('#userScroll').html(list);
									})
				});

/**
 * 记录动态图片 TODO
 * 
 * @param facetrackId
 */
function seachImgs(facetrackId) {

	$.post(config.API_HOST + "facetrackManage/getFacetrackImgs", {
		'userkey' : getUserKey(),
		'count' : 0,
		'facetrackId' : facetrackId
	}, function(data) {
		$('#tab').css('display', 'block');
		$('#tab').on('click', function() {
			$('#tab').css('display', 'none');
			clearInterval(int);// 清除循环
			return false;
		});
		str = "";
		if (checkJson(data) && data.results != '') {
			var results = data.results;
			var imgs = results.imgs;
			for (var i = 0; i < results.size; i++) {
				str += '<img  src="' + results.imgHead + imgs[i]
						+ '" alt="" />';
			}
			$('#tab #tabContent').html(str);
			var images = $('#tab').find('img');
			var pos = 0;
			var len = images.length;

			var int = self.setInterval(function() {
				images[pos].style.display = 'none';
				pos = ++pos == len ? 0 : pos;
				images[pos].style.display = 'inline';
			}, 100);
			$('.close-reveal-modal').on('click', function() {
				$('#tab').css('display', 'none');
				clearInterval(int);
			})
		} else {
			alert(data.msg);
		}

	})

}

/**
 * 展示记录现场图片 TODO
 * 
 * @param sourceImg
 */
function showSourceImg(sourceImg) {
	$('#tab').css('display', 'block');
	$('#tab').on('click', function() {
		$('#tab').css('display', 'none');
		return false;
	});

	var str = '<img  src="' + sourceImg + '" alt="" />';
	$('#tabContent').html(str);

	$('.close-reveal-modal').on('click', function() {
		$('#tab').css('display', 'none');

	})
}

/**
 * 查询未识别记录 TODO
 */
$('.search')
		.on(
				'click',
				function() {
					var imgUrl = $('#sendz').attr('imgUrl');
					var name = $('#sendz').attr('name');
					var personId = $('#sendz').attr('personId');
					var str = '';
					str = '<div class="setHead">' + '<img src="'
							+ imgUrl
							+ '" alt="头像" />'
							+ '</div>'
							+ '<div class="leaveMessageTop">'
							+ '<p class="name">'
							+ name
							+ '</p>'
							+ '<span class="searchItem">智能分析查找</span>'
							+ '<div class="searchTimeInfo">'
							+ '<div class="addSex">'
							+ '<div class="pItem current" vl="0.5">'
							+ '半小时<input name="hour" type="radio" value="1" class="radio"'
							+ 'checked="">'
							+ '</div>'
							+ '<div class="pItem" vl="4">'
							+ '4小时<input name="hour" type="radio" value="2" class="radio">'
							+ '</div>'
							+ '<div class="pItem" vl="12">'
							+ '12小时<input name="hour" type="radio" value="3" class="radio">'
							+ '</div>'
							+ '<div class="pItem" vl="24">'
							+ '24小时<input name="hour" type="radio" value="4" class="radio">'
							+ '</div>'
							+ '<div class="pItem" vl="25">'
							+ '自定义<input name="hour" type="radio" value="5" class="radio">'
							+ '</div>'
							+ '<div class="hourNum">'
							+ '<input type="text" value=""/>小时'
							+ '</div>'
							+ '</div>'
							+ '<a href="javascript:void(0);" class="searchBtn" personId="'
							+ personId + '">查找</a>' + '</div>' + '</div>'
					$('#searchResult .dialogTop').html(str);

					$('.JQ-slide-content').empty();

					// 智能分析查找选择时间
					var $options4 = $(".searchTimeInfo").find(".pItem");
					$options4
							.each(function() {
								var $option = $(this), $input = $option
										.find(":radio");
								$option
										.on(
												"click",
												function() {
													if (!$option
															.hasClass("current")) {
														$options4
																.removeClass("current");
														$options4
																.not($option)
																.each(
																		function() {
																			var $option = $(this), $input = $option
																					.find(":radio");
																			$input
																					.prop(
																							"checked",
																							false);
																		});
														$option
																.addClass("current");
														$input.prop("checked",
																true);
													}
												});
								if ($input.prop("checked")) {
									$option.addClass("current");
								}
							});
					// 选择定义时间
					$(".searchTimeInfo .addSex .pItem").click(function() {
						var num = $(this).index();
						if (num == 4) {
							$(".hourNum").show();
						} else {
							$(".hourNum").hide();
						}

					});
				});

/**
 * 查询未识别记录结果 TODO
 */
var flag = 1;
$('#searchResult .dialogTop').on(
		'click',
		'.searchBtn',
		function() {
			var personId = $(this).attr('personId');
			var limitTime = $('.current').attr('vl');

			$.post(config.API_HOST + 'personManage/getPersonUnMatchedList', {
				'userkey' : getUserKey(),
				"personId" : personId,
				'beginTime' : getBeginTime(limitTime),
				'endTime' : getEndTime()
			}, function(data) {
				console.log(data)
				var list = '';
				var matchList = data.results.list;
				for ( var i in matchList) {
					var item = matchList[i];
					var facetrackId = item.facetrackId;
					list += '<li id="imgId" personId="' + personId
							+ '" facetrackId="' + facetrackId + '"><img src="'
							+ item.facetrackImage + '" alt=""   />'
							+ '<p class="date">' + item.createTime + '</p>'
							+ '<div class="dialogBottom">'
							+ '<a href="javascript:void(0);" title="确定"'
							+ 'class="close-reveal-modal logConfim" personId="'
							+ personId + '" facetrackId="' + facetrackId
							+ '" personId="' + item.personId + '">确定</a>'
							+ '</div>' + '</li>';
				}
				$('.JQ-slide-content').empty();
				$('.JQ-slide-content').html(list);
				// 智能识别三张照片
				if (flag) {
					$("#searchInfoBottomCont").Slide();
					flag = 0;
				}
			})
		})

/**
 * 管理员确定记录 TODO
 */
$('.JQ-slide-content').on('click', ".logConfim", function() {
	var facetrackId = $(this).attr('facetrackId');
	var personId = $(this).attr('personId');

	$.post(config.API_HOST + "personManage/confirmFacetrackByPerson", {
		'userkey' : getUserKey(),
		"personId" : personId,
		'facetrackId' : facetrackId
	}, function(data) {
		alert(data.msg);
	})
});

/**
 * 设置留言 TODO
 */
$('.knowList')
		.on(
				'click',
				'.setWord',
				function() {
					$("#mytext").attr("value", "")
					$('.leaveMessage .dialogTop').html("");
					var imgUrl = '';
					imgUrl = $(this).attr('imgUrl');
					if (imgUrl.indexOf("http")) {
						imgUrl = "data:image/jpg;base64, " + imgUrl;
					}
					var name = $(this).attr('yname');
					var personId = $(this).attr('personId');
					var str = '';
					str = '<div class="setHead">' + '<img src="'
							+ imgUrl
							+ '" alt="头像" />'
							+ '</div>'
							+ '<div class="leaveMessageTop">'
							+ '<p class="name">'
							+ name
							+ '</p>'
							+ '<p class="nameSet">留言设置</p>'
							+ '<div class="addSex">'
							+ '<div class="pItem current">'
							+ '短期留言<input name="message" type="radio" value="1" class="radio" checked="checked">'
							+ '</div>'
							+ '<div class="pItem">'
							+ '长期留言<input name="message" type="radio" value="0" class="radio">'
							+ '</div>'
							+ '</div>'
							+ '<div class="shortMessage">'
							+ '<div class="timeChoose">'
							+ '开始时间：<input class="datainp" id="startDate" type="text"'
							+ 'placeholder="请选择" readonly>'
							+ '</div>'
							+ '<div class="timeChoose">'
							+ '结束时间：<input class="datainp" id="endDate" type="text"'
							+ 'placeholder="请选择" readonly>' + '</div>'
							+ '</div>' + '</div>'
							+ '<input type="hidden" id="personId" value="'
							+ personId + '">';

					$('.leaveMessage .dialogTop').html(str);

					// 设置留言选择类型
					var $options3 = $(".leaveMessage").find(".pItem");
					$options3
							.each(function() {
								var $option = $(this), $input = $option
										.find(":radio");
								$option
										.on(
												"click",
												function() {
													if (!$option
															.hasClass("current")) {
														$options3
																.removeClass("current");
														$options3
																.not($option)
																.each(
																		function() {
																			var $option = $(this), $input = $option
																					.find(":radio");
																			$input
																					.prop(
																							"checked",
																							false);
																		});
														$option
																.addClass("current");
														$input.prop("checked",
																true);
													}
												});
								if ($input.prop("checked")) {
									$option.addClass("current");
								}
							});
					// 选择留言类型
					$(".leaveMessage .addSex .pItem").click(function() {
						var num = $(this).index();
						if (num == 0) {
							$(".shortMessage").show();
						} else {
							$(".shortMessage").hide();
						}

					});
					// 短期留言开始时间和结束时间
					var start = {
						format : 'YYYY-MM-DD hh:mm:ss',
						minDate : $.nowDate(0), // 设定最小日期为当前日期
						isinitVal : true,
						festival : false,
						ishmsVal : false,
						maxDate : '2099-06-30 23:59:59', // 最大日期
						choosefun : function(elem, datas) {
							end.minDate = datas; // 开始日选好后，重置结束日的最小日期
						}
					};
					var end = {
						format : 'YYYY-MM-DD hh:mm:ss',
						minDate : $.nowDate(0), // 设定最小日期为当前日期
						festival : false,
						maxDate : '2099-06-16 23:59:59', // 最大日期
						choosefun : function(elem, datas) {
							start.maxDate = datas; // 将结束日的初始值设定为开始日的最大日期
						}
					};
					$('#startDate').jeDate(start);
					$('#endDate').jeDate(end);
				});

/**
 * 上传留言和时间 TODO
 */
$('.leaveMessage .dialogBottom .submit').on('click', function() {
	var personId = $('#personId').val();
	var messageType = $(':radio[name="message"]:checked').val();
	var startTime = $('#startDate').val();
	var endTime = $('#endDate').val();
	var msgBeginTime = 0;
	var msgEndTime = 0;
	if (messageType == 0) {
		msgBeginTime = null;
		msgEndTime = null;
	} else {
		if (endTime == null || endTime == "") {
			$(".pointMessage").html('留言结束时间不能为空！');
			$(".pointMessage").css('color', 'red');
			$(".leaveMessage").css("visibility", "visible");
			return;
		}
		msgBeginTime = (new Date(startTime)).getTime();
		msgEndTime = (new Date(endTime)).getTime();
		if (msgBeginTime > msgEndTime) {
			$(".pointMessage").html('结束时间不能小于开始时间');
			$(".pointMessage").css('color', 'red');
			$(".leaveMessage").css("visibility", "visible");
			return;
		}
	}
	var messageContent = $('#mytext').val();
	if (isEmpty(messageContent)) {
		// alert("留言内容不能为空");
		$(".pointMessage").html('留言内容不能为空！');
		$(".pointMessage").css('color', 'red');
		$(".leaveMessage").css("visibility", "visible");
		return;
	}

	$.post(config.API_HOST + 'personManage/uploadPersonInfo', {
		'userkey' : getUserKey(),
		"deviceId" : getDeviceId(),
		'personId' : personId,
		'message' : messageContent,
		'msgBeginTime' : msgBeginTime,
		'msgEndTime' : msgEndTime
	}, function(data) {
		if (checkJson(data)) {
			$(".pointMessage").html('留言添加成功！');
			$(".pointMessage").css('color', 'green');
			setTimeout(function() {
				$('.containers').removeClass('vague');
				$('#leaveMessage').css({
					'visibility' : 'hidden',
					'top' : '100px'
				});
			}, 1 * 1000)
		} else {
			$(".pointMessage").html(data.msg);
			$(".pointMessage").css('color', 'red');
		}
	})
});

/**
 * 获取用户的注册类型
 * 
 * @param personId
 * @returns {String}
 */
/**
 * 获取用户的注册类型
 * 
 * @param personId
 * @returns {String}
 */
function getUserInfoByPersonId(noFrom) {
	if (noFrom == config.AD || noFrom == config.FT) {
		return "后台注册";
	} else {
		return "手机注册";
	}
}