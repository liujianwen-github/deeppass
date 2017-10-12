//清除人物信息
//function clearShowInfo() {
//	$('.main_l').html("");
//}
// 弹窗
const
shibie = document.getElementById('shibie');
const
yanzheng = document.getElementById('yanzheng');
const
yes = document.getElementById('yes'), no = document.getElementById('no');

// yes.onclick = function() {
// yanzheng.style.display = "none";
// };
// no.onclick = function() {
// yanzheng.style.display = "none";
// };

var scrollLimit = 200;
var frequency = -200;// 定义一个变量，用来控制slidecontent向上偏移的长度
var swt = '';// 声明一个控制开关
function doscroll() {

	const
	sons = $('.slideContent');
	// console.log(frequency);
	if (frequency <= -200) { // 1:开始动画,第一次平移
		frequency += scrollLimit;
		sons.animate({
			'margin-top' : -frequency
		}, queryLimit);
		$('.slideContent .dlItem').eq(1).css('opacity', '1');
	} else if (swt == 'swt1') { // 3:第二次停顿
		sons.animate({
			'margin-top' : -frequency
		}, queryLimit);
		$('.slideContent .dlItem').eq(2).css('opacity', '1');
		swt = 'swt2';
	} else if (swt == 'swt2') { // 4:然后开始正常动画
		$('.slideContent .dlItem').css('opacity', '1');
		frequency += scrollLimit;
		sons.animate({
			'margin-top' : -frequency
		}, queryLimit, function() {
			if (getUserCount() == 0) {
				frequency = -200;
			}
			// if (frequency / 200 > $('.slideContent .dlItem').length) {
			// clearInterval(timer); // 根据结果判断：如果子元素个数小于滚动次数,计时器停止
			// }
		});
	} else if (frequency <= 0) { // console.log('if=2'); // 2:开始第一次停顿
		swt = 'swt1';
	}

}

// 当前时间
function toDou(num) {
	if (num < 10) {
		return '0' + num;
	} else {
		return '' + num;
	}
}
function time() {
	var nowTime = $('.date')[0];
	var nowTime1 = $('.date')[1];
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes()
	var s = date.getSeconds();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var _date = date.getDate();
	var week = date.getDay();
	nowTime.innerHTML = year + '年' + toDou(month) + '月' + toDou(_date) + '日';
	nowTime1.innerHTML = toDou(h) + ':' + toDou(m);
}

function time1() {
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes()
	var s = date.getSeconds();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var _date = date.getDate();
	var week = date.getDay();
	return year + '年' + toDou(month) + '月' + toDou(_date) + '日 ' + toDou(h)
			+ ':' + toDou(m);
}