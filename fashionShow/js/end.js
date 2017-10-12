var timer = null;
var int;
var idx = 0;
var num = 0;
var Num = 1;
var str = '';
var Str = '';
var stR = '';

$(function() {

	personId = getQueryString('personId');
	$.ajax({
		type : "get",
		url : "/apiServer/facetrackManage/getReverseResult",
		data : {
			'userkey' : config.appKey,
			'personId' : personId,
			'pageNo' : 1,
			'pageCount' : 1000
		},
		success : function(data) {
			// console.log(data);

			// clearInterval(timer);
			getData(data);
			// timer = setInterval(function() {
			// animateLeft();
			// animateRight();
			// }, 1 * 1000);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log('出错了');
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
});

// $('body').click(function(){
// getData(data);
// // setInterval(function(){
// // animateLeft();
// // animateRight();
// // },1000)
// });

// var data = {
// "msg": "SUCC",
// "code": 0,
// "succ_code": 0,
// "time": 1496224294478,
// "results": {
// "array": [
// {
// "img":
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// "imgs": [
// "http://101.201.76.201:3000/img/getsingleimg?type=0&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=ee243fdc-c84a-4901-a5fc-78b37fdf6e58&fn=img_6b8d3083-5253-40d1-8469-66b95c3d037e.jpg",
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg"
// ],
// "sceneImg":
// "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
// "createTime": "2017-05-31 14:54:46"
// },
// {
// "img":
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// "imgs": [
// "http://101.201.76.201:3000/img/getsingleimg?type=0&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=ee243fdc-c84a-4901-a5fc-78b37fdf6e58&fn=img_6b8d3083-5253-40d1-8469-66b95c3d037e.jpg",
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg"
// ],
// "sceneImg":
// "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
// "createTime": "2017-05-31 14:54:46"
// },
// {
// "img":
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// "imgs": [
// "http://101.201.76.201:3000/img/getsingleimg?type=0&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=ee243fdc-c84a-4901-a5fc-78b37fdf6e58&fn=img_6b8d3083-5253-40d1-8469-66b95c3d037e.jpg",
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg"
// ],
// "sceneImg":
// "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
// "createTime": "2017-05-31 14:54:46"
// }
// // {
// // "img":
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// // "imgs": [
// //
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// // //
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg"
// // ],
// // "sceneImg":
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
// // "createTime": "2017-05-31 14:54:46"
// // },
// // {
// // "img":
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// // "imgs": [
// //
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// // //
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg"
// // ],
// // "sceneImg":
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
// // "createTime": "2017-05-31 14:54:46"
// // },
// // {
// // "img":
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// // "imgs": [
// //
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// // //
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg"
// // ],
// // "sceneImg":
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
// // "createTime": "2017-05-31 14:54:46"
// // },
// // {
// // "img":
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// // "imgs": [
// //
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// // //
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg"
// // ],
// // "sceneImg":
// //
// "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
// // "createTime": "2017-05-31 14:54:46"
// // }
// ],
// "personImgUrl":
// "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
// "personId": "123654132343131",
// "method": "getReverseResult",
// "pageInfo": {
// "dataList": [],
// "firstPageNo": 1,
// "lastPageNo": 2,
// "limit": 4,
// "nextPageNo": 2,
// "offset": 0,
// "pageCount": 0,
// "pageNo": 1,
// "pageNumList": [
// 1,
// 2
// ],
// "prePageNo": 1,
// "totalRecord": 5
// }
// }
// }

function getData(data) {
	clearInterval(timer);
	if (data != null && data.code == data.succ_code) {
		var results = data.results;
		if (results != null && results != '' && results.array != null
				&& results.array != '') {
			var personImgUrl = results.personImgUrl;
			var personId = results.personId;
			var array = results.array;
			$('.img').append('<img src="' + personImgUrl + '"/>');

			if (array.length == 1) {
				addLeft(array);
				addRight(array);
				addRight1();
			} else if (array.length == 2) {
				addLeft(array);
				addRight(array);
			} else if (array.length >= 3) {
				addLeft(array);
				addRight(array);
				timer = setInterval(function() {
					animateLeft(5);
					animateRight(5);
				}, 5 * 1000);

			}

		}
	}
}

function getPersonId(data) {

}

function addLeft(array) {
	var array = array;
	for (var i = 0; i < array.length; i++) {
		var arr = array[i];
		var gifImgs = arr.imgs;
		var sceneImg = arr.sceneImg;
		if (i == 0) {
			str = '<li class="show">';

		} else {
			str = '<li>';

		}
		str += '<div class="c">' + '<div class="sence"><img src="' + sceneImg
				+ '"/></div>' + '<div class="gif">';

		for (var j = 0; j < gifImgs.length; j++) {
			var gifImg = gifImgs[j];
			var imG = '<img src="' + gifImg + '"/>';
			str += imG;
		}

		str += '</div>' + '</div>' + '</li>';

		$('.cont .ul').append(str);
		var dongtu = '';
		$('.cont ul li').each(function() {
			dongtu = $(this).find('.gif img')
		});
		console.log(dongtu);
		seachImgs(dongtu);
	}

}
function addRight(array) {
	for (var i = 0; i < array.length; i++) {
		var arr = array[i];
		var time = arr.createTime;
		var date = time.substring(0, 10);
		var nowTime = time.substring(11, 19);
		if (i == 0) {
			Str = '<li class="show">' + '<p class="nowTime">' + nowTime
					+ '</p>' + '<p class="date">' + date + '</p>' + '</li>';
			$('.time .ul').append(Str);
			continue;
		}
		Str = '<li>' + '<p class="nowTime">' + nowTime + '</p>'
				+ '<p class="date">' + date + '</p>' + '</li>';

		$('.time .ul').append(Str);
	}
}

function addRight1() {
	Str = '<li>' + '<p class="nowTime"></p>' + '<p class="date"></p>' + '</li>';
	$('.time .ul').append(Str);
}

function animateLeft(i) {
	var leng = $('.cont .ul li').length;
	// console.log("length"+leng);
	// if(num>=4){
	// $('.cont ul>li').eq(num-2).find('.gif img').remove();
	// }
	var marginTop = parseInt($('.cont .ul').css('margin-top'));
	// 克隆第一个li 到ul的最后 以便轮播
	var cloneNode = $('.cont .ul li').eq(num).clone(true);
	// console.log(cloneNode)
	$('.cont .ul').append(cloneNode);

	$('.cont .ul').css({
		'margin-top' : marginTop - 360 + 'px',
		'transition' : 'all ' + i + 's'
	});
	$('.cont .ul .show .c').css({
		'transform' : 'scale(1)',
		'transition' : 'all ' + i + 's'
	});
	$('.cont .show').next().addClass('show').siblings().removeClass('show');
	var index = $('.cont .show').index();
	// console.log(index)
	$('.cont .ul .show .c').css({
		'transform' : 'scale(1.53)',
		'transition' : 'all ' + i + 's'
	});
	var showImages = $('.cont ul li:last .gif img');

	console.log(showImages);
	seachImgs(showImages);

	num++;
}

function animateRight(i) {
	var marginTop = parseInt($('.time .ul').css('margin-top'));
	// 克隆第一个li 到ul的最后 以便轮播
	var cloneNode = $('.time .ul li').eq(Num).clone(true);
	// console.log(cloneNode)
	$('.time .ul').append(cloneNode);
	$('.time .ul').css({
		'margin-top' : marginTop - 332 + 'px',
		'transition' : 'all ' + i + 's'
	});
	$('.time .ul .show .nowTime').css({
		'top' : '155px',
		'font-size' : '32px',
		'transition' : 'all ' + i + 's'
	});
	$('.time .ul .show .date').css({
		'top' : '195px',
		'font-size' : '20px',
		'transition' : 'all ' + i + 's'
	});
	$('.time .show').next().addClass('show').siblings().removeClass('show');

	$('.time .ul .show .nowTime').css({
		'top' : '145px',
		'font-size' : '40px',
		'transition' : 'all ' + i + 's'
	});
	$('.time .ul .show .date').css({
		'top' : '195px',
		'font-size' : '25px',
		'transition' : 'all ' + i + 's'
	});

	Num++;
}

function seachImgs(imgs) {
	// clearInterval(int);
	var imgs = imgs;

	var pos = 0;
	var len = imgs.length;

	int = setInterval(function() {
		imgs[pos].style.display = 'none';
		pos = ++pos == len ? 0 : pos;
		imgs[pos].style.display = 'inline';
	}, 100);

}