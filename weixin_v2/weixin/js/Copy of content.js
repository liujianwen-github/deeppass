$(function() {
	// 测试信息

	// 源代码

	var code = GetQueryString("code");
	$.post(config.HOST + '/userManager/getUserInfoByCode', {
		'code' : code
	}, function(data) {
		var json = data;
		if (json.code == 0) {
			var user = json.results.user;

			setCookie('user', JSON.stringify(user));
			setCookie('userId', user.userId);
			setCookie("personId", user.personId);

			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem('userId', user.userId);
			localStorage.setItem("personId", user.personId);

			$('#addName').val(user.name);
			var c = document.getElementById('cvs');
			var ctx = c.getContext('2d');
			var img = new Image();
			img.src = user.imageId;
			// img.src=user.imageId;
			// 页面加载时的头像
			img.onload = function() {
				ctx.drawImage(img, 0, 0, 300, 150);
			};
			var sex = document.getElementsByName("sex");
			if (user.sex == 1) {
				sex[0].checked = "checked";
				$("#man").addClass("current");
			} else {
				sex[1].checked = "checked";
				$("#weman").addClass("current");
			}
		}

	});

	$('#calendars').mobiscroll().range({
		theme : 'mobiscroll',
		lang : 'zh',
		controls : [ 'calendar', 'time' ],
		defaultValue : [ new Date(), new Date() ],
		startInput : '#startDate',
		endInput : '#endDate'
	});

	$('.messageBtn')[0].addEventListener('touchend', function() {
		var userName = $('#addName').val();
		var sex = $(':radio[name="sex"]:checked').val();// 1为男，0为女
		$.post(config.HOST + "/userManager/userWxRegister", {
			'userName' : userName,
			'sex' : sex,
			'userId' : getCookie("userId")
		}, function(data) {
			var json = data;
			if (checkJson(json)) {
				window.location.href = 'collection.html?bili='
						+ getCookie("userId");
			} else {
				alert(json.msg);
			}
		});
	});

	// 获取上传按钮
	var input1 = document.getElementById("upload");

	if (typeof FileReader === 'undefined') {
		// result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
		input1.setAttribute('disabled', 'disabled');
	} else {
		input1.addEventListener('change', readFile, false);
		/*
		 * input1.addEventListener('change',function (e){
		 * console.log(this.files);//上传的文件列表 },false);
		 */
	}
	// ///////////////////////////////////////////////////////////////////////////////////////
	function readFile() {
		var file = this.files[0];// 获取上传文件列表中第一个文件
		if (!/image\/\w+/.test(file.type)) {
			// 图片文件的type值为image/png或image/jpg
			alert("文件必须为图片！");
			return false;
		}

		var reader = new FileReader();// 实例一个文件对象
		reader.readAsDataURL(file);// 把上传的文件转换成url
		var canvas = document.getElementById('cvs');// 获取canvas的DOM对象
		var ctx = canvas.getContext('2d');// 获取canvas的2d环境

		// 当文件读取成功便可以调取上传的接口
		reader.onload = function(e) {

			var data = e.target.result.split(',');
			var tp = (file.type == 'image/png') ? 'png' : 'jpg';
			var imgUrl = data[1];// 图片的url，去掉(data:image/png;base64,)
			// 上传步骤转到下边----url为ndata
			// 需要上传到服务器的在这里可以进行ajax请求

			var image = new Image();
			// 设置src属性
			image.src = e.target.result;
			console.log('宽：' + image.width + ',高：' + image.height);

			// 绑定load事件处理器，加载完成后执行，避免同步问题
			// //////////////////////////////image.onload/////////////////////////////////
			image.onload = function() {
				// 测试内容：判断用户系统为ios，对上传的图片进行方向更改
				if (navigator.userAgent.match(/iphone/i)) {
					console.log('this is ios');
					EXIF.getData(image, function() {
						console.log('pull data success');
						EXIF.getAllTags(image);
						var Orientation = EXIF.getTag(image, 'Orientation');
						console.log(Orientation);

						// 如果方向角不为1，都需要进行旋转 added by lzk
						if (Orientation != "" && Orientation != 1) {

							switch (Orientation) {
							case 6:// 需要顺时针（向左）90度旋转
								// alert('需要顺时针（向左）90度旋转');
								rotateImg(image, 'left', canvas);
								// rotateImg（）函数的三个参数（HTMLelement，direction，canvas
								// element）
								break;
							case 8:// 需要逆时针（向右）90度旋转
								// alert('需要顺时针（向右）90度旋转');
								rotateImg(image, 'right', canvas);
								break;
							case 3:// 需要180度旋转
								// alert('需要180度旋转');
								rotateImg(image, 'right', canvas);// 转两次
								rotateImg(image, 'right', canvas);
								break;
							}
						}

					})

				}
				var max = 300;
				// 如果高度超标 宽度等比例缩放 *=
				if (image.height > max) {
					image.width *= max / image.height;
					image.height = max;
				}
				if (image.width > max) {
					image.height *= max / image.width;
					image.width = max;
				}
				ctx.clearRect(0, 0, 300, 300);
				ctx.drawImage(image, 0, 0, 300, 150);
				// 进行最小化压缩
				// var ndata = canvas.toDataURL("image/jpeg", 0.8).replace(
				// "image/jpeg", "image/octet-stream");
				var ndata = canvas.toDataURL('image/jpeg', 0.8);
				imgUrl = ndata.split(',')[1];
				// imgUrl = image.src.split(',')[1];

				var userId12 = getCookie('userId')
						|| localStorage.getItem('userId');
				if (userId12 == null || userId12 == "") {
					alert("userId 不可为空");
					return;
				}
				if (imgUrl == null || imgUrl == "") {
					alert("图片 不可为空");
					return;
				}
				// ////////////////////////////////post///////////////////////////////
				// 上传到服务器进行ajax请求
				$.post(config.HOST + "/userManager/uploadImg", {
					'imgUrl' : imgUrl,
					'userId' : userId12
				}, function(data) {
					if (checkJson(data)) {
						console.log("上传成功！");
					}
				});
				// /////////////////////////////post//////////////////////////////////

			};
			// ///////////////////////////////image.onload////////////////////////////////
		}
	}
	// /////////////////////////////////////////function
	// readfile/////////////////////////////////////////////////////
	// 对图片旋转处理
	function rotateImg(img, direction, canvas) {
		// alert(img);
		// 最小与最大旋转方向，图片旋转4次后回到原方向
		var min_step = 0;
		var max_step = 3;
		// var img = document.getElementById(pid);
		if (img == null)
			return;
		// img的高度和宽度不能在img元素隐藏后获取，否则会出错
		var height = img.height;
		var width = img.width;
		// var step = img.getAttribute('step');
		var step = 2;
		if (step == null) {
			step = min_step;
		}
		if (direction == 'right') {
			step++;
			// 旋转到原位置，即超过最大值
			step > max_step && (step = min_step);
		} else {
			step--;
			step < min_step && (step = max_step);
		}

		// 旋转角度以弧度值为参数
		var degree = step * 90 * Math.PI / 180;
		var ctx = canvas.getContext('2d');
		switch (step) {
		case 0:
			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0);
			break;
		case 1:
			canvas.width = height;
			canvas.height = width;
			ctx.rotate(degree);
			ctx.drawImage(img, 0, -height);
			break;
		case 2:
			canvas.width = width;
			canvas.height = height;
			ctx.rotate(degree);
			ctx.drawImage(img, -width, -height);
			break;
		case 3:
			canvas.width = height;
			canvas.height = width;
			ctx.rotate(degree);
			ctx.drawImage(img, -width, 0);
			break;
		}
	}
})