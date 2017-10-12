//var data = {
//				"code": 0,
//				"succ_code": 0,
//				"msg": "SUCC",
//				"time": 1495612183166,
//				"results": {
//					"info": {
//						"img": "http://img.article.pchome.net/00/47/42/55/pic_lib/wm/05.jpg",
//						"sex": 0,
//						"createdate": "2017-05-09 13:18:07",
//						"glasses": 1,
//						"age": 52,
//						"src_id": "c3194e2d-eb9f-41e6-b980-c65d774cf9a6",
//					}
//				},
//				"method": "faceTrackCreated"
//		};
//var json = {
//			    "msg": "SUCC",
//			    "code": 0,
//			    "succ_code": 0,
//			    "time": 1495781051241,
//			    "results": {
//			        "info": {
//			            "n_person": 20,
//			            "n_man": 20,
//			            "n_10To20": 0,
//			            "n_60To150": 0,
//			            "n_20To40": 0,
//			            "n_40To60": 20,
//			            "n_weman": 0,
//			            "n_1To10": 0
//			        }
//			    }
//		};

var leftVideo = $('.a1 OBJECT').attr('id');
var rightVideo = $('.a2 OBJECT').attr('id');

$(function() {

	$.ajax({
		type : "post",
		url : "/apiServer/facetrackManage/getSourceInfo",
		data : {
			userkey : config.appKey,
			sourceId : leftVideo
		},
		success : function(json) {
			var json = json;
			getjson(json);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpRequest.readyState);
			console.log(textStatus);
		}
	});
	$.ajax({
		type : "post",
		url : "/apiServer/facetrackManage/getSourceInfo",
		data : {
			userkey : config.appKey,
			sourceId : rightVideo
		},
		success : function(json) {
			var json = json;
			getjson1(json);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpRequest.readyState);
			console.log(textStatus);
		}
	});

})

var bgc = '';
function getData(data) {
	if (data != null && data.code == data.succ_code) {
		var results = data.results;
		console.log(data);
		if (results != null && results != '' && results.info != null
				&& results.info != '') {
			var info = results.info;
			var img = info.img;
			var sex = info.sex;
			var glasses = info.glasses;
			var age = info.age;
			var camera = info.src_id;
			var id = info.src_id;

			if (age < 20) {
				bgc = "10-20岁";
			}
			if (age >= 20 && age < 40) {
				bgc = '20-40岁';
			}
			if (age >= 40) {
				bgc = '40-60岁';
			}
			str = '<li>' + '<div class="bg">' + '<div class="img">' + '<div>'
					+ '<img src="' + img + '"/>' + '</div></div>'
					+ '<div class="info">' + '<p class="age">';
			if (sex == 0) {
				str += '<span><img src="images/men.png"/></span>';
			} else if (sex == 1) {
				str += '<span><img src="images/women.png"/></span>';
			}
			str += '<i>' + bgc + '</i>' + '</p>' + '<p class="shipin">';

			if (glasses == 0) {
				str += '<span><img src="images/glasses.png"/></span>';
			} else if (glasses == 1) {
				str += '<span><img src="images/glasses1.png"/></span>';
			}
			if (camera == "072b619c-7d02-4215-9265-ad2c982e2767") {
				camera = "Camera左";
				str += '<i>' + camera + '</i>';
			} else if (camera == "f8a243c5-3fac-4573-a9e4-5283945ea80a") {
				camera = "Camera右";
				str += '<i>' + camera + '</i>';
			}
			str += '</p></div></div></li>';

			// 自己计数
			addPerson(id, sex, age);
		}

	}
}
// 用来计人数的变量
var left_per = null;
var left_ten = null;
var left_two = null;
var left_four = null;
var right_per = null;
var right_ten = null;
var right_two = null;
var right_four = null;

