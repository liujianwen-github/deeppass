var timer = null;// 定时器变量
var person = null;
var nowTime = null;
var width = 280;
var leng = $('.ul li').length;
var idx = 0;// 下标
var per = 1;// 人数
var hour, minute, second;// 时 分 秒
hour = minute = second = 0;// 初始化

clearInterval(timer);
clearInterval(person);
clearInterval(nowTime);

$(function() {
	$('.ul li').eq(0).siblings().hide();
	start();
})

function start() {

	// 切换头像
	// timer = setInterval(function(){
	// $('.ul li').eq(idx).fadeIn(500).siblings().fadeOut(500);
	// idx++;
	// if(idx == leng){
	// idx = 0;
	// }
	// },0.5*1000);

	timer = setInterval(function() {
		var suiji = Math.floor(Math.random() * 300);
//		console.log(suiji)
		$('.ul li').eq(suiji).fadeIn(500).siblings().fadeOut(500);
		idx++;
		if (idx == leng) {
			idx = 0;
		}
	}, 0.3 * 1000);
	// 计数人数
//	person = setInterval(function() {
//		$('.per').html(per);
//		per++;
//	}, 0.01 * 1000);
person = setInterval(function(){
		$('.per').html(per);
		per+=123;
	},0.01*1000);
	// 计数时间
	nowTime = setInterval(time, 1 * 1000);
}

function time() {

	second += 1;
	var sen = second >= 10 ? second : '0' + second;
	if (second >= 60) {
		second = 0;
		minute += 1;
		var min = minute >= 10 ? minute : '0' + minute;
	}
	if (minute >= 60) {
		minute = 0;
		hour += 1;
		var h = hour >= 10 ? hour : '0' + hour;
	}
	if (hour >= 24) {
		hour = 0;
	}
	$('.sen').html(sen);
	$('.min').html(min);
	$('.hour').html(h);
}

$('body').click(function() {
	clearInterval(timer);
	clearInterval(person);
	clearInterval(nowTime);
})
$('body').dblclick(function() {
	start();
})
