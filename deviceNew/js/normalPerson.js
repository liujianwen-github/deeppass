function normalPerson(json) {
    var strList = '';
    if (json != null && json.code == json.succ_code) {
        var results = json.results;
        if (results != null && results != '' && results.user != null &&
            results.user != '') {
            var user = results.user;
            var imgUrl = user.image;
            var message = user.message;
            var userName = user.name;
            var birthDate = user.birthDate;
            var strList = '<span><img src="' + imgUrl +
                '"/></span><p class="per-name">' + userName +
                '</p ><p class="time" id="time">' + time() + '</p >';

            if (message != null && message != "") {
                strList += '<p class="message">' + message + '</p >';
            }
            if (birthDate != null && birthDate != "") {
                var nowDate = new Date().format("MM-dd");
                birthDate = new Date(birthDate).format("MM-dd");
                if (birthDate == nowDate) {
                    specialPerson(imgUrl);
                }
            }
        }
    }
    var $newPerson3 = $(strList);

    //改变提示刷卡框内容为用户信息
    $('#footer .normalPerson').eq(0).html($newPerson3).removeClass('normalPerson');
    flag = false;
    
    standby(config.waitTime);
}

function errNoPerson() {
//	err();
//  setTimeout(function() {
    		
        $('#footer div').eq(0).removeClass('normal').addClass('small');
        setTimeout(function() {
            $('#footer div').eq(0).remove();
        }, 500);
        
//  }, 500);
//  standby(config.waitTime);
}

function errOnePerson() {
//	err();
//  setTimeout(function() {
    		
        $('#footer div').eq(1).css({
            'margin-left': 550,
            'transition': 'all 0.6s'
        });

        $('#footer div').eq(0).css({
            'margin-left': 0,
            'transition': 'all 0.6s'
        });
        setTimeout(function() {
            $('#footer div').eq(1).remove();
        }, 500);

//  }, 500);
//  standby(config.waitTime);
}

function errTwoPerson() {
//	err();
//  setTimeout(function() {
    		
        $('#footer div').eq(2).css({
            'margin-left': 550,
            'transition': 'all 0.6s'
        });
        $('#footer div').eq(1).css({
            'margin-left': 170,
            'transition': 'all 0.6s'
        });
        $('#footer div').eq(0).css({
            'margin-left': -150,
            'transition': 'all 0.6s'
        });
        setTimeout(function() {
            $('#footer div').eq(2).remove();
        }, 500);

//  }, 500);
//  standby(config.waitTime);
}

function errThreePerson() {
//	err();
//  setTimeout(function() {
    		
        $('#footer div').eq(3).css({
            'margin-left': 550,
            'transition': 'all 0.6s'
        });
        $('#footer div').eq(2).css({
            'margin-left': 250,
            'transition': 'all 0.6s'
        });
        $('#footer div').eq(1).css({
            'margin-left': 0,
            'transition': 'all 0.6s'
        });
        $('#footer div').eq(0).css({
            'margin-left': -250,
            'transition': 'all 0.6s'
        });
        setTimeout(function() {
            $('#footer div').eq(3).remove();
        }, 500);

//  }, 500);
//  standby(config.waitTime);
}

//function Err(normal) {
//  var num = document.getElementById('footer').children.length;
//  if (num == 1) {
//      errNoPerson();
//  } else if (num == 2) {
//      errOnePerson();
//  } else if (num == 3) {
//      errTwoPerson();
//  } else if (num == 4) {
//      errThreePerson();
//  }
//}

function Err(normal) {
    var num = document.getElementById('footer').children.length;
    if(!normal){
    		err();
    }
    setTimeout(function() {
    		if (num == 1) {
	        errNoPerson();
	    } else if (num == 2) {
	        errOnePerson();
	    } else if (num == 3) {
	        errTwoPerson();
	    } else if (num == 4) {
	        errThreePerson();
	    }
    }, 500);
    standby(config.waitTime);
}