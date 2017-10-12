var g_personID = ""; // 当前识别成功的personID
var g_personTime = new Date().getTime(); // 识别出当前person的时间
var g_ICCardLen = 8; // IC卡，卡号长度
var g_personKeepTime = 10000; // 人脸识别成功后保留时间(单位：毫秒)。 即：刷脸、刷卡允许间隔的最大时间。
var arrLength = 3;
var faceTrackIds = new Array(arrLength);
var faceT = '';
var count = 0;
var doorOperationTime = 0;
var doorOperationLimit = 10 * 1000;

// 自动运行
$(document).ready(function() {
	MyAutoRun();
});

function MyAutoRun() {
	// 1. 查询刷脸信息
	setInterval(function() {
		if (!config.notMatchStatus) {
			getUnProcessPerson1();
			QueryICCard();
		}
	}, config.runTime);

	// 2. 查询刷IC卡信息
	// setInterval(function() {
	// }, config.runTime);

}

// 读取IC 卡号
function QueryICCard() {

	if (doorOperationTime != 0
			&& doorOperationTime + doorOperationLimit < new Date().getTime()) {
		DealStep(doorStatus.closeTheDoor);
		doorOperationTime = 0;
	}
	// IC 卡号输入到光标所在输入框，需要一定时间
	var cardId = $('#edt_ICCard').val();
	if (!isEmpty(cardId) && cardId.length >= g_ICCardLen) {
		// 刷卡识别
		// console.log(faceTrackIds);
		var bool = false;
		var person = getCardInfo(cardId);
		if (person != "") {
			if (faceT != "") {
				var idPerson = person.personId;
				for ( var i in faceTrackIds) {
					var faceTrackId = faceTrackIds[i];
					if (!isEmpty(faceTrackId)) {
						if (matchTacetrack2SinglePerson(idPerson, faceTrackId)) {
							// console.log(i);
							// console.log(faceTrackIds);
							faceTrackIds.splice(i, 1);
							// console.log(faceTrackIds);
							faceT = '';
							bool = true;
							openTheDoor(person);
							break;
						}
					}
				}
				if (!bool) {
					faceT = '';
					// count--;
					notMatch(person);
				}
				doorOperationTime = new Date().getTime();
			}
		} else {
			alert("无卡号信息");
		}
	}
	$("#edt_ICCard").attr("value", '');
}

/**
 * TODO 添加faceTrackId
 * 
 * @param faceTrackId
 */
function addFaceTrackId(faceTrackId) {
	faceT = faceTrackId;
	// var faceInfo = {
	// "faceTrackId" : faceTrackId,
	// "personInfo" : person
	// }
	var length = faceTrackIds.unshift(faceTrackId);
	if (length > arrLength) {
		faceTrackIds.pop();
	}
}

/**
 * TODO 根据icCard，查找对应的personID
 * 
 * @param icCard
 * @returns {String}
 */
function GetPersonIDByIC(icCard) {
	var personID = "";
	for (var i = 0; i < personDB.length; i++) {
		if (personDB[i][0] == icCard) {
			personID = personDB[i][1];
			break;
		}
	}
	return personID;
}
/**
 * 将facetrack图像导入person TODO
 */
function Addfacetracktoperson() {
	var xhr = new XMLHttpRequest();
	xhr.open("post", config.deepdotHost);
	xhr.setRequestHeader("Content-Type", "application/json");
	var request = '{\"jsonrpc\":\"2.0\",\"method\":\"addfacetracktoperson",\"params\":{\"appkey\":\"'
			+ config.appKey
			+ '\", \"id_facetrack\":\"'
			+ objDetail.id
			+ '\",\"id_person\":\"'
			+ objDetail.matchs[0].id_person
			+ '},\"id\":1}';
	send(request);
	return;
}

// 处理不同阶段的状况
function DealStep(step) {
	PlaySound(step);
	if (step == 0) // 正在识别中
	{
		$('#shibie').html('正在识别中...');

	}
	if (step == 1) // 刷脸成功，等待刷卡
	{
		$('#shibie').html('刷脸成功，等待刷卡');
		doorOperationTime = new Date().getTime();// 等待开门的时间
	}
	if (step == 2) // 刷脸成功，刷卡失败
	{
		$('#shibie').html('刷脸成功,刷卡失败');

	} else if (step == 3) // 刷脸成功，刷卡成功: 开门
	{
		if (config.openDoor == '1') {
			doorOperationTime = new Date().getTime();// 开门时间
			$('#shibie').html('成功，开门！');
			// OpenDoor(); //开门
		}
	}
}

// 开门，5秒钟后关门
function OpenDoor() {
	// 先声明一个异步请求对象
	var xmlHttpReg = null;
	if (window.ActiveXObject) {// 如果是IE
		xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttpReg = new XMLHttpRequest(); // 实例化一个xmlHttpReg
	}
	// 如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
	if (xmlHttpReg != null) {
		var url = config.openDoorURL; // 此处IP需换成实际值(web项目test部署的IP)
		xmlHttpReg.open("get", url, true);
		xmlHttpReg.send();
	}
}
/**
 * TODO
 * 
 * @param imageURL
 * @param idPerson
 */
function notMatch(person) {
	config.notMatchStatus = true;
	var imageURL = config.imageURL + "?" + person.imgUrl;
	var idPerson = person.personId;
	console.log("刷脸和刷卡不匹配");
	// 刷脸和刷卡不匹配
	DealStep(doorStatus.cardFail);
	// 弹窗
	var shibie = $('#shibie');
	var yanzheng = $('#yanzheng');
	var yes = $('#yes');
	var no = $('#no');
	yanzheng.css("display", "block");

	var str = '<img class="matchInfo" src="' + imageURL + '" personId="'
			+ idPerson + '" faceTrackId="' + faceTrackIds[0] + '"/>';
	$('.personImg').html(str);

	var pimgs = getfacetrackinfo(faceTrackIds[0]);// 现场照片
	var imageURL1 = config.imageURL + '?type=0&appid=' + config.appKey + '&id='
			+ faceTrackIds[0] + '&fn=' + pimgs[0];
	var str1 = '<img src="' + imageURL1 + '"/>';
	$('.facetrackImg').html(str1);

	yes.bind("click", function() {
		var matchInfo = $(".matchInfo");
		var personId = matchInfo.attr("personId");
		var faceTrackId = matchInfo.attr("faceTrackId");
		var ss = addFaceTrackToPerson(personId, faceTrackId);
		if (ss == undefined) {
			faceTrackIds.splice(0, 1);
			openTheDoor(person);
			DealStep(doorStatus.openTheDoor);
			yanzheng.css("display", "none");
		}
		config.notMatchStatus = false;
	});
	no.bind("click", function() {
		yanzheng.css("display", "none");
		config.notMatchStatus = false;
		DealStep(doorStatus.closeTheDoor);
	});
}

// 播放对应的声音
function PlaySound(step) {
	var strName = "";
	if (step == 1) // 刷脸成功，等待刷卡
	{
		strName = "card.ogg";
	} else if (step == 2) // 刷脸成功，刷卡失败
	{
		strName = "fail.ogg";
	} else if (step == 3) // 刷脸成功，刷卡成功
	{
		strName = 'success.ogg';
	} else {
		return;
	}
	obj = document.getElementById("chatAudio");
	if (!obj) {
		$(
				'<audio id="chatAudio">' + '<source src = "sound/' + strName
						+ '" type = "audio/mpeg"> ' + '</audio> ').appendTo(
				'body');
	}
	$("#chatAudio").attr("src", './sound/' + strName);
	$('#chatAudio')[0].play(); // 播放声音
}
