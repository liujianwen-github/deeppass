var config = {
	listenHost : '127.0.0.1',
	listenPort : '8050',
	HOST: 'http://127.0.0.1:8080/deeppassterminate/',
	deepdotHost : 'http://127.0.0.1:8000',
	appKey : '6119526c_d3bb_4710_b13e_56fd23fe3f32',
	// deepdotHost : 'http://192.168.1.10:8000',
	// appKey : 'c9630777_220e_40d0_a6d5_f7e4ceb9c8c4',

	// Deepdot接口地址
	// deepdotHost : 'http://123.59.100.112:8000',
	// appKey : 'c9630777_220e_40d0_a6d5_f7e4ceb9c8c4',

	// 显示照片的地址
	imageURL : 'http://127.0.0.1:3000/img/getsingleimg',

	// 打开门禁地址
	openDoor : '1',
	openDoorURL : 'http://127.0.0.1:8080/test/servlet/Door',
	// 匹配值
	matchscore : 0.85,

};

var personDB = [ [ "10000001", "80b88448-7082-4929-a331-c6bc9414138f" ],
		[ "10000002", "9982b736-fc51-4183-8462-9d6707d888f0" ],
		[ "10000003", "92c3a3ab-1746-41d0-b858-479784ac1efd" ],
		[ "10000004", "4c42d09c-6c3f-4af0-be64-bdd8e852790d" ] ];

var userLimitTime = 6 * 1000;// 停留时间

var queryLimit = 0.5 * 1000;// 轮询时间
var userCookies = {
	"count" : 0,// 计数
	"first" : 0,// 记录时间
	"second" : 0,
	"third" : 0
}

/**
 * TODO 加数据
 */
function addUserCookies() {
	if (userCookies.count < 3) {
		userCookies.count++;
	}
	if (userCookies.first == 0) {
		userCookies.first = new Date().getTime();

	} else if (userCookies.second == 0) {
		userCookies.second = new Date().getTime();

	} else if (userCookies.third == 0) {
		userCookies.third = new Date().getTime();

	} else {
		userCookies.first = userCookies.second;
		userCookies.second = userCookies.third;
		userCookies.third = new Date().getTime();
	}
	// console.log("addUserCookies " + JSON.stringify(userCookies));
}

/**
 * TODO 减数据
 */
function subUserCookies() {
	if (userCookies.count < 3) {
		userCookies.first = userCookies.second;
		userCookies.second = userCookies.third;
		userCookies.third = 0;
	}
	if (userCookies.count > 0) {
		userCookies.count--;
	}
	// console.log("subUserCookies " + JSON.stringify(userCookies));
}

/**
 * TODO
 * 
 * @returns {Boolean}
 */
function checkTime() {

	if (userCookies.count == 0 && userCookies.first == 0) {
		return false;
	} else {
		var now = new Date().getTime();
		// console.log(userCookies.first + " - " + userLimitTime + " = " + now);
		if (userCookies.first != 0 && (userCookies.first + userLimitTime) < now) {
			return true;
		}
	}
	return false;
}

function getUserCount() {
	 console.log("getUserCount -- " + userCookies.count);
	return userCookies.count;
}

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