function getjson(data) {
	if (data != null && data.code == data.succ_code) {
		console.log('左------' + data);
		var results = data.results;
		if (results != null && results != '' && results.info != null
				&& results.info != '') {
			var info = results.info;
			var person = info.n_person;
			var man = info.n_man;
			var women = info.n_women;
			var tenTotwenty = info.n_10To20;
			var TwentyToforty = info.n_20To40;
			var FortyTosisty = info.n_40To60;
			var moreSixtey = info.n_60To150;
			FortyTosisty += moreSixtey;
			$('.left-cont .allperson p').html(person);
			$('.left-cont .sex .man').html(man);
			$('.left-cont .sex .women').html(women);
			$('.left-cont .ten p').html(tenTotwenty);
			$('.left-cont .two p').html(TwentyToforty);
			$('.left-cont .four p').html(FortyTosisty);
			left_per = person;
			left_ten = tenTotwenty;
			left_two = TwentyToforty;
			left_four = FortyTosisty;
			console.log(left_ten / left_per);
			var l_ten = parseInt(left_ten / left_per * 100);
			var l_two = parseInt(left_two / left_per * 100);
			var l_four = parseInt(left_four / left_per * 100);
			leftCircle(l_ten, l_two, l_four);
		}
	}
}
function getjson1(data) {
	if (data != null && data.code == data.succ_code) {
		console.log('右------' + data);
		var results = data.results;
		if (results != null && results != '' && results.info != null
				&& results.info != '') {
			var info = results.info;
			var person = info.n_person;
			var man = info.n_man;
			var women = info.n_women;
			var tenTotwenty = info.n_10To20;
			var TwentyToforty = info.n_20To40;
			var FortyTosisty = info.n_40To60;
			var moreSixtey = info.n_60To150;
			FortyTosisty += moreSixtey;
			$('.right-cont .allperson p').html(person);
			$('.right-cont .sex .man').html(man);
			$('.right-cont .sex .women').html(women);
			$('.right-cont .ten p').html(tenTotwenty);
			$('.right-cont .two p').html(TwentyToforty);
			$('.right-cont .four p').html(FortyTosisty);
			right_per = person;
			right_ten = tenTotwenty;
			right_two = TwentyToforty;
			right_four = FortyTosisty;
			var r_ten = parseInt(right_ten / right_per * 100);
			var r_two = parseInt(right_two / right_per * 100);
			var r_four = parseInt(right_four / right_per * 100);
			rightCircle(r_ten, r_two, r_four);
		}
	}
}

function addPerson(id, sex, age) {
	if (id == leftVideo) {// 左
		var lef_allper = $('.left-cont .allperson p').html();
		lef_allper = parseInt(lef_allper) + 1;
		$('.left-cont .allperson p').html(lef_allper);
		left_per = lef_allper;
		if (sex == 0) {
			var lef_man = $('.left-cont .sex .man').html();
			lef_man = parseInt(lef_man) + 1;
			$('.left-cont .sex .man').html(lef_man);
		} else if (sex == 1) {
			var lef_women = $('.left-cont .sex .women').html();
			lef_women = parseInt(lef_women) + 1;
			$('.left-cont .sex .women').html(lef_women);
		}
		if (age <= 20) {
			var lef_ten = $('.left-cont .ten p').html();
			lef_ten = parseInt(lef_ten) + 1;
			$('.left-cont .ten p').html(lef_ten);
			left_ten = lef_ten;
		} else if (age > 20 && age <= 40) {
			var lef_two = $('.left-cont .two p').html();
			lef_two = parseInt(lef_two) + 1;
			$('.left-cont .two p').html(lef_two);
			left_two = lef_two;
		} else if (age > 40) {
			var lef_four = $('.left-cont .four p').html();
			lef_four = parseInt(lef_four) + 1;
			$('.left-cont .four p').html(lef_four);
			left_four = lef_four;
		}
		var l_ten = parseInt(left_ten / left_per * 100);
		var l_two = parseInt(left_two / left_per * 100);
		var l_four = parseInt(left_four / left_per * 100);
		leftCircle(l_ten, l_two, l_four);
	}

	else if (id == rightVideo) {// 右
		var rig_allper = $('.right-cont .allperson p').html();
		rig_allper = parseInt(rig_allper) + 1;
		$('.right-cont .allperson p').html(rig_allper);
		right_per = rig_allper;
		if (sex == 0) {
			var rig_man = $('.right-cont .sex .man').html();
			rig_man = parseInt(rig_man) + 1;
			$('.right-cont .sex .man').html(rig_man);
		} else if (sex == 1) {
			var rig_women = $('.right-cont .sex .women').html();
			rig_women = parseInt(rig_women) + 1;
			$('.right-cont .sex .women').html(rig_women);
		}
		if (age <= 20) {
			var rig_ten = $('.right-cont .ten p').html();
			rig_ten = parseInt(rig_ten) + 1;
			$('.right-cont .ten p').html(rig_ten);
			right_ten = rig_ten;
		} else if (age > 20 && age <= 40) {
			var rig_two = $('.right-cont .two p').html();
			rig_two = parseInt(rig_two) + 1;
			$('.right-cont .two p').html(rig_two);
			right_two = rig_two;
		} else if (age > 40) {
			var rig_four = $('.right-cont .four p').html();
			rig_four = parseInt(rig_four) + 1;
			$('.right-cont .four p').html(rig_four);
			right_four = rig_four;
		}
		var r_ten = parseInt(right_ten / right_per * 100);
		var r_two = parseInt(right_two / right_per * 100);
		var r_four = parseInt(right_four / right_per * 100);
		rightCircle(r_ten, r_two, r_four);
	}
}
