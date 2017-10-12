/**
 * Created by deepdot on 2017/3/1.
 */
(function($) {
	// extend(target,source,deep)
	// alert('iphone');
	$
		.extend(
			$.fn, {
				fileUpload: function(opts) {
					this
						.each(function() {
							var $self = $(this);
							var doms = {
								// 获得调用对象内部的

								"fileToUpload": $self
									.find(".fileToUpload"),
								"thumb": $self.find(".thumb"),
								"progress": $self
									.find(".upload-progress")
							};
							var funs = {
								// 选择文件，获取文件大小，也可以在这里获取文件格式，限制用户上传非要求格式的文件

								"fileSelected": function() {
									var files = (doms.fileToUpload)[0].files;
									console.log(files)
									// 在这里加遮罩层

									$('#iosDialog2').css('display',
										'block');

									// 获取第一个文件

									var count = files.length;
									console.log(count)
									for(var index = 0; index < count; index++) {
										var file = files[index];
										var fileSize = 0;
										if(file.size > 1024 * 1024)
											fileSize = (Math
												.round(file.size *
													100 /
													(1024 * 1024)) / 100)
											.toString() +
											'MB';
										else
											fileSize = (Math
												.round(file.size * 100 / 1024) / 100)
											.toString() +
											'KB';
									}
									funs.uploadFile();
								},
								// 异步上传文件

								uploadFile: function() {
									var fd = new FormData(); // 创建表单数据对象

									var files = (doms.fileToUpload)[0].files;
									var count = files.length;
									for(var index = 0; index < count; index++) {
										var file = files[index];
										fd.append(opts.file, file); // 将文件添加到表单数据中

										funs.previewImage(file); // 上传前预览图片，也可以通过其他方法预览txt

									}
									var xhr = new XMLHttpRequest();
									xhr.upload.addEventListener(
										"progress",
										funs.uploadProgress,
										// console.log(funs.uploadProgress)

										false); // 监听上传进度

									xhr.addEventListener("load",
										funs.uploadComplete,
										false);
									xhr.addEventListener("error",
										opts.uploadFailed,
										false);
									xhr.open("POST", opts.url);
									xhr.send(fd);
								},
								// 文件预览

								previewImage: function(file) {
									var gallery = doms.thumb;
									var img = document
										.createElement("img");
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
								// 上传进度

								uploadProgress: function(evt) {
									if(evt.lengthComputable) {
										var percentComplete = Math
											.round(evt.loaded *
												100 /
												evt.total);
										doms.progress
											.html(percentComplete
												.toString() +
												'%');
										// 应该是这里可以获取进度

									}
								},
								// 上传完成

								//
								"uploadComplete": function(evt) {
									var json = eval('(' +
										evt.target.responseText +
										')');
									if(checkJson(json)) {
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
											.html(
												'上传成功，2 s后返回主页');
										updateUserTransactionId(
											json.results.transactionId,
											config.CATE_VIDEO);
										setTimeout(
											function() {
												window.location.href = 'index.html';
											}, 2000)

									} else {
										alert(json.msg);
										$('#iosDialog2').css('display', 'none');
									}
								}

								// "uploadComplete": function (e) {
								// var rxp=/^0?2\d{2}$/;
								// if(rxp.test(e.status)==true){
								// $('.weui-dialog__bd
								// span').removeClass('fa-spinner');
								// $('.weui-dialog__bd
								// span').removeClass('fa-spin');
								// $('.weui-dialog__bd
								// span').addClass('fa-check-circle');
								// $('.weui-dialog__bd
								// span').css('color','springgreen');
								// // console.log( 'this is span for
								// '+$('.weui-dialog_bd span'))
								// $('.weui-dialog__bd p').html('上传成功，1
								// s后返回主页');
								// setTimeout(function(){
								// window.location.href = 'index.html';
								// },1000)
								// }else{
								// alert(e.status);
								// $('#iosDialog2').css('display','none');
								// }
								// }
							};
							// 进度调操作

							doms.fileToUpload.on("change",
								function() {
									doms.progress.find("span")
										.width("0");
									funs.fileSelected();
								});
						});
				}
			});
})(Zepto);