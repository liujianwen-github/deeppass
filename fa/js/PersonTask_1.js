//create 2017-5-11

//var HOST = 'http://demo.deepdot.cn/';
var HOST = 'http://localhost:8080/';
var userkey = '982d6ebc_7f6e_4062_a004_7dcab59e';
var json = null; //用来存储成功请求来的数据 方便后续调用操作
var sceneIndex = null; //记录双击的图片所属li的下标

$(function() {
    //	for:页面加载完成 请求getTask接口获取数据
    $.ajax({
        type: "post",
        url: HOST + "lowRentHouse/management/getPersonTask",
        //		url : '01.json',
        timeout: 3000,
        data: {
            'userkey': userkey
        },
        beforeSend: function() {
            $('#loading').show();
            $('#load').show();
            $('.box').show();
        },
        complete: function() {
            $('#loading').hide();
            $('#load').hide();
            $('.box').hide();
            if (status == 'timeout') {
                alert('超时');
            }
        },
        success: function(data) {
            json = data.results.taskDto;
            console.log(data);
            var results = data.results;
            var taskDto = results.taskDto;
            if (taskDto == null) {
                $('#loading a').show();
                $('#err').show();
                $('#load').hide();
                $('.spinner').hide();
            }
            var facetrackTaskDto = taskDto.facetrackTaskDto;
            var personTaskDto = taskDto.personTaskDto;
            var compareList = taskDto.compareList;
            //			返回数据为空
            if (facetrackTaskDto == null && personTaskDto == null && compareList == null) {
                console.log('返回为空');
                window.location.reload();
            }
            //		****F-P****
            else if (facetrackTaskDto != null && compareList != null) {
                var facetrackId = facetrackTaskDto.facetrackId;
                //				展示personId
                $('#personId').html('<b>facetrackID: </b><span style="color: orangered;">' + facetrackId + '</span>');
                //				场景图展示按钮
                $('.btn1').show();
                var scene = facetrackTaskDto.scene;
                //				展示facetrackTaskDto图
                var imgs = facetrackTaskDto.image;
                showSencePicture(imgs);
                //	************公共部分代码*****************************************
                //				创建per
                var length = compareList.length;
                createPre(length);
                //				展示第一人的图片
                var per1 = compareList[0];
                var per1Imags = per1.image;
                showComparePicture(per1Imags);
                //				展示第一个人的分值和相似度
                var per1Score = per1.score;
                var per1Percent = per1.percent;
                addScore(per1Score, per1Percent);
                //				添加场景图
                $('#sencePicture .content').append('<img src="' + scene + '" />');
                //	************公共部分结束*******************************************
                //				双击删除图片	
                $('.sencePicture ul').on('dblclick', 'li', function() {
                    sceneIndex = $(this).index();
                    console.log(sceneIndex);
                    deblPic(sceneIndex, facetrackId);
                });
                //				对应per的personId
                var personId = null;
                //				F-P 点击"是"按钮
                $('.shi').on('click', function() {
                    //					判断提示框的类名 Y:facetrackMatchedToPerson N:facetrackNotMatched
                    if ($('#tishi').hasClass('Y')) {
                        personId = compareList[idx].personId;
                        facetrackMatchedToPerson(facetrackId, personId);
                        reloading();
                    } else if ($('#tishi').hasClass('N')) {
                        facetrackNotMatched(facetrackId);
                        reloading();
                    }
                });
            }
            //		****P-P****
            else if (personTaskDto != null && compareList != null) {
                $('.btn1').hide();
                //				展示personId
                var personId = personTaskDto.personId
                $('#personId').html('<b>personID: </b><span style="color: orangered;">' + personId + '</span>');
                //				imgs是需要展示在上方的图片数组
                var imgs = personTaskDto.image;
                showSencePicture(imgs);
                //	************公共部分代码******************************************
                //				创建per
                var length = compareList.length;
                createPre(length);
                //				展示第一人的图片
                var per1 = compareList[0];
                var per1Imags = per1.image;
                showComparePicture(per1Imags);
                //				展示第一个人的分值和相似度
                var per1Score = per1.score;
                var per1Percent = per1.percent;
                addScore(per1Score, per1Percent);
                //	************公共部分结束******************************************
                //				场景图对应的personId
                var srcPersonId = personTaskDto.personId;
                console.log(srcPersonId)
                    //				获取对应per的personId
                var destPersonId = null;
                //				P-P 点击"是"按钮
                $('.shi').on('click', function() {
                    //					判断提示框的类名 Y:mergePerson N:personNotMatched
                    if ($('#tishi').hasClass('Y')) {
                        destPersonId = compareList[idx].personId;
                        mergePerson(srcPersonId, destPersonId);
                        reloading();
                    } else if ($('#tishi').hasClass('N')) {
                        personNotMatched(srcPersonId);
                        reloading();
                    }
                });
            }
        },
        error: function(data) {
            console.log('出错了');
            console.log(data);
        }
    });
})

//^^^^^^^^^^^^^^^^^^^^功能函数^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//场景图展示函数
function showSencePicture(images) {
    var images = images;
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        var str = '<li><img src="' + img + '" alt="" /></li>';
        $('.sencePicture .ul').append(str);
    }
}

