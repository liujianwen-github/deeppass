var config = {
    HOST: 'http://localhost:8080/client/',
    //待机等待时间（不能小于15秒，大于15多少，就持续多少秒
    waitTime: 25,
    //刷卡提示框持续时间（不能小于15秒，大于15多少，就持续多少秒）
    normalWaitTime: 20,
    //是否允许短时间推送多个提示刷卡信息框
    allowMoreNormal: false
}

function active() {//激活
    startReader();
}

function createTestPerson(data) {
    backImgAnimate();
    setTimeout(function() {
        createPersonInfo(data);
    }, 1.4 * 1000);
}

var testPerson = '';

// 设置等待时间
$('#set').click(function () {
    var time = $('#btns input').val();  
    config.waitTime = parseInt(time) + config.waitTime;
    console.log(config.waitTime)
})