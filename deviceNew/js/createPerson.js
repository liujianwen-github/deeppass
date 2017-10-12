var timer = null;//用来存定时器的全局变量
var OutTimer = null;
var swipeCard = false;//只有提示刷卡时，刷卡才有效

// 创建VIP用户
function createVipPerson(personInfo) {
    clearInterval(timer);
    // num：成功显示的个人信息弹窗的个数
    var num = document.getElementById('footer').children.length;
    var personInfo = personInfo;
    // console.log(num);

    // 判断当前已经有几个用户信息框
    if (num == 0) {
        noPerson(personInfo);
    }
    if (num == 1) {
        onePerson(personInfo);
    }
    if (num == 2) {
        twoPerson(personInfo);
    }
    if (num >= 3) {
        threePerson(personInfo);
    }

    standby(config.waitTime);
};

// 获取签到时间
function time() {

    var time = new Date();
    var hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    var min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time
        .getMinutes();
    var sen = time.getSeconds() < 10 ? '0' + time.getSeconds() : time
        .getSeconds();
    var data = document.getElementById('time');

    return hour + ":" + min + ":" + sen;
    // return hour+":"+min;
};

//flag 多次推送一般用户时，用来控制只显示一次
var flag = false;
var normalTime = null;
// 创建一般需要刷卡用户 仅仅显示提示刷卡
function createNormalPerson() {
	swipeCard = true;
    //以下5行是禁止短时间连续触发提示刷卡
//  if(!config.allowMoreNormal){
//  		if (flag) {
//	        return
//	    }
//  }
    
    clearInterval(timer);
    
    var num = document.getElementById('footer').children.length;
    var $newPerson2 = $('<div class="person normalPerson"><span><img src="images/normalPerson.png"/></span><p class="message1">需刷卡验证</p></div>');
    
    if (num == 0) {

        $('#footer').append($newPerson2);
        flag = true;
        $('#footer div').eq(0).addClass('small');

        setTimeout(function() {
            $('#footer div').eq(0).removeClass('small').addClass('normal');
        }, 100);

    }
    if (num == 1) {

        $('#footer').append($newPerson2);
        flag = true;
//      setTimeout(function() {
            $('#footer div').eq(0).css('margin-left', -150);
//      }, 0)
//      setTimeout(function() {
            $('#footer div').eq(0).css('-moz-transition', 'all 0.3s');
//      }, 0)
        $('#footer div').eq(1).css({
            'margin-left': 400,
            'opacity': 0
        });
        $('#footer div').eq(1).css('background-image',
            "url(images/qiangdiao.png)").siblings().css('background-image',
            "url(images/shibie.png)");

        setTimeout(function() {
            $('#footer div').eq(1).css({
                'margin-left': 170,
                '-moz-transition': 'all 0.3s',
                'opacity': 1
            });
        }, 100);

    }
    if (num == 2) {

        $('#footer').append($newPerson2);
        flag = true;
        $('#footer div').eq(0).css('margin-left', -240);
//      setTimeout(function() {
            $('#footer div').eq(0).css('-moz-transition', 'all 0.3s');
//      }, 0)
        $('#footer div').eq(1).css('margin-left', 0);
//      setTimeout(function() {
            $('#footer div').eq(1).css('-moz-transition', 'all 0.3s');
//      }, 0)

        $('#footer div').eq(2).css({
            'margin-left': 400,
            'opacity': 0
        });

        $('#footer div').eq(2).css('background-image',
            "url(images/qiangdiao.png)").siblings().css('background-image',
            "url(images/shibie.png)");

        setTimeout(function() {
            $('#footer div').eq(2).css({
                'margin-left': 250,
                '-moz-transition': 'all 0.3s',
                'opacity': 1
            });
        }, 100);

    }

    if (num >= 3) {

        $('#footer').append($newPerson2);
        flag = true;
        $('#footer div').eq(0).css('margin-left', -550);
//      setTimeout(function() {
            $('#footer div').eq(0).css('-moz-transition', 'all 0.3s');
//      }, 0)
        $('#footer div').eq(1).css('margin-left', -250);
//      setTimeout(function() {
            $('#footer div').eq(1).css('-moz-transition', 'all 0.3s');
//      }, 0)
        $('#footer div').eq(2).css('margin-left', 0);
//      setTimeout(function() {
            $('#footer div').eq(2).css('-moz-transition', 'all 0.3s');
//      }, 0)
        $('#footer div').eq(3).css({
            'margin-left': 400,
            'opacity': 0
        });
        $('#footer div').eq(3).css('background-image',
            "url(images/qiangdiao.png)").siblings().css('background-image',
            "url(images/shibie.png)");

        setTimeout(function() {
            $('#footer div').eq(0).css('opacity', 1);
            $('#footer div').eq(3).css({
                'margin-left': 250,
                '-moz-transition': 'all 0.3s',
                'opacity': 1
            });

            setTimeout(function() {
                $('#footer div').eq(0).remove();
            }, 300);
        }, 100);
    }
	promot();//提示刷卡背景闪烁
    standby(config.normalWaitTime);
};

