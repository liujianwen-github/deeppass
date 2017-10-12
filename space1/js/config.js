var host = "http://127.0.0.1";// 正式
var host = "http://192.168.1.10";// 测试

var config = {
	listenHost : '127.0.0.1',
	listenPort : '8050',

	// host : "http://127.0.0.1",
	// Deepdot接口地址
	deepdotHost : host + ':8000',
	appKey : '6119526c_d3bb_4710_b13e_56fd23fe3f32',

	// 显示照片的地址
	imageURL : host + ':3000/img/getsingleimg',

	// 打开门禁地址
	openDoor : '1',
	openDoorURL : host + ':8080/test/servlet/Door',

	// cardInfoURL :
	// "http://127.0.0.1:8080/faceclient/api/ClientAPI?Method=writeFile&Version=1.0",
	cardInfoURL : host + ':8080/deepFace/Test',
	readCardInfo : host + ':8080/deepFace/readCardInfo',

	cardInfoPath : '/opt/deepFace/cardInfo',
	vipInfoPath : '/opt/deepFace/vipInfo',
	// 匹配值
	matchscore : 0.85,
	vipValue : 1,
	runTime : 0.5 * 1000,
	notMatchStatus : false,
};
/**
 * TODO 门状态
 */
var doorStatus = {
	closeTheDoor : 0,
	waitCard : 1,
	cardFail : 2,
	openTheDoor : 3,// 开门
};

/**
 * TODO 获取信息
 */
function getUnProcessPerson1() {
	var params = getParams();
	params.count = 1;
	params.matched_count = 3;
	var request = {
		"jsonrpc" : "2.0",
		"method" : "getunprocessedmatchedfacetrack",
		"params" : params,
		"id" : 1
	}
	var results = getInfo(request);
	if (results != null && results != '') {
		console.log("success");
		var objDetail = results.ids[0]; // 只取第一个匹配的
		if (objDetail.count > 0) {
			var personId = objDetail.matchs[0].id_person;
			results = getPersonInfo(personId);
			if (results != "") {
				if (results.Vip == config.vipValue
						&& objDetail.matchs[0].percent > config.matchscore) {
					openTheDoor(results);// vip且分值高-开门
					addFaceTrackToPerson(results.personId, objDetail.id);//
					// 添加faceTrack
				} else {
					DealStep(doorStatus.waitCard);
					addFaceTrackId(objDetail.id);// 分值不够
				}
			} else {
				// 无存储信息
				// addFaceTrackId(objDetail.id);// 不是vip

			}
		}
		addFaceTrackId(objDetail.id);// 分值不够
		ackFacetrack(objDetail.id);
	}
}

/**
 * TODO 创建person
 * 
 * @param sex
 * @returns
 */
function createPerson(sex) {
	var params = getParams();
	var info = {
		"sex" : sex
	}
	params.info = info;
	var request = getRequest("createperson", params);
	var results = getInfo(request);
	if (results != null && results != '') {
		// alert(results.id_person);
		return results.id_person;
	}
}

function addImgToPerson(idPerson, img) {
	var params = getParams();
	params.id_person = idPerson;
	params.img = img;
	var request = getRequest("addimgtoperson", params);
	var results = getInfo(request);
	return results;
}

function addFaceTrackToPerson(idPerson, faceTrackId) {
	var params = getParams();
	params.id_person = idPerson;
	params.id_facetrack = faceTrackId;
	var request = getRequest("addfacetracktoperson", params);
	var results = getInfo(request);
	return results;
}

function matchTacetrack2SinglePerson(idPerson, faceTrackId) {
	var params = getParams();
	params.id_person = idPerson;
	params.id_facetrack = faceTrackId;
	var request = getRequest("matchfacetrack2singleperson", params);
	var results = getInfo(request);
	if (results != null && results != '') {
		if (results.percent > config.matchscore) {
			return true;// 匹配
		}
	}
	return false;
}
function cropface(img) {
	var params = getParams();
	var style = {
		"glasses" : false,
		"glasses_id" : 0,
		"hair" : false,
		"hair_id" : 0
	}
	params.img = img;
	params.style = style;
	var request = getRequest("cropface", params);
	var results = getInfo(request);
	return results.img;
}

// 回应已成功接收此facetrack
function ackFacetrack(facetrackId) {
	var params = getParams();
	params.id = facetrackId;
	var request = getRequest("ackfacetrack", params);
	var results = getInfo(request);
}
function getfacetrackinfo(facetrackId) {
	var params = getParams();
	params.id = facetrackId;
	var request = getRequest("getfacetrackinfo", params);
	var results = getInfo(request);
	return results.imgs;
}
function getpersoninfo(personId) {
	var params = getParams();
	params.id = personId;
	var request = getRequest("getpersoninfo", params);
	var results = getInfo(request);
	return results.imgs;
}

