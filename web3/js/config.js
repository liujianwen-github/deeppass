//配置文件

// var HOST = "http://101.201.106.53/faceserver";
var config = {

       HOST : "http://localhost:8080/wxServer2/",
       API_HOST : "http://localhost:8080/apiServer/",
//  HOST: "http://demo.deepdot.cn/wxServer2/",
//  API_HOST: "http://demo.deepdot.cn/apiServer/",
    pageCount: 18,
    WX: "WX",
    AD: "AD"
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
 * 后台管理登录 TODO
 */
function login() {
    var name = $("#username").val();
    var password = $("#password").val();
    $.post(config.HOST + '/admin/login', {
        'name': name,
        'password': hex_sha1(password)
    }, function(data) {
        var json = data;
        if (checkJson(json)) {
            setCookie("admin", JSON.stringify(json.results.admin));
            setCookie("adminId", json.results.admin.adminId);
            setCookie("deviceId", json.results.admin.deviceId);
            setCookie("userkey", json.results.admin.appKey);
            setCookie("nonce", json.results.admin.nonce);
            window.location.href = 'userinfo.html';
        } else {
            alert(json.msg);
        }
    })
}

/**
 * TODO 退出登录
 */
function adminLogout() {
    $.post(config.HOST + '/admin/adminLogout', {
        "adminId": getAdminId(),
        "nonce": getCookie("nonce")
    }, function(data) {
        var json = data;
        if (checkJson(json)) {
            setCookie("admin", '');
            setCookie("adminId", "");
            setCookie("deviceId", "");
            setCookie("userkey", "");
            window.location.href = 'login.html';
        } else {
            alert(json.msg);
        }
    })
}

/**
 * 获取userkey TODO
 * 
 * @returns
 */
function getUserKey() {
    return getCookie("userkey");
}

/**
 * 获取设备ID
 * 
 * @returns
 */
function getDeviceId() {
    return getCookie("deviceId");
}

/**
 * 获取管理员id
 * 
 * @returns
 */
function getAdminId() {
    return getCookie("adminId");
}