var config = {
	listenHost : '127.0.0.1',
	listenPort : '8050',

	HOST : 'http://192.168.1.10:8080',
	appKey : '5f84bb25_4ea8_42c2_a6bf_744b0bb574a9',

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
	
	videoId : "072b619c-7d02-4215-9265-ad2c98123456",
	videoTarget : "rtsp://admin:abcd1234@192.168.1.66:5544444444444"
};

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}