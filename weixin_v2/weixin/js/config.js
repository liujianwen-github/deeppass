/**
 * 配置文件 TODO
 */
var config = {
//	HOST : "/wxServer2",
	 API_HOST : "/apiServer/",
	// HOST : "http://localhost:8080/wxServer2",
	 //API_HOST : "http://localhost:8080/apiServer/",
	// HOST : "http://192.168.1.15:8080/wxServer2",
	// API_HOST : "http://192.168.1.15:8080/apiServer/",
	HOST : "http://demo.deepdot.cn/wxServer2/",
//	API_HOST : "http://demo.deepdot.cn/apiServer/",

//	USERKEY : "5f84bb25_4ea8_42c2_a6bf_744b0bb574a9",
	USERKEY: "391cb26c_45f3_4817_86f8_644e293cce60",
	CATE_VIDEO : 1,
	CATE_IMAGE : 2,
	pageCount : 10,
	WX : "WX",
	AD : "AD",
	AppleSize: 70*1024,
	AndroidSize:2*1024*1024,
	limitSec:2
};

/**
 * 获取事务ID的结果 TODO
 * 
 * @param transactionId
 * @param cate
 */
function updateUserTransactionId(transactionId, cate) {
	$.post(config.HOST + '/userManager/updateUserTransactionId', {
		"userId" : getCookie("userId"),
		"transactionId" : transactionId,
		"cate" : cate
	}, function(data) {
		var json = eval('(' + data + ')');
		if (!checkJson(json)) {
			alert(json.msg);
		}
	})
}

/**
 * json有效性检测 TODO
 * 
 * @param json
 * @returns {Boolean}
 */
function checkJson(json) {
	if (json.succ_code == 0 && json.succ_code == json.code) {
		return true;
	}
	return false;
}

/**
 * 查询的记录的开始时间 TODO
 */

function getBeginTime(limitTime) {
	if (limitTime == "" || limitTime == null) {
//		搜索条件为空默认返回所有
		return 1;	
	}
	return getEndTime() - Number(limitTime) * 60 * 60 * 1000;
}

/**
 * 查询记录的结束时间（当前时间） TODO
 * 
 * @returns
 */
function getEndTime() {
	return new Date().getTime();
}

/**
 * 设置user的缓存
 * 
 * @param user
 */
function setUserCookies(user) {
	setCookie('user', JSON.stringify(user));
	setCookie('userId', user.userId);
	setCookie("personId", user.personId);

	localStorage.setItem("user", JSON.stringify(user));
	localStorage.setItem('userId', user.userId);
	localStorage.setItem("personId", user.personId);
}

/**
 * 获取user缓存
 * 
 * @returns
 */
function getUserCookie() {
	return getCookie('user') || localStorage.getItem('user');
}