//对比图展示函数
function showComparePicture(images) {
    var images = images;
    var length = images.length;
    if (length >= 7) {
        length = 7;
    }
    for (var i = 0; i < length; i++) {
        var img = images[i];
        var str = '<li><img src="' + img + '" alt="" /></li>';
        $('.comparePicture .ul').append(str);
    }
}

//添加分值和相似度
function addScore(score, percent) {
    var score = score;
    score = score.toString().substring(0, 4);
    var percent = percent;
    percent = percent.toString().substring(0, 4);
    $('.score').html(score);
    $('.percent').html(percent);
}

//创建per个数
function createPre(length) {
    var length = length;
    for (var i = 0; i < length; i++) {
        //		人数从1开始
        var j = i + 1;
        //字符串需要改动
        var str = '<li>per' + j + '</li>';
        $('.ul2').append(str);
    }
    $('.ul2 li:first-child').addClass('current').siblings().removeClass('current');
}

//切换不同per对应改变相应的图片、分值和相似度
function showPerInfo(index) {
    $('.comparePicture ul').children().remove();
    var index = index;
    var info = json.compareList[index];
    var imgs = info.image;
    var percent = info.percent;
    var score = info.score;
    showComparePicture(imgs);
    addScore(score, percent);
}

//双击图片删除
function deblPic(index, facetrackId) {
    var imgSrc = null;
    //	alert('真的确定要删除么？');
    imgSrc = $('.sencePicture ul li').eq(index).children("img:first-child");
    //	获取要删除图片的src
    imgSrc = imgSrc.attr('src');
    console.log(imgSrc);
    $('.sencePicture ul li').eq(index).css('display', 'none');
    //	调用接口deleteFacetrackImage
    $.ajax({
        type: "post",
        url: HOST + "lowRentHouse/management/deleteFacetrackImage",
        data: {
            'userkey': userkey,
            'facetrackId': facetrackId,
            'imageUrl': imgSrc
        },
        error: function(data) {
            console.log('双击图片 ajax出错了');
            console.log(data);
        },
        success: function(data) {
            if (data.msg == 'SUCC') {
                //				删除双击元素
                $('.sencePicture ul li').eq(index).remove();
                console.log('已删除对应下表为：' + index + ' 的图片');
                console.log('删除的图片是：' + imgSrc);
            } else if (data.msg == 'Fail') {
                console.log('删除失败')
            }
        }
    });
}

//P-P  是   合并person
function mergePerson(srcPersonId, destPersonId) {
    $.ajax({
        type: "post",
        url: HOST + "lowRentHouse/management/mergePerson",
        data: {
            'userkey': userkey,
            'srcPersonId': srcPersonId,
            'destPersonId': destPersonId
        },
        error: function(data) {
            console.log('调用mergePerson接口失败');
            console.log(data);
        },
        success: function(data) {
            if (data.msg == 'SUCC') {
                console.log('合并person成功');
            }
            if (data.msg == 'Fail') {
                console.log('合并person失败');
            }
        }
    });
}

//P-P  否
function personNotMatched(personId) {
    $.ajax({
        type: "post",
        url: HOST + "lowRentHouse/management/personNotMatched",
        data: {
            'userkey': userkey,
            'personId': personId
        },
        error: function(data) {
            console.log('调用personNotMatched接口失败');
            console.log(data);
        },
        success: function(data) {
            if (data.msg == 'SUCC') {
                console.log('personNotMatched提交成功');
            }
            if (data.msg == 'Fail') {
                console.log('personNotMatched提交失败');
            }
        }
    });
}

//F-P 是
function facetrackMatchedToPerson(facetrackId, personId) {
    $.ajax({
        type: "post",
        url: HOST + "lowRentHouse/management/facetrackMatchedToPerson",
        data: {
            'userkey': userkey,
            'facetrackId': facetrackId,
            'personId': personId
        },
        error: function(data) {
            console.log('调用facetrackMatchedToPerson接口失败');
            console.log(data);
        },
        success: function(data) {
            if (data.msg == 'SUCC') {
                console.log('facetrackMatchedToPerson提交成功');
            }
            if (data.msg == 'Fail') {
                console.log('facetrackMatchedToPerson提交失败');
            }
        }
    });
}

//F-P 否
function facetrackNotMatched(facetrackId) {
    $.ajax({
        type: "post",
        url: HOST + "lowRentHouse/management/facetrackNotMatched",
        data: {
            'userkey': userkey,
            'facetrackId': facetrackId
        },
        error: function(data) {
            console.log('调用facetrackNotMatched接口失败');
            console.log(data);
        },
        success: function(data) {
            if (data.msg == 'SUCC') {
                console.log('facetrackNotMatched提交成功');
            }
            if (data.msg == 'Fail') {
                console.log('facetrackNotMatched提交失败');
            }
        }
    });
}

//获取对应per的personId
function getPersonId(index) {
    idx = index;
    return idx;
}

//自定义秒数后 刷新页面
function reloading() {
    setTimeout(function() {
        window.location.reload();
    }, 1 * 1000)
}