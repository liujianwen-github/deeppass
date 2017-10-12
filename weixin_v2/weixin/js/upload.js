/**
 * Created by deepdot on 2017/3/1.
 */
(function($) {
//	extend(target,source,deep)
//	alert('iphone');
	$.extend($.fn, {
		fileUpload: function(opts) {
			this.each(function() {
					var $self = $(this);
					var doms = {
						//获得调用对象内部的

						"fileToUpload": $self.find(".fileToUpload"),
						"thumb": $self.find(".thumb"),
						"progress": $self.find(".upload-progress")
					};
					var funs = {
						// 选择文件，获取文件大小，也可以在这里获取文件格式，限制用户上传非要求格式的文件

						"fileSelected": function() {
							var files = (doms.fileToUpload)[0].files;
							// console.log(files)
//							在这里加遮罩层
							// alert('1749');
							$('#iosDialog1 button').eq(0).on('click', function(event) {
									// alert(event)
									// $('#iosDialog1').css('display','none');
									// return;
									window.location.reload();
								});
								$('#iosDialog1 button').eq(1).on('click', function(event) {
									$('#iosDialog1').css('display','none');
									funs.uploadFile();
								});
							// $('#iosDialog2 .weui-dialog .weui-dialog__bd>p').html("正在读取")
							//获取第一个文件

							var count = files.length;
							// console.log(count)
							for(var index = 0; index < count; index++) {
								var file = files[index];
								var fileSize = 0;
								console.log(file);

								// if(file.size > 1024 * 1024)
								// 	fileSize = (Math.round(file.size *100 /(1024 * 1024)) / 100).toString() +'MB';
								// else
								// 	fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() +'KB';

								
//								alert(navigator.userAgent.toLowerCase())
								// alert(file.size/config.AndroidSize)
								/********************/
								if(navigator.userAgent.toLowerCase().match(/iphone/g)&&file.size>config.limitSec*config.AppleSize){
									$('#iosDialog1 p').eq(0).html("当前视频大小为"+(file.size/1024/1024).toFixed(2)+"MB,继续上传可能会消耗较多流量并且占用时间过长");
									$('#iosDialog1').css('display','block');	
								}else if(navigator.userAgent.toLowerCase().match(/iphone/g)&&file.size>5*config.AppleSize){
									alert("您拍摄的视频过长，请重新拍摄（录制不得超过5秒）");
									window.location.reload()
								}else if(navigator.userAgent.toLowerCase().match(/android/g)&&file.size>5*config.AndroidSize){
									alert("您拍摄的视频过长，请重新拍摄（录制不得超过5秒）");
									window.location.reload()
								}else if(navigator.userAgent.toLowerCase().match(/android/g)&&file.size>config.limitSec*config.AndroidSize){
//									alert('android < 5')
//					alert(
									$('#iosDialog1').css('display','block');		
									$('#iosDialog1 p').eq(0).html("当前视频大小为"+(file.size/1024/1024).toFixed(2)+"MB，继续上传可能会消耗较多流量并且占用时间过长");
								}else{
									alert('else')
									funs.uploadFile();
								}

								
							}
							
						},
						// 异步上传文件

						uploadFile: function() {
							// alert("up");
							$('#iosDialog2').css('display','block');
							var fd = new FormData(); // 创建表单数据对象

							var files = (doms.fileToUpload)[0].files;
							var count = files.length;
							for(var index = 0; index < count; index++) {
								var file = files[index];
								fd.append(opts.file, file); // 将文件添加到表单数据中

								funs.previewImage(file); // 上传前预览图片，也可以通过其他方法预览txt

							}
							console.log(opts.file)
							var xhr = new XMLHttpRequest();

							xhr.addEventListener("load",
								funs.uploadComplete,
								false);
							xhr.upload.addEventListener("progress", funs.uploadProgress, false);//监听上传进度
							xhr.addEventListener("error",
								opts.uploadFailed,
								false);
							xhr.open("POST", opts.url);
							xhr.send(fd);
						},
						// 文件预览

						previewImage: function(file) {
							var gallery = doms.thumb;
							var img = document.createElement("img");
							img.file = file;
							doms.thumb.html(img);
							// 使用FileReader方法显示图片内容

							var reader = new FileReader();
							reader.onload = (function(aImg) {
								return function(e) {
									aImg.src = e.target.result;
								};
							})(img);
							reader.readAsDataURL(file);
						},
						//上传进度

						uploadProgress: function(evt) {
							// alert("process")
							if(evt.lengthComputable) {
								var percentComplete = Math.round(evt.loaded *100 /evt.total);
								doms.progress.html(percentComplete.toString() +'%');
								//应该是这里可以获取进度

							}
						},
						//上传完成
						
//
//						"uploadComplete": function(evt) {
////							console.log(evt.target.responseText)
//							var json = eval('(' + evt.target.responseText +')');
//							console.log(json.code)
////							var json = evt.target.responseText
//							if(json.code == json.succ_code) {
//								$('.weui-dialog__bd span').removeClass('fa-spinner');
//								$('.weui-dialog__bd span').removeClass('fa-spin');
//								$('.weui-dialog__bd span').addClass('fa-check-circle');
//								$('.weui-dialog__bd span').css('color','springgreen')
//								
//								$('.weui-dialog__bd p').html('上传成功，1 s后返回主页');
//								updateUserTransactionId(json.results.transactionId,config.CATE_VIDEO);
//								setTimeout(function(){
//									window.location.href = 'index.html';
//								},1000)
//								
//							} else {
//								// alert(json.msg);
//								$('#iosDialog2').css('display','none');		
//
//							}
//						}
						"uploadComplete": function(evt) {
									var json = eval('(' + evt.target.responseText + ')');
									if (checkJson(json)) {
										$('.weui-dialog__bd span')
											.removeClass(
												'fa-spinner');
										$('.weui-dialog__bd span')
											.removeClass(
												'fa-spin');
										$('.weui-dialog__bd span')
											.addClass(
												'fa-check-circle');
										$('.weui-dialog__bd span')
											.css('color',
												'springgreen')

										$('.weui-dialog__bd p')
											.html('视频上传成功，请返回，等待审核结果');
										updateUserTransactionId(
											json.results.transactionId,
											config.CATE_VIDEO);
//										setTimeout(
//											function() {
//												window.location.href = 'index.html';
//											}, 2000)

									} else {
										alert(json.msg);
										$('#iosDialog2').css(
											'display', 'none');

									}
								}
//						"uploadComplete": function (e) {
//			           		   var rxp=/^0?2\d{2}$/;
//			           		   if(rxp.test(e.status)==true){
//			           		   		$('.weui-dialog__bd span').removeClass('fa-spinner');
//				                    $('.weui-dialog__bd span').removeClass('fa-spin');
//				                    $('.weui-dialog__bd span').addClass('fa-check-circle');
//				                    $('.weui-dialog__bd span').css('color','springgreen');
//				//					console.log( 'this is span for '+$('.weui-dialog_bd span'))
//				                    $('.weui-dialog__bd p').html('上传成功，1 s后返回主页');
//				                   	setTimeout(function(){
//				                     window.location.href = 'index.html';
//				                   },1000)
//			           		   }else{
//			           		   	alert(e.status);
//			           		   	$('#iosDialog2').css('display','none');
//			           		   }
//			               }
					};
					//进度调操作

					doms.fileToUpload.on("change",
						function() {
							doms.progress.find("span").width("0");
							funs.fileSelected();
						});
				});
		}
	});
})(Zepto);