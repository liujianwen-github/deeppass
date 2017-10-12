var faceTrackId = '';// 当前选择的faceTrack
var imgUrl = '';// 上传的图片
var personId = '';

/**
 * TODO 页面加载
 */
$(document).ready(function() {
	QueryNewPerson();
});

/**
 * TODO 刷新列表
 */
function refresh() {
	window.location.reload();
}

// 进度条
function go(Num, wd) {
	document.getElementsByClassName("bar")[Num].style.width = wd + "%";
}

/**
 * TODO 点击完成
 */
function sendMine() {
	var userName = $('#userName').val();
	var userId = $('#userId').val();
	var Vip = 0;
	if ($('#che').is(':checked')) {
		Vip = config.vipValue;
	}
	if (userName == '') {
		alert("请填写姓名");
	} else if (userId == '') {
		alert("请填写卡号");
	} else if (isEmpty(imgUrl)) {
		alert("请上传图片");
	} else if (faceTrackId == '') {
		alert("请选择要添加的记录");
	} else {
		imgUrl = cropface(imgUrl);
		var idPerson = createPerson(-1);
		// console.log(idPerson);
		// console.log(imgUrl);
		var results = addImgToPerson(idPerson, imgUrl);
		if (results != null) {
			alert("图片添加失败");
			return;
		} else {
			if (results != null) {
				alert("记录添加失败");
				return;
			}
		}

		var imgs = getpersoninfo(idPerson);// 系统照片
		var imageURL = 'type=1&appid=' + config.appKey + '&id=' + idPerson
				+ '&fn=' + imgs[0];

		var cardInfo = {
			'personId' : idPerson,
			'userName' : userName,
			'userId' : userId,
			'Vip' : Vip,
			'imgUrl' : imageURL,
			"cardInfoPath" : config.cardInfoPath,
			"vipInfoPath" : config.vipInfoPath
		};

		$.post(config.cardInfoURL, {
			'cardInfo' : JSON.stringify(cardInfo)
		}, function(data) {
			var json = eval('(' + data + ')');
			alert(json.msg);
			if (json.code == 0) {
				imgUrl = '';// 上传成功后，重置为空
				addFaceTrackToPerson(idPerson, faceTrackId);
				ackFacetrack(faceTrackId);
				faceTrackId = '';
				$(".imgs").html("");
				$("#userName").attr("value", '');
				$("#userId").attr("value", '');
				$("#che").attr("checked", false);
				refresh();
			}
		});
	}
}

function QueryNewPerson() {
	var xhr = new XMLHttpRequest();
	xhr.open("post", config.deepdotHost);
	xhr.setRequestHeader("Content-Type", "application/json");
	var request = '{\"jsonrpc\":\"2.0\",\"method\":\"getunprocessedmatchedfacetrack",\"params\":{\"appkey\":\"'
			+ config.appKey + '\", \"count\":6, \"matched_count\":3},\"id\":1}';
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			var strTmp = xhr.response;
			var obj = JSON.parse(strTmp);
			if (obj.result.code == 0) // 调用成功
			{
				var results = obj.result.results;
				if (results != null && results != '') {
					var objDetail = results.ids;
					// console.log(JSON.stringify(objDetail));
					var length = objDetail.length;
					var str = '';

					for ( var i in objDetail) {
						var item = objDetail[i];
						// alert(JSON.stringify(item));
						str += '<li class="pointer" '
								+ " onclick='faceTrackInfo(\""
								+ item.id
								+ "\");'"
								+ '>'
								+ '<div class="listLeft">'
								+ '<div class="graph">'
								+ '<strong class="bar" style="width:1%;"></strong>'
								+ '</div>' + '<span class="whichLike">'
						if (item.count > 0) {
							str += parseFloat(item.matchs[0].percent)
									.toFixed(4) * 100
						} else {
							str += "0"
						}
						str += ' %</span>' + '</div>'
								+ '<div class="listRight">' + time1()
								+ '</div>' + '</li>';
					}

					$('#list').append(str);

					for ( var i in objDetail) {
						var item = objDetail[i];
						if (item.count > 0) {
							go(i, parseFloat(item.matchs[0].percent) * 100);
						} else {
							go(i, 0);
						}
						// alert(JSON.stringify(item));
						// AckFacetrack(item.id); //
						// 汇报此facetrack已成功获取，部署时需取消此注释
					}
				}
			}
		}
	};
	xhr.send(request);
	return true;
}

// 回应已成功接收此facetrack
function AckFacetrack(facetrackId) {
	var xhr = new XMLHttpRequest();
	xhr.open("post", config.deepdotHost);
	xhr.setRequestHeader("Content-Type", "application/json");
	var request = '{\"jsonrpc\":\"2.0\",\"method\":\"ackfacetrack",\"params\":{\"appkey\":\"'
			+ config.appKey + '\", \"id\":\"' + facetrackId + '\"},\"id\":1}';
	xhr.send(request);
	return false;
}

function faceTrackInfo(facetrackId) {
	faceTrackId = facetrackId;
	$('#message').css('display', 'block');
	var xhr = new XMLHttpRequest();
	xhr.open("post", config.deepdotHost);
	xhr.setRequestHeader("Content-Type", "application/json");
	var request = '{\"jsonrpc\":\"2.0\",\"method\":\"getfacetrackinfo",\"params\":{\"appkey\":\"'
			+ config.appKey + '\", \"id\":\"' + facetrackId + '\"},\"id\":1}';
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			var strTmp = xhr.response;
			var obj = JSON.parse(strTmp);
			if (obj.result.code == 0) {// 调用成功
				var imgs = obj.result.results.imgs;
				if (imgs.length > 0) {
					var str = '';
					for (var i = 0; i < imgs.length; i++) {
						var imageURL = config.imageURL + '?type=0&appid='
								+ config.appKey + '&id=' + facetrackId + '&fn='
								+ imgs[i];
						str += '<img src="' + imageURL + '"/>'
						if (i == 2) {
							break;
						}
					}
					$('.imgs').html(str);
				}
			}
		}
	};
	xhr.send(request);
}

// 获取上传按钮
var input1 = document.getElementById("upload");

if (typeof FileReader === 'undefined') {
	input1.setAttribute('disabled', 'disabled');
} else {
	input1.addEventListener('change', readFile, false);
}
function readFile() {
	var file = this.files[0];// 获取上传文件列表中第一个文件
	if (!/image\/\w+/.test(file.type)) {
		alert("文件必须为图片！");
		return false;
	}
	// console.log(file);
	var reader = new FileReader();// 实例一个文件对象
	reader.readAsDataURL(file);// 把上传的文件转换成url
	// 当文件读取成功便可以调取上传的接口
	reader.onload = function(e) {
		// console.log(this.result);//文件路径
		// console.log(e.target.result);//文件路径
		var data = e.target.result.split(',');
		var tp = (file.type == 'image/png') ? 'png' : 'jpg';
		imgUrl = data[1]; // 图片的url，去掉(data:image/png;base64,)
	};
};

function stringToBytes(str) {
	var ch, st, re = [];
	for (var i = 0; i < str.length; i++) {
		ch = str.charCodeAt(i); // get char
		st = []; // set up "stack"
		do {
			st.push(ch & 0xFF); // push byte to stack
			ch = ch >> 8; // shift value down by 1 byte
		} while (ch);
		// add stack contents to result
		// done because chars have "wrong" endianness
		re = re.concat(st.reverse());
	}
	// return an array of bytes
	console.log(re);
	return re;
}