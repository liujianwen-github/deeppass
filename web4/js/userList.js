/**
 * 点击查看详细信息 TODO
 */
$('.useList')
		.on(
				'click',
				'.userInfos',
				function() {
					var imgUrl = $(this).find('img').attr('src');
					var name = $(this).attr('yname');
					var ytime = $(this).attr('ytime');
					var personId = $(this).attr('personId');
					var registTime = $(this).attr('registTime');
					var noFrom = $(this).attr('noFrom');
					var _index = $(this).index();
					var str = '';
					$('#userScroll').html('');
					str = '<div class="setHead"><img src="' + imgUrl
							+ '" alt="头像" />' + '</div>'
							+ '<div class="leaveMessageTop">'
							+ '<p class="name">' + name + '</p>'
							+ '<p class="userInfoTime">'
							+ '<span>最后到访时间：</span>' + ytime + '</p>'
							+ '<p class="userInfoTime">' + '<span>注册时间：</span>'
							+ registTime.substr(0, 19) + '</p>'
							+ '<p class="userInfoTime">' + '<span>注册方式：</span>'
							+ getUserInfoByPersonId(noFrom) + '</p>' + '</div>'
							+ '<input type="hidden" id="sendz" imgUrl="'
							+ imgUrl + '" name="' + name + '" personId="'
							+ personId + '">'
					$('#userInfos .dialogTop').html(str);

					$
							.post(
									config.API_HOST
											+ 'personManage/getPersonMatchedList',
									{
										'userkey' : getUserKey(),
										'pageNo' : 1,
										'pageCount' : config.pageCount,
										'personId' : personId
									},
									function(data) {
										var list = '';
										var matchList = data.results.list;
										for ( var i in matchList) {
											var item = matchList[i];
											list += '<li><br/>'
													+ '<div class="time">'
													+ '<p class="date">'
													+ item.createTime.substr(0,
															10)
													+ '</p>'
													+ '<p class="btn" '
													+ " onclick='showSourceImg(\""
													+ item.sourceImg
													+ "\");'"
													+ 'style="color: black;padding:0.1em 0.2em;font-size:12px;">查看场景图</p>'
													+ '<p class="num">'
													+ item.createTime.substr(
															11, 12) + '</p>'
													+ '</div> <img src="'
													+ item.facetrackImage + '"';
											list += " onclick='seachImgs(\""
													+ item.facetrackId
													+ "\");'";
											list += ' alt="" />' + '<hr />'
													+ '</li>';
										}
										$('#userScroll').html(list);
									})
				});

/**
 * 设置留言 TODO
 */
$('.useList')
		.on(
				'click',
				'.setWord',
				function() {
					$("#mytext").attr("value", "")
					$('.leaveMessage .dialogTop').html("");
					var imgUrl = '';
					imgUrl = $(this).attr('imgUrl');
					var name = '';
					name = $(this).attr('yname');
					var personId = $(this).attr('personId');
					var str = '';
					str = '<div class="setHead">' + '<img src="'
							+ imgUrl
							+ '" alt="头像" />'
							+ '</div>'
							+ '<div class="leaveMessageTop">'
							+ '<p class="name">'
							+ name
							+ '</p>'
							+ '<p class="nameSet">留言设置</p>'
							+ '<div class="addSex">'
							+ '<div class="pItem current">'
							+ '短期留言<input name="message" type="radio" value="1" class="radio" checked="checked">'
							+ '</div>'
							+ '<div class="pItem">'
							+ '长期留言<input name="message" type="radio" value="0" class="radio">'
							+ '</div>'
							+ '</div>'
							+ '<div class="shortMessage">'
							+ '<div class="timeChoose">'
							+ '开始时间：<input class="datainp" id="startDate" type="text"'
							+ 'placeholder="请选择" readonly>'
							+ '</div>'
							+ '<div class="timeChoose">'
							+ '结束时间：<input class="datainp" id="endDate" type="text"'
							+ 'placeholder="请选择" readonly>' + '</div>'
							+ '</div>' + '</div>'
							+ '<input type="hidden" id="personId" value="'
							+ personId + '">';

					$('.leaveMessage .dialogTop').html(str);
					$(".pointMessage").html('&nbsp;');
					// 置空设置留言中的系统提示信息

					// 设置留言选择类型
					var $options3 = $(".leaveMessage").find(".pItem");
					$options3
							.each(function() {
								var $option = $(this), $input = $option
										.find(":radio");
								$option
										.on(
												"click",
												function() {
													if (!$option
															.hasClass("current")) {
														$options3
																.removeClass("current");
														$options3
																.not($option)
																.each(
																		function() {
																			var $option = $(this), $input = $option
																					.find(":radio");
																			$input
																					.prop(
																							"checked",
																							false);
																		});
														$option
																.addClass("current");
														$input.prop("checked",
																true);
													}
												});
								if ($input.prop("checked")) {
									$option.addClass("current");
								}
							});
					// 选择留言类型
					$(".leaveMessage .addSex .pItem").click(function() {
						var num = $(this).index();
						if (num == 0) {
							$(".shortMessage").show();
						} else {
							$(".shortMessage").hide();
						}

					});
					// 短期留言开始时间和结束时间
					var start = {
						format : 'YYYY-MM-DD hh:mm:ss',
						minDate : $.nowDate(0), // 设定最小日期为当前日期
						isinitVal : true,
						festival : false,
						ishmsVal : false,
						maxDate : '2099-06-30 23:59:59', // 最大日期
						choosefun : function(elem, datas) {
							end.minDate = datas; // 开始日选好后，重置结束日的最小日期
						}
					};
					var end = {
						format : 'YYYY-MM-DD hh:mm:ss',
						minDate : $.nowDate(0), // 设定最小日期为当前日期
						festival : false,
						maxDate : '2099-06-16 23:59:59', // 最大日期
						choosefun : function(elem, datas) {
							start.maxDate = datas; // 将结束日的初始值设定为开始日的最大日期
						}
					};
					$('#startDate').jeDate(start);
					$('#endDate').jeDate(end);
				});