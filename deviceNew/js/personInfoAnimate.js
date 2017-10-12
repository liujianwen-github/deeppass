//进入待机的动画函数

//一般情况
function outThree(){
	$('#footer div').eq(0).css('margin-left', -550);
	$('#footer div').eq(1).css('margin-left', -150);
	$('#footer div').eq(2).css('margin-left', 170);

	setTimeout(function() {
		$('#footer div').eq(0).remove();
	}, 300);
};

function outTwo(){
	$('#footer div').eq(0).css('margin-left', -550);
	$('#footer div').eq(1).css('margin-left', 0);

	setTimeout(function() {
		$('#footer div').eq(0).remove();
	}, 300);
}

function outOne(){
	$('#footer div').eq(0).css('margin-left', -550);

	setTimeout(function() {
		$('#footer div').eq(0).remove();

		OutTimer = setTimeout(function() {
			clear();
		}, 5000);

	}, 300);
}

//提示刷卡  位于下标1的位置
function idx1When3(){
	$('#footer .normalPerson').fadeOut(600, function(){
		$('#footer div').eq(0).css('margin-left', -150);
		$('#footer div').eq(2).css('margin-left', 170);
		setTimeout(function(){
			$('#footer .normalPerson').remove();
		},700);
	});
};

function idx1When2(){
	$('#footer .normalPerson').css({
		'margin-left': 550,
		'transition': 'all 0.6s'
	});
	$('#footer div').eq(0).css('margin-left', 0);
	setTimeout(function(){
		$('#footer .normalPerson').remove();
	},700);
}

//提示刷卡  位于下标2的位置
function idx2When3(){
	$('#footer .normalPerson').fadeOut(600, function(){
		$('#footer div').eq(0).css('margin-left', -150);
		$('#footer div').eq(1).css('margin-left', 170);
		setTimeout(function(){
			$('#footer .normalPerson').remove();
		},700);
	});
}
