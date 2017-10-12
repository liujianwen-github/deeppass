/**
 * Created by Administrator on 2016/10/11.
 */

function toDou(num){
    if(num<10){
        return '0'+num;
    }else{
        return ''+num;
    }
}
var oTime= document.getElementById('timeNow');
var oDate= document.getElementById('timeDate');
var oDay= document.getElementById('timeDay');
function time(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
  //  var s = date.getSeconds();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var _date = date.getDate();
    var week = date.getDay();
    oTime.innerHTML = toDou(h)+':'+toDou(m);
    oDate.innerHTML =year+'/'+toDou(month)+'/'+toDou(_date);
    var weekStr;
    if (week == 0) {
        weekStr = "星期日";
    } else if (week == 1) {
        weekStr = "星期一";
    } else if (week == 2) {
        weekStr = "星期二";
    } else if (week == 3) {
        weekStr = "星期三";
    } else if (week == 4) {
        weekStr = "星期四";
    } else if (week == 5) {
        weekStr = "星期五";
    } else if (week == 6) {
        weekStr = "星期六";
    }
    oDay.innerHTML = weekStr;
}
time();
setInterval(time,1000);

var ele ;
var timer;
//自定义函数
$.fn.extend({
    rotate: function () {
        ele = this ;
        timer = setInterval('singleRotate()',20);
    }
});


//单次旋转
function singleRotate() {
	var degree = 10;
    degree = degree + 500 * Math.PI / 180;
    /*if(degree>=90){
        ele.css("transform","rotate(90deg)");
        return false;
    }*/
    ele.css("transform","rotate("+degree+"deg)");
}

//刷脸后出现请刷卡
function oBrushFace(){
    $(".promptIng").hide();
    $(".prompt").css("width","102px");
    $(".brushCard").show().animate({opacity:1});
    $(".promptSuccess").hide();
    $(".promptFail").hide().animate({opacity:0});

}
//刷卡后成功
function oBrushCardSuccess(){
    $(".brushCard").hide().animate({opacity:0});
    $(".promptIng").hide();
    $(".distinguishIng").hide();
    $(".promptSuccess").show();
    $(".rotateIcon").rotate();
    $(".rotateImg").fadeIn("300");
    $(".distinguishHead").fadeIn("300");
    $(".successPrompt").animate({ left:"8px",opacity:1});
    $(".prompt").css("width","230px");
    $(".promptFail").hide().animate({opacity:0});
}
//刷卡后失败
function oBrushCardFail(){
    $(".brushCard").hide().animate({opacity:0});
    $(".promptFail").show().animate({opacity:1});
    $(".promptSuccess").hide();
    $(".promptIng").hide();
    $(".prompt").css("width","130px");
}
//返回原始状态
function backOriginal(){
    $(".promptIng").show();
    $(".distinguishIng").show();
    $(".promptSuccess").hide();
    $(".promptFail").hide().animate({opacity:0});
    $(".brushCard").hide().animate({opacity:0});
    clearInterval(timer);
    $(".rotateIcon").css("transform","");
    $(".rotateImg").hide();
    $(".distinguishHead").hide();
    $(".successPrompt").animate({left:"-5px",opacity:0});
    $(".prompt").css("width","174px");
}


