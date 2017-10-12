/**
 * 页面初始化 TODO
 */
var DEFAULT_MSG = "无到访记录";

/**
 * 路径 TODO
 */
var HOST = "/faceserver";
// var HOST = "http://101.201.106.53/faceserver";
// var HOST = "http://127.0.0.1:8080/faceserver";

// function pageInit() {
// if (!isEmpty(getCookie("admin"))) {
// var admin = JSON.parse(getCookie("admin"));
// $(".locationInfo").html(admin.description);// 设备信息
// $.post(HOST + '/admin?Method=getPerson', {
// "adminId" : admin.adminId,
// "appKey" : admin.appKey,
// "deviceId" : admin.deviceId
// }, function(data) {
// var json = eval("(" + data + ")");
// if (json.code == json.SUCC_CODE) {
// visitData(json);// visitData元素数据
// unknowList(json);
// knowList(json);
// useList(json);
// }
// });
// } else {
// window.location.href = 'login.html';
// }
// }

function pageInit() {
	$.post(HOST + '/admin?Method=getPerson', {
		"adminId" : "d085d9d9-0133-4663-8fe9-761762722597",
		"appKey" : "6119526c_d3bb_4710_b13e_56fd23fe3f32",
		"deviceId" : "aaa-aaa-001"
	}, function(data) {
		var json = eval("(" + data + ")");
		if (json.code == json.SUCC_CODE) {
			visitData(json);// visitData元素数据
			unknowList(json);
			knowList(json);
			useList(json);
		}
	});
}
/**
 * 显示栏 TODO
 * 
 * @param json
 */
function visitData(json) {
	var numInfo = '';
	if (json.code == json.SUCC_CODE) {
		numInfo += '<div class="dataInfo">今日到访<span>' + json.full
				+ '</span></div>';
		numInfo += '<div class="dataInfo">陌生人<span>' + json.unknow
				+ '</span></div>';
		numInfo += '<div class="dataInfo">识别用户<span>' + json.know
				+ '</span></div>';
	}
	$(".visitData").append(numInfo);
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
			numInfo += '<li class="oUserInfo">';
			numInfo += '<a href="javascript:void(0);"data-reveal-id="intelligentAnalysis"><img src="'
					+ json.imageUrl + '" alt="头像信息" /></a>';
			numInfo += '<div class="time">到访时间<span>'
					+ getShortTime(json.createTime) + '</span></div>';
			numInfo += '<input type="hidden" name="matchId" value="'
					+ json.matchId + '">';
			numInfo += '</li>';
		}
	}
	$(".unknowList").append(numInfo);
}

/**
 * 未识别用户详情 TODO
 */
$(".unknowList").on("click", ".oUserInfo", function() {
	var imageUrl = $(this).find('img').attr('src');
	var matchId = $(this).find('input').val();
	var createTime = $(this).find('span').val();
	createAnalysis(imageUrl, matchId);
});

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
			var str = 'yname="' + json.name + '" ytime="'
					+ getLongTime(json.createTime) + '" matchId="'
					+ json.matchId + '" imgUrl="' + json.imageUrl
					+ '" registTime="' + getLongTime(json.registTime)
					+ '" noFrom="' + json.noFrom + '" userId="' + json.userId
					+ '"';
			numInfo += '<li class="userInfos" ' + str + '>';
			numInfo += '<a href="javascript:void(0);" data-reveal-id="userInfos"><img src="'
					+ json.imageUrl + '" alt="用户头像" /></a>';
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
			var str = 'yname="' + json.name + '" ytime="' + lastTime
					+ '" imgUrl="' + json.imageId + '" registTime="'
					+ getLongTime(json.createT) + '" noFrom="' + json.noFrom
					+ '" userId="' + json.userId + '"';

			numInfo += '<li class="userInfos" ' + str + '>';
			numInfo += '<a href="javascript:void(0);"data-reveal-id="userInfos"><img src="data:image/jpg;base64, '
					+ json.imageId + '" alt="用户头像" /></a>';
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
 * TODO 退出登录
 */
