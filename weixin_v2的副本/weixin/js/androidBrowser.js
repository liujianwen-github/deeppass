/*
 * created by admin 2017/03/01 15:52
 */
"use strict";
var videobox = document.getElementById('videoBox');
var imgbox = new Array();// 创建一个存储图片路径的数组
var userId = window.location.search.slice(6);
$(function() {

	// console.log(navigator.platform.toLowerCase().match(/iphone/g))
	/* TODO */
	// 通过判断mobileMQQBrowser,MIME,插件数量0,flash0,javaenabled是否为微信内置qq浏览器，全部符合则显示跳转标识；
	// 跳转之后通过判断user.agent，系统平台判断是否为安卓
})/** *****************以上是$(function)************************** */

function chose() {
	// alert('21:27');
	var agent = navigator.userAgent.toLowerCase().match(/android/g);// 浏览器信息安卓
	var platform = navigator.platform.toLowerCase().match(/linux/g);// 操作系统linux
	var plugins = navigator.plugins.length == 0;// 插件数量，微信里没插件
	var mime = navigator.mimeTypes.length == 0;// mime类型
	var mqqbrowser = navigator.userAgent.toLowerCase().match(/mqqbrowser/g);//
	if (agent && platform && plugins && mime && mqqbrowser) {
		// 微信
		// alert('右上角，点击在浏览器中打开');
		// $('#collectbtn').attr('disabled','disabled');
		// $('.collectbtn').css('background-color','lightgray');
		$('#iosDialog1').css('display', 'block');
		setTimeout(function() {
			// 暂时设置20秒跳转到index,提示用户注意推送，没有结果请刷新
			window.location.href = "index.html";
		}, 20 * 1000)
	} else {
		// alert('安卓浏览器5');
		androidUpload();
		// nmsl('android');
		// return;
	}
}
// android运行函数
function androidUpload() {
	/** *****************文件按钮绑定事件*************** */
	$('input[type=file]').on('change', function() {
		// nmsl('file is changed')

		$('#iosDialog2').css('display', 'block');// 显示上传图标

		var file = this.files[0];// 获取上传文件
		// nmsl(file)
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			// nmsl('reader is onload');
			var data = e.target.result;// 获取到视频文件的base64地址
			// //nmsl(data)
			var video = document.createElement('video');
			video.src = data;// 创建页面元素video
			// video.setAttribute('id','videoIntercept');
			video.style.maxWidth = '400px';// 设置最大宽高
			video.style.maxHeight = '400px';
			video.setAttribute('id', 'video1');
			video.style.border = '1px dashed red';
			video.autoplay = true;// 自动播放
			videobox.appendChild(video);
			// //nmsl(video)
			video.onloadedmetadata = function() {
				readefile();
				// console.log('nmls')

			};

		};
		/** *********************以上是reader.onload********************** */

	});
	/** ******************以上是eventlistener*********************** */
}

