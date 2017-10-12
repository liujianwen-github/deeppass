
//for场景图按钮-> 场景图探出消失效果
$(function(){
	$('.btn1').on('click',function(){
		$('#sencePicture').show();
		$('.btn1').css({
			'backgroundColor':'lightseagreen',
			'color':'#fff'
		});
	});
	$('#x').on('click',function(){
		$('#sencePicture').hide();
		$('.btn1').css({
			'backgroundColor':'#fff',
			'color':'black'
		});
	});
//	点击不同per  切换显示
	$('.ul2').on('click','li',function(){
		$(this).addClass('current').siblings().removeClass('current');
	});
//	点击是/否出现确认提交框
	$('.yes').click(function(){
		$('#tishi').show();
		$('#tishi').addClass('Y').removeClass('N');
	});
	$('.no').click(function(){
		$('#tishi').show();
		$('#tishi').addClass('N').removeClass('Y');
	});
//	确认提交框 点击是/否  提交框消失
	$('.fou').click(function(){
		$('#tishi').hide();
	});
	$('.shi').click(function(){
		$('#tishi').hide();
	});
//	点击刷新页面
	$('.refresh').click(function(){
		window.location.reload();
	});
})