function noPerson(personInfo) {
    var $newPerson = personInfo;
    $('#footer').append($newPerson);
    $('#footer div').eq(0).addClass('small');
    $('#footer .time').eq(0).html(time());

    setTimeout(function() {
        $('#footer div').eq(0).removeClass('small').addClass('normal');
    }, 300);
};

function onePerson(personInfo) {
    var $newPerson = personInfo;

    $('#footer').append($newPerson);
    $('#footer .time').eq(1).html(time());

    $('#footer div').eq(0).css('margin-left', -150);
//  setTimeout(function() {
        $('#footer div').eq(0).css('-moz-transition', 'all 0.3s');
//  }, 0)
    $('#footer div').eq(1).css({
        'margin-left': 400,
        'opacity': 0
    });
    $('#footer div').eq(1).css('background-image', "url(images/qiangdiao.png)")
        .siblings().css('background-image', "url(images/shibie.png)");

    setTimeout(function() {
        $('#footer div').eq(1).css({
            'margin-left': 170,
            '-moz-transition': 'all 0.3s',
            'opacity': 1
        });

    }, 100);
};

function twoPerson(personInfo) {
    var $newPerson = personInfo;

    $('#footer').append($newPerson);
    $('#footer .time').eq(2).html(time());

    $('#footer div').eq(0).css('margin-left', -240);
//  setTimeout(function() {
        $('#footer div').eq(0).css('-moz-transition', 'all 0.3s');
//  }, 0)
    $('#footer div').eq(1).css('margin-left', 0);
//  setTimeout(function() {
        $('#footer div').eq(1).css('-moz-transition', 'all 0.3s');
//  }, 0)
    $('#footer div').eq(2).css({
        'margin-left': 400,
        'opacity': 0
    });
    $('#footer div').eq(2).css('background-image', "url(images/qiangdiao.png)")
        .siblings().css('background-image', "url(images/shibie.png)");

    setTimeout(function() {
        $('#footer div').eq(2).css({
            'margin-left': 250,
            '-moz-transition': 'all 0.3s',
            'opacity': 1
        });

    }, 100);
};

function threePerson(personInfo) {
    var $newPerson = personInfo;

    $('#footer').append($newPerson);
    $('#footer .time').eq(3).html(time());

    $('#footer div').eq(0).css('margin-left', -550);
//  setTimeout(function() {
        $('#footer div').eq(0).css('-moz-transition', 'all 0.3s');
//  }, 0)
    $('#footer div').eq(1).css('margin-left', -250);
//  setTimeout(function() {
        $('#footer div').eq(1).css('-moz-transition', 'all 0.3s');
//  }, 0)
    $('#footer div').eq(2).css('margin-left', 0);
//  setTimeout(function() {
        $('#footer div').eq(2).css('-moz-transition', 'all 0.3s');
//  }, 0)
    $('#footer div').eq(3).css({
        'margin-left': 400,
        'opacity': 0
    });
    $('#footer div').eq(3).css('background-image', "url(images/qiangdiao.png)")
        .siblings().css('background-image', "url(images/shibie.png)");

    setTimeout(function() {
        $('#footer div').eq(0).css('opacity', 1);
        $('#footer div').eq(3).css({
            'margin-left': 250,
            '-moz-transition': 'all 0.3s',
            'opacity': 1
        });

        setTimeout(function() {
            $('#footer div').eq(0).remove();
        }, 300);
    }, 100);
};