function logout() {
	setCookie("admin", '');
	window.location.href = 'login.html';
}

/**
 * 预创建用户 TODO
 * 
 * @param imageUrl
 * @param matchId
 * @param createTime
 */
function preCreateUser(imageUrl, matchId) {
	var str = '';
	str = '<a class="close-reveal-modal">&#215;</a>'
			+ '<div class="dialogTop">' + '<div class="setHead">'
			+ '<img src="'
			+ imageUrl
			+ '" alt="头像" /> <a '
			+ 'href="javascript:void(0);" title="修改头像">修改头像</a>'
			// 修改头像操作
			//
			//
			//
			+ '<input type="file" id="editImg" accept="image/*"/>'
			+ '</div>'
			+ '<div class="addUser">'
			+ '<p class="title">新建用户</p>'
			+ '<p class="addName">'
			+ '<label for="addName">姓名</label><input type="text" name=""'
			+ 'id="addName">'
			+ '</p>'
			+ '<div class="addSex">'
			+ '<label>性别</label>'
			+ '<div class="pItem current">男<input name="sex" type="radio" value="1" class="radio"></div>'
			+ '<div class="pItem last">女<input name="sex" type="radio"'
			+ 'value="0" class="radio" >'
			+ '</div>'
			+ '</div>'
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
			+ '<input type="hidden" id="matchId" value="' + matchId + '">';

	$(".createUser").css("visibility", "visible");
	$(".createUser").empty();
	$(".createUser").append(str);

	var $options = $(".createUser").find(".pItem");
	$options.each(function() {
		var $option = $(this), $input = $option.find(":radio");
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

	editImg();
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

$('.JQ-slide-content').on('click', ".logConfim", function() {
	var userId = $(this).attr('userId');
	var matchId = $(this).attr('matchId');
	var personId = $(this).attr('personId');
	$.ajax({
		url : HOST + "/servlet/admin?Method=addUserByAdmin",
		data : {
			'matchId' : matchId,
			'personId' : personId
		},
		type : "POST",
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data.SUCC_CODE == data.code) {
				alert("记录确认成功");
			} else {
				alert(data.msg);
			}
		}
	});
});

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
	if (time == "")
		return "";
	var times = time.split(' ');
	return times[1].substr(0, 5);
}

/**
 * TODO
 * 
 * @param imgUrl
 * @param matchId
 */
function createAnalysis(imgUrl, matchId) {

	$.post(HOST + '/servlet/user?Method=getUnknowUserImgs', {
		'matchId' : matchId
	}, function(data) {
		var json = eval("(" + data + ")");
		var str = '';
		str = '<img src="' + imgUrl + '" alt="头像" />';
		$('.setHead').html(str);

		// var addUser = '<a class="analysis close-reveal-modal"'
		// + 'href="javascript:void(0);" title="无匹配用户"'
		// + 'data-reveal-id="createUser" dataimg="' + imgUrl
		// + '">无匹配用户</a>';
		//
		// $('.addUser').html(addUser);

		var imglist = json.results.imgs;
		var list = '';
		for ( var i in imglist) {
			var item = imglist[i];
			list += '<div class="pItem';
			if (i == 0) {
				list += ' current';
			}
			list += '">' + '<img src="data:image/jpg;base64, ' + item.img
					+ '" alt="">' + '<hr />'
					+ '<input name="pay" type="radio" value="' + item.personId
					+ '" class="radio"';
			if (i == 0) {
				list += ' checked="checked"'
			}
			list += '> ' + '<span>' + item.name + '</span>';
			list += '</div>';
		}
		list += '<input class="matchId" type="hidden" value="' + matchId
				+ '"/>'
		$('.intContent').empty();
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
 * 智能分析无匹配用户，添加新用户
 */
$('#intelligentAnalysis').on('click', '.addNewUser', function() {
	var imageUrl = $('#intelligentAnalysis .setHead').find('img').attr('src');
	var matchId = $('.intContent .matchId').val();
	preCreateUser(imageUrl, matchId);
})
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