// reader
function readefile(video) {
	// nmsl('video is onload');
	var currentVideo = document.getElementById('video1');// 获取视频对象（js对象），duration不支持jquery
	// var totalImg=Math.ceil(Number(currentVideo.duration)/0.2);;
	// 视频加载后运行的函数

	// nmsl(currentVideo.duration)
	//					
	// if(!isNaN(Number(currentVideo.duration))){
	// //判断是否能够获取到视频时长，根据视频时间长度决定截取图片数量
	// //nmsl('视频时长为'+currentVideo.duration);
	// totalImg=Math.ceil(Number(currentVideo.duration)/0.2);
	// //设置截取图片的总数量
	// }else{
	// totalImg=10;
	// }

	var totalImg = 10;
	// //nmsl(totalImg)
	$('.weui-dialog__bd p').html('正在压缩');

	var imgNum = 0;// 定义变量用于统计已经截取的图片数量
	var video = $("#videoBox video").get(0);// 获取文件（jquery对象）
	var Proportion = video.clientWidth / video.clientHeight;// canvas宽高比例
	/* 开始将视频截取为图片 */
	// 设置定时器函数
	console.log(typeof Proportion + ',' + Proportion)
	var startImg = self.setInterval(function() {

		if (imgNum < totalImg) {
			// var video=document.getElementById('videoIntercept')
			var canvas = document.createElement("canvas");
			/*
			*	调整canvas截取的video翻转补白
			 */
			// if (video.clientWidth > video.clientHeight) {
			// 	canvas.width = canvas.height = video.clientWidth;
			// 	// 取video元素较长的一边，作为canva的边长
			// } else {
			// 	canvas.width = canvas.height = video.clientHeight;
			// }
			canvas.width=video.clientHeight;
			canvas.height=video.clientWidth;
			canvas.getContext('2d').drawImage(video, 0, 0, video.clientHeight,video.clientWidth);// 根据视频尺寸，绘制canvas的图像
			// console.log(canvas);
			var img = new Image();// 创建一个图片对象

			img.src = canvas.toDataURL('image/jpeg', 0.5);// 添加图片路径,压缩比例0.1
			// canvas.toDataURL('image/jpeg',0.1)

			/** *****************像页面添加dom元素，上线去掉******************* */
			$("#output img").css({
				'width' : canvas.width,
				'height' : canvas.height
			});
			$('#output img').css('border', '1px solid white');
			$('#output').append(img);

			/** ************************************ */
			// $('#output img').css('transform','rotate(90deg)');
			if (imgNum > 1 && imgbox[imgNum - 1] == img.src) {
				// 当后一张图片与前一张图片地址一样，判定视频播放完毕，停止截图
				clearInterval(startImg);
				uploadgogo(imgbox);
			}
			imgbox[imgNum] = img.src;
			// $('#output').append(canvas)
			// document.getElementById('nmslwsnd').innerHTML+=imgbox.length+"<br/>";
			// ///////////////////添加数组/////////////////////////////
			imgNum++;
		} else {
			clearInterval(startImg);// 停止计时器
			uploadgogo(imgbox);
			// document.getElementById('videoBox').innerHTML='';//清空videobox
			console.log('stop');// 停止程序
		}

	}, 0.5 * 1000);
	// }
	/** **********************以上是video.onload函数************************* */
}

// 上传文件函数
function uploadgogo(imgbox) {
	// nmsl('uploadgogo')
	var imgs = {
		imgs : imgbox
	};
	// console.log(JSON.stringify(imgs));
	// console.log(imgs);
	$('.weui-dialog__bd p').html('正在上传，请稍候');
	console.log('累计获取照片数量：' + imgs.imgs.length)
	// console.log(imgs)
	// alert('累计获取照片数量：'+imgs.imgs.length)
	$.ajax({
		type : "POST",
		"url" : config.API_HOST + "/upload/androidImages?userkey="
				+ config.USERKEY,
		async : true,
		data : {
			"userId" : userId,
			"imgs" : JSON.stringify(imgs)
		},
		success : function(data) {

			// //nmsl('success');
		},
		beforeSend : function(e) {
			// 此处loading处理
			// console.log('ready?');
			// nmsl('准备上传'+e)
		},
		complete : function(evt) {
			var json = eval('(' + evt.responseText + ')');
			if (checkJson(json)) {
				// succcode 是0
				// alert(json.code)
				$('.weui-dialog__bd span').removeClass('fa-spinner');
				$('.weui-dialog__bd span').removeClass('fa-spin');
				$('.weui-dialog__bd span').addClass('fa-check-circle');
				$('.weui-dialog__bd span').css('color', 'springgreen')

				$('.weui-dialog__bd p').html('上传成功，请返回微信->我的记录中查看识别结果！');
				updateUserTransactionId(json.results.transactionId,
						config.CATE_IMAGE);

			} else {
				alert(json.msg);
				setTimeout(function() {
					// window.location.reload(true);
				}, 1000)
			}
		},
		error : function(error) {
			// $('#iosDialog2').css('display','none');
			console.log(typeof error.status);
			$('.weui-dialog__bd span').css('color', 'white');
			$('.weui-dialog__bd p').html('上传失败，错误代码：' + error.status);
			$('.weui-dialog__bd p').css('color', 'gray')
		}

	});
}