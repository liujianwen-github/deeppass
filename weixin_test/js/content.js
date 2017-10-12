var host="http://192.168.1.15:8080/";
// var host="";
//host用的时候置空
//图片的首地址
var imgHead="http://demo.deepdot.cn/faceImage/images/";
var notFoundFacetrackImage="http://demo.deepdot.cn/faceImage/images/82dc867aa7ac42888c9b5568d50a4fb6.jpg";
	
var $options = $(".userInfo").find(".pItem");
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

var $options4 = $(".leaveMessage").find(".pItem");
$options4.each(function() {
	var $option = $(this), $input = $option.find(":radio");
	$option.on("click", function() {
		if (!$option.hasClass("current")) {
			$options4.removeClass("current");
			$options4.not($option).each(function() {
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

$(".leaveMessage .addSex .pItem").click(function() {
	var num = $(this).index();
	if (num == 1) {
		$(".messageTime").show();
	} else {
		$(".messageTime").hide();
	}

});

$(".chooseBar .timePart").click(function() {
	var _index = $(this).index();
	console.log(_index);
	// $()
	$('.chooseBar .timePart:lt(' + (_index) + ')').addClass('checked');
	$('.chooseBar .timePart:gt(' + (_index - 1) + ')').removeClass('checked');
	var value = 0;
	if (_index == 1) {
		$(".schedule").css('width', '5%');
		$(".timeNum").text("半小时内").css("opacity", "0").animate({
			opacity : 1
		});
		$(".timCircle").attr("src", "images/b-1.png");
		$(".one").attr("dateh", 0.5);
		value = 0.5;
	}
	if (_index == 2) {
		$(".schedule").css('width', '25%');
		$(".timeNum").text("4小时内").css("opacity", "0").animate({
			opacity : 1
		});
		$(".timCircle").attr("src", "images/b-2.png");
		$(".two").attr("dateh", 4);
		value = 4;
	}
	if (_index == 3) {
		$(".schedule").css('width', '50%');
		$(".timeNum").text("12小时内").css("opacity", "0").animate({
			opacity : 1
		});
		$(".timCircle").attr("src", "images/b-3.png");
		$(".three").attr("dateh", 12);
		$(".timeLimit").val(12);
		value = 12;
	}
	if (_index == 4) {
		$(".schedule").css('width', '100%');
		$(".timeNum").text("24小时内").css("opacity", "0").animate({
			opacity : 1
		});
		$(".timCircle").attr("src", "images/b-4.png");
		$(".four").attr("dateh", 24);
		value = 24;
	}
	$("#timeLimit").attr("value", value);
});

function getDayOfWeek(dayValue) {
	var day = new Date(Date.parse(dayValue.replace(/-/g, '/')));
	// 将日期值格式化
	var today = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	// 创建星期数组
	return today[day.getDay()];
	// 返一个星期中的某一天，其中0为星期日
}