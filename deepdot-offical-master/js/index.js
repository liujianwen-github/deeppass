/*
 * created by deepdot on 2017/03/02 11:05
 */
(function($){
	console.log('window.onload<br/>');
	var i=0;//第几步动画
	animate1()
	.then(function(data){
//		console.log(data);
		return animate2();
	})
	.then(function(data){
//		console.log(data);
		return animate3()
	});
	
	
	//动画步骤
	function animate1(){
		var step=new Promise(function(resolve, reject) {
			console.log('2秒后机器出现<br/>');
			jishi(2);
			setTimeout(function(){
				console.log('机器出现<br/>');
				resolve(i++);
				$('#img_camera').animate({'opacity':'1'},1*1000);
//				resolve(1);
			},2*1000)
		});
		return step;
	}
	function animate2(){
		console.log('1秒后灯光亮起<br/>');
		jishi(1);
		var step=new Promise(function(resolve, reject) {
			setTimeout(function () {
				console.log('机器LED灯亮起<br/>');
				$('#switchOn').animate({"opacity":"1"},2*1000);
				resolve(i++);
			},1*1000);
		});
		return step;
	}
	function animate3(){
		console.log('5秒后广告语出现<br/>');
		jishi(1);
		var step=new Promise(function(resolve, reject) {
			setTimeout(function () {
				console.log('页面中心广告语出现<br/>');
				$('#center-title img').animate({"opacity":"1"},1*1000);
				resolve(i++);
			},1*1000);
		});
//		return step;
	}
	
//计时器
function jishi(data){
	var total=data;
	var i=0;
	setInterval(function bibi(){
		if(i<total){
			console.log(total-i+'<br/>');
			i++;
		}else{
			clearInterval(bibi);
		}
	},1000)
	
}
	console.log("页面宽度为"+window.innerWidth+"px，\n页面高度为"+window.innerHeight+"px.<br/>");
	var titleHeight=(window.innerHeight-700)/2;
	$('#center-title img').css('margin-top',titleHeight+'px');
	$('.containers').css('height',window.innerHeight);
})(jQuery);
