/**
 * 未识别用户详情 TODO
 */
$(".unknowList").on("click", ".oUserInfo", function() {
	var imageUrl = $(this).find('img').attr('src');
	var facetrackId = $(this).find('input').eq(0).val();
	var createTime = $(this).find('input').eq(1).val();
	createAnalysis(imageUrl, facetrackId, createTime);
});

/**
 * 
 * 生成智能分析 TODO
 * 
 * @param imgUrl
 * @param matchId
 */
function createAnalysis(imgUrl, facetrackId, createTime) {
	$.post(config.API_HOST + 'facetrackManage/getFacetrackInfo', {
		"userkey" : getUserKey(),
		"facetrackId" : facetrackId
	}, function(data) {
		var json = data;
		var str = '';
		str = '<img src="' + imgUrl + '" alt="头像" />';
		$('.setHead').html(str);

		var matchsList = json.results.matchs;
		var list = '';
		for ( var i in matchsList) {
			// 陌生人点击头像，添加的div内容，item.img可能有问题
			var item = matchsList[i];
			list += '<div class="pItem';
			if (i == 0) {
				list += ' current';
			}
			list += '">' + '<img src="' + item.headImage + '" alt="">'
					+ '<hr />' + '<input name="pay" type="radio" value="'
					+ item.personId + '" class="radio"';
			if (i == 0) {
				list += ' checked="checked"'
			}
			list += '> ' + '<span>' + item.name + '</span>';
			list += '<input class="persontag" type="hidden" value="'
					+ item.persontag + '"/>'
			list += '</div>';
		}
		list += '<input class="facetrackId" type="hidden" value="'
				+ facetrackId + '"/>';
		list += '<input class="createTime" type="hidden" value="' + createTime
				+ '"/>'
		$('.intContent').empty();// 置空

		$('.intContent').append(list);
		// 智能分析选择人物
		var $options2 = $(".intAnalysis").find(".pItem");
		$options2.each(function() {
			var $option = $(this), $input = $option.find(":radio");
			$option.on("click", function() {
				if (!$option.hasClass("current")) {
					$options2.removeClass("current");
					$options2.not($option).each(function() {
						var $option = $(this), $input = $option.find(":radio");
						$input.prop("checked", false);
					});
					$option.addClass("current");
					$input.prop("checked", true);
				}
			});
			if ($input.prop("checked")) {
				$option.addClass("current");
			}
		});
	})
}

/**
 * 智能分析添加facetrack到person TODO
 */
function addFacetrackToPerson() {
	var facetrackId = $('.intContent .facetrackId').val();
	var createTime = $('.intContent .createTime').val();
	var imageUrl = $('.intContent .current').find('img').attr('src');
	var name = $('.intContent .current').find('span').html();
	var persontag = $('.intContent .current .persontag').val();

	$.post(config.API_HOST + "facetrackManage/addFacetrackToPerson", {
		"userkey" : getUserKey(),
		"deviceId" : getDeviceId(),
		"facetrackId" : facetrackId,
		"persontag" : persontag
	}, function(data) {
		if (checkJson(data)) {
			buildUserSucc(imageUrl, name, createTime, './images/code1.jpg');
		} else {
			alert(data.msg);
		}
	});
}

/**
 * 智能分析无匹配用户，添加新用户 TODO
 */
$('#intelligentAnalysis').on('click', '.addNewUser', function() {
	var imageUrl = $('#intelligentAnalysis .setHead').find('img').attr('src');
	var facetrackId = $('.intContent .facetrackId').val();
	var createTime = $('.intContent .createTime').val();
	preCreateUser(imageUrl, facetrackId, createTime);
})

/**
 * 后台创建用户：完善用户信息 TODO
 * 
 * @param imageUrl
 * @param matchId
 * @param createTime
 */