// 一定时间无人，进入待机状态
function standby(time) {
    var i = null; 
    if (time) {
        i = time;//设置自定义待机时间
    } else if (!time) {
        i = 90;//未设置待机时间，默认90秒
    }
    clearInterval(timer);
    clearInterval(OutTimer);
    // 无人刷脸时 倒计时进入待机状态动画
    timer = setInterval(function() {
        i--;
        console.log(i);
		//待机动画执行第一步
        if (i == 15) {
        		//有且只有一个刷卡提示框时
        		if($('#footer .normalPerson') && $('#footer .normalPerson').length == 1){
        			//下面是判断刷卡提示框所在的位置
        			if($('#footer .normalPerson').index() == 0){
        				if ($('#footer div').length == 3){
        					outThree();
        				}
        				if ($('#footer div').length == 2){
        					outTwo();
        				}
        				if ($('#footer div').length == 1){
        					outOne();
        				}
        			}
        			if($('#footer .normalPerson').index() == 1){
        				if ($('#footer div').length == 3){
        					idx1When3();
        				}
        				if ($('#footer div').length == 2){
        					idx1When2();
        				}
        			}
        			if($('#footer .normalPerson').index() == 2){
        				idx2When3();
        			}
        			swipeCard = false;
        		}
        		//没有提示刷卡框时
        		if($('#footer .normalPerson').length == 0){
        			// 判断此时有几个用户信息框
	            if ($('#footer div').length == 3) {
	                outThree();
	            }
	            if ($('#footer div').length == 2) {
	                outTwo();
	            }
	            if ($('#footer div').length == 1) {
	                outOne();
	            }
	            if ($('#footer div').length == 0){//进入这个判断 一般是陌生人激活视频窗口的时候
	                clear();
	            }
        		}
        		
            flag = false;//一般用户提示刷卡后，在待机规定时间内未刷卡，从而取消限制动画限制
            swipeCard = false;//规定时间内未刷卡，再刷无效
        }
		//待机动画执行第二步
        if (i == 10) {
            if ($('#footer div').length == 2) {
                outTwo();
            }
            if ($('#footer div').length == 1) {
                outOne();
            }
        }
		//待机动画执行第三步
        if (i == 5) {
            $('#footer div').eq(0).css('margin-left', -550);

            setTimeout(function() {
                $('#footer div').eq(0).remove();
            }, 300);
        }
		//待机动画执行最后一步
        if (i == 0) {
            clear();
        }

    }, 1 * 1000);

};

// 人证不一
function err() {
    var $err = $('<div id="err"></div>');

    $('#container').append($err);
    $('#err').css({
        'opacity': 0.9,
        'transition': 'all 0.2s'
    });

    var $errPerson = $('<div id="errPeosen" class="errPeosenSmall"><p class="errMessage">人证不一！</p></div>');

    // 遮罩出现
    $('#err').append($errPerson);

    // 人证不一 动画出现
    setTimeout(function() {
        $('#errPeosen').removeClass('errPeosenSmall').addClass('errPeosenNormal');

        // 自定义时间后 遮罩 和人证不一 消失
        setTimeout(function() {
            $('#errPeosen').removeClass('errPeosenNormal').addClass('errPeosenSmall');
            $('#errPeosen').css('transition', 'all 0.5s');
            $('#err').css({
                'opacity': 0,
                'transition':'all 0.4s'
            });

            // 遮罩消失
            setTimeout(function() {
                $('#err').remove();
                flag = false;//刷卡验证失败，取消限制
            }, 500);
           
        }, 2 * 1000); // 自定义 消失时间！！！

    }, 100)

};

var redBg = false;//针对短时多次触发提示刷卡函数的  红色背景闪烁开关变量
//提示刷卡
function promot() {
	if(redBg){//判断本次执行背景闪烁是否完成
		return
	}
	redBg = true;
	//红色背景（提示刷卡）执行动画   共3秒
	$('#red').animate({
        'opacity': 1
    }, 400).delay(100).animate({
        'opacity': 0
    }, 400).delay(100).animate({
        'opacity': 1
    }, 400).delay(100).animate({
        'opacity': 0
    }, 400).delay(100).animate({
        'opacity': 1
    }, 400).delay(100).animate({
        'opacity': 0
    }, 400);
    
	setTimeout(function () {//防止短时间触发导致的背景闪烁多次触发
		redBg = false;
	},3000);
	 
};

//待机清除定时器公共代码
function clear() {
	ifStart = false;
	// 清除两个canvas循环
    clearInterval(outpointInterval);
    clearInterval(circleInterval);
    clearInterval(cer);
    $('.out').css({
        'opacity': 0,
        'transition': 'all 0.3S'
    }) // 整个环形透明隐藏

    // 内圈缩小，换回待机图片
    $('#midCircle .midtime>div').animate({
        'width': '450px',
        'height': '450px'
    }, 500, 'linear');
	$('#backgroundImg').css('z-index', -1);
    bigEarth();
    
//  $('header .videoboxImg').css({'opacity': 0, "transition": "all 0.4s"});        
//  $('.videobox').css({
//		'width': '0.5%',
//		'height': '0.1%',
//		'margin': '43% auto',
//		'transition': 'all 0.3s'
//	});                  
	$('.videobox').css({
		'margin': '-53% auto',
		'transition': 'all 0.3s'
	}); 
	$('#centerCircle').css('opacity', 1);
	$('#footer div').remove();
	console.log('清空子元素');
	console.log('清除定时器');
	clearInterval(timer);
};