/**
 * TODO 获取接口信息
 * 
 * @param request
 * @returns {String}
 */
function getInfo(request) {
	console.log(request.method);
	var xhr = new XMLHttpRequest();
	xhr.open("post", config.deepdotHost, false);
	xhr.setRequestHeader("Content-Type", "application/json");
	// console.log(JSON.stringify(request));
	var results = "";
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			var strTmp = xhr.response;
			var obj = JSON.parse(strTmp);
			// console.log(obj);
			if (obj.result.code == 0) {
				// 调用成功
				results = obj.result.results;
				// console.log(results);
			} else {
				// alert(request.method);
				console.log(request.method + " error --" + JSON.stringify(obj));
			}
		}
	};
	xhr.send(JSON.stringify(request));
	return results;
}

function getParams() {
	var params = {
		"appkey" : config.appKey
	}
	return params;
}
/**
 * 
 * @returns
 */
function getRequest(method, params) {
	var request = {
		"jsonrpc" : "2.0",
		"method" : method,
		"params" : params,
		"id" : 1
	}
	return request;
}

/**
 * 
 * @param ImgD
 * @param FitWidth
 * @param FitHeight
 * @returns
 */
function DrawImage(ImgD, FitWidth, FitHeight) {
	var image = new Image();
	image.src = ImgD.src;
	if (image.width > 0 && image.height > 0) {

		if (image.width > FitWidth) {
			ImgD.width = FitWidth;
			ImgD.height = (image.height * FitWidth) / image.width;
			if (ImgD.height > FitHeight) {
				ImgD.height = FitHeight;
				ImgD.width = (image.width * FitHeight) / image.height;
			}
		} else if (image.height > FitHeight) {
			ImgD.height = FitHeight;
			ImgD.width = (image.width * FitHeight) / image.height;
			if (image.width > FitWidth) {
				ImgD.width = FitWidth;
				ImgD.height = (image.height * FitWidth) / image.width;
			}
		} else {
			ImgD.width = image.width;
			ImgD.height = image.height;
		}
	}
	return image.toString();
}

/**
 * TODO 获取person信息
 * 
 * @param personId
 * @returns {String}
 */
function getPersonInfo(personId) {
	return searchInfo1(null, personId);
}

/**
 * TODO
 * 
 * @param cardId
 * @returns {String}
 */
function getCardInfo(cardId) {
	return searchInfo1(cardId, null);
}

/**
 * TODO
 * 
 * @param name
 */
function searchInfo1(cardId, personId) {
	var info = "";
	// 数据存放格式为多个文件
	$.ajax({
		type : "get",
		url : config.readCardInfo,
		data : {
			"cardId" : cardId,
			"personId" : personId,
			"cardInfoPath" : config.cardInfoPath,
			"vipInfoPath" : config.vipInfoPath,
		},
		async : false,
		dataType : "json",
		success : function(data) {
			if (data.code == data.SUCC_CODE) {
				console.log('获取信息成功');
				// console.log(data.results.cardInfo);
				info = JSON.parse(data.results.cardInfo);
			}
			// alert(JSON.stringify(res));
		},
		error : function(err) {
			console.log('获取信息失败');
			console.log(err);
		}
	});
	return info;
}

/**
 * TODO 判断是否为空
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
 * TODO 开门
 * 
 * @param personInfo
 */
function openTheDoor(personInfo) {

	function time() {
		var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes()
		var s = date.getSeconds();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var _date = date.getDate();
		var Nowtime = toDou(h) + ':' + toDou(m) + ":" + toDou(s);
		var Nowday = year + '年' + toDou(month) + '月' + toDou(_date) + '日';
		return [ Nowtime, Nowday ];
	}

	var imageURL = config.imageURL + "?" + personInfo.imgUrl;
	var str1 = '<dl class="dlItem"><dt><img src="' + imageURL
			+ '" class="img-circle"/></dt><dd>' + '<h2>' + personInfo.userName
			+ '</h2><p>' + time()[0] + '</p><p>' + time()[1] + '</p></dd></dl>';
	$(".slideContent").append(str1);
	if (count > 0) {
		doscroll();
	}
	count++;
	// console.log("count = " + count + " -- " + time()[0]);
	DealStep(doorStatus.openTheDoor);

}