function preCreateUser(imageUrl, facetrackId, createTime) {
	var str = '';
	str = '<a class="close-reveal-modal">&#215;</a>'
			+ '<div class="dialogTop">' + '<div class="setHead">'
			+ '<img src="'
			+ imageUrl
			+ '" alt="头像" /> <a '
			+ 'href="javascript:void(0);" title="修改头像">修改头像</a>'
			// 修改头像操作
			+ '<input type="file" id="editImg" accept="image/*"/>'
			+ '</div>'
			+ '<div class="addUser">'
			+ '<p class="title">新建用户</p>'
			+ '<p class="addName">'
			+ '<label for="addName">姓名</label><input type="text" name=""'
			+ 'id="addName">'
			+ '</p>'
			+ '<div class="addSex" id="addSex">'
			+ '<label>性别</label>'
			+ '<div class="pItem current">男<input name="sex" type="radio" value="1" class="radio"></div>'
			+ '<div class="pItem last">女<input name="sex" type="radio"'
			+ 'value="0" class="radio" >'
			+ '</div>'
			+ '</div>'
			+ '<div class="addSex" id="addVip">'
			+ '<label>Vip&nbsp;</label>'
			+ '<div class="pItem current">不是<input name="vip" type="radio" value="1" class="radio"></div>'
			+ '<div class="pItem last">是<input name="vip" type="radio"'
			+ 'value="0" class="radio" >'
			+ '</div>'
			+ '</div>'
			+ '<p class="addName">'
			+ '<label for="cardId">卡号</label><input type="text" name=""'
			+ 'id="cardId">'
			+ '</p>'
			+ '<p class="addName">'
			+ '<label for="birthday">生日</label>'
			+ '<input id="indate" type="text" placeholder="请选择"  readonly>'
			+ '</p>'
			+ '<div class="errorMessage" style="float:left"></div></div>'
			// 提示用户输入正确信息,errorMessage
			+ '</div>'
			+ '<div class="dialogBottom">'
			+ '<a href="javascript:void(0);" title="取消" class="close-reveal-modal" data-reveal-id="intelligentAnalysis" >取消</a>'
			+ '<a href="javascript:void(0);" id="Imsure" title="确定" '
			+ 'data-reveal-id="createUserSuccess" dataimg="'
			+ imageUrl
			+ '">确定</a>'
			+ '</div>'
			+ '<input type="hidden" id="facetrackId" value="'
			+ facetrackId
			+ '"><input type="hidden" id="createTime" value="'
			+ createTime
			+ '">';

	$(".createUser").css("visibility", "visible");
	$(".createUser").empty();
	$(".createUser").append(str);
	var $options = $("#addSex").find(".pItem");
	$options.each(function() {
		var $option = $(this), $input = $option.find(":radio[name='sex']");
		$option.on("click", function() {
			if (!$option.hasClass("current")) {
				$options.removeClass("current");
				$options.not($option).each(function() {
					var $option = $(this), $input = $option.find(":radio");
					$input.prop("checked", false);
				});
				$option.addClass("current");
				$input.prop("checked", true);
			}
		});
		if ($input.prop("checked")) {
			$option.addClass("current");
		}
	});
	var $options1 = $("#addVip").find(".pItem");
	$options1.each(function() {
		var $option = $(this), $input = $option.find(":radio[name='vip']");
		$option.on("click", function() {
			if (!$option.hasClass("current")) {
				$options1.removeClass("current");
				$options1.not($option).each(function() {
					var $option = $(this), $input = $option.find(":radio");
					$input.prop("checked", false);
				});
				$option.addClass("current");
				$input.prop("checked", true);
			}
		});
		if ($input.prop("checked")) {
			$option.addClass("current");
		}
	});

	$("#indate").jeDate({
		format : "YYYY-MM-DD",
		isTime : false,
		minDate : "2014-09-19 00:00:00",
		maxDate : ""+ time() +""
	})

	editImg();
}
function time() {
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
	return year + '-' + month + '-' + day + ' 00:00:00'; 
}
/**
 * 后台根据记录信息添加用户 TODO
 */
$("#createUser").on("click", "#Imsure", function() {
	// 陌生人下创建新用户确定按钮的绑定事件
	var imgUrl = $('#createUser').find('img').attr('src')
	var facetrackId = $('#createUser').find('#facetrackId').val();
	var createTime = $('#createUser').find('#createTime').val();
	var name = $('#createUser').find('#addName').val();
	var sex = $('#createUser').find(':radio[name="sex"]:checked').val();
	var createTime = $('#createUser').find('#createTime').val();
	var vip = $('#createUser').find(':radio[name="vip"]:checked').val();
	var cardId = $('#createUser').find('#cardId').val();
	var birthDay = $('#createUser').find('#indate').val();

	// 获取新建用户的id、名字、性别
	if (sex == null || sex == undefined) {
		sex = 1;// 默认为男
	}

	if (vip == null || sex == undefined) {
		vip = 1;// 默认非vip
	}

	if (name.length == 0) {
		$('.errorMessage').html('请输入用户信息！')
		return false;
	} else if (cardId == undefined || cardId.length == 0) {
		$('.errorMessage').html('请输入卡号！')
		return false;
	} else if (birthDay == undefined || birthDay.length == 0) {
		$('.errorMessage').html('请输入生日！')
		return false;
	} else {
		document.getElementById('createUser').style.visibility = 'hidden';
		// 检查图片地址，如果是base64，就用新上传的图片
		var imgHead = "";
		if (imgUrl.match(/base64/i)) {
			var data = imgUrl.split(',');
			imgHead = data[0] + ",";
			imgUrl = data[1];
		} else if (imgUrl.match(/http/)) {
		} else {
			imgUrl = "";// 空值或没上传图片
		}
		var admin = JSON.parse(getCookie("admin"));

		$.post(config.HOST + "/admin/createPersonByFacetrack", {
			"userkey" : getUserKey(),
			"deviceId" : getDeviceId(),
			'facetrackId' : facetrackId,
			'name' : name,
			'sex' : sex,
			"imgUrl" : imgUrl,
			"birthDay" : birthDay,
			"cardId" : cardId,
			"vip" : vip
		}, function(data) {
			if (checkJson(data)) {
				imgUrl = imgHead + imgUrl;
				buildUserSucc(imgUrl, name, createTime, data.results.qrCode);
			} else {
				alert(data.msg);
			}
		});
	}
});

/**
 * 完成页点击事件 TODO
 */
$('#createUserSuccess').on('click', '.close-reveal-modal', function() {
	window.location.reload();
})
