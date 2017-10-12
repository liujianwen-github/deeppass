/**
 * Created by Administrator on 2016/11/30.
 */
/**
 * Created by Administrator on 2016/11/29.
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
    var m = date.getMinutes()
    var s = date.getSeconds();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var _date = date.getDate();
    var week = date.getDay();
    oTime.innerHTML = toDou(h)+':'+toDou(m);
    oDate.innerHTML =year+'-'+toDou(month)+'-'+toDou(_date);
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



//刷脸后出现请刷卡
function oBrushFace(){
    $(".promptTip").css("opacity","0").animate({ left:"2px",opacity:1}).text("请刷卡");
}


//刷卡后失败
function oBrushCardFail(){
    $(".promptTip").css("opacity","0").animate({ left:"2px",opacity:1}).text("验证失败");
}



function oBrushCardSuccess1(){
    $(".scanIng").hide();
}

//返回原始状态
function backOriginal(){

    clearShowInfo();
    $(".scanIng").show();
    $(".scanSuccess").hide();
    $(".promptTip").css("opacity","0").animate({ left:"2px",opacity:1}).text("正在识别中...");
}




//刷卡后成功
function showPart1(){
    $(".userInfoUl li").css({"opacity":"0","top":"50%","margin-top":"-150px"}).animate({"margin-top":"-131px",opacity:1});
}
function oBrushCardSuccess(num){

    var str1 = '<li><div class="userHead"><img src="images/head.jpg" alt=""/></div><div class="userInformation"><p class="name">李先生</p><p class="time">到访时间：10:00</p><div class="message">您今天上午 10:30 的会议马上就要开始了哦</div></div></li>';
    var str2 = '<li><div class="userHead"><img src="images/head.jpg" alt=""/></div><div class="userInformation"><p class="name">张先生</p><p class="time">到访时间：15:00</p><div class="message">识别成功，欢临您！</div></div></li>';
    var str3 = '<li><div class="userHead"><img src="images/head.jpg" alt=""/></div><div class="userInformation"><p class="name">夏先生</p><p class="time">到访时间：18:33</p><div class="message">您今天晚上 19:30 的会议马上就要开始了哦</div></div></li>';

    var strList = str1+str2+str3+'<li><div class="userHead"><img src="images/head.jpg" alt=""/></div><div class="userInformation"><p class="name">刘女士</p><p class="time">到访时间：18:33</p><div class="message">您今天晚上 19:30 的会议马上就要开始了哦</div></div></li>';

    $(".scanIng").hide();
    $(".scanSuccess").show();

    var box = $("#holder");
    function aa(number,position,top){
        var time = setInterval(function(){
            console.log(1);
            box.find("li:eq("+number+")").animate({
                "top": position,
                "margin-top":top
            }, 500);
            if(box.find("li:first").css("top")==position+"px"){
                clearInterval(time);
            }
        },500);

    }

    if(num==1) {
        clearShowInfo();
        box.append(str1);
        $(".userInfoUl li").css("background","url('images/liBgImgTop.png') no-repeat center");
        showPart1();
    }
    if(num==2){
        clearShowInfo();
        box.append(str1);
        showPart1();
        aa("0","0","0");

        var time1 = setTimeout(function(){
            box.append(str2);
            box.find("li:eq(1)").css({"opacity":"0","top":"50%","margin-top":"-150px"}).animate({"margin-top":"-131px",opacity:1});
            clearTimeout(time1);
        },1000);



    }
    if(num==3){
        clearShowInfo();
        box.append(str1);
        showPart1();
        aa("0","0","0");
        var time2 = setTimeout(function(){
            box.append(str2);
            box.find("li:eq(1)").css({"opacity":"0","top":"50%","margin-top":"-150px"}).animate({"margin-top":"-131px",opacity:1});
            clearTimeout(time2);
        },1000);
        var time3 = setTimeout(function(){

            box.append(str3);
            box.find("li:eq(2)").css({"opacity":"0","bottom":"0","margin-bottom":"20px"}).animate({"margin-bottom":"0",opacity:1});
            clearTimeout(time3);
        },1500);

    }
    if(num>3){
        clearShowInfo();
        box.append(strList);
        box.find("li").css({"position":"static","opacity":"0"}).animate({opacity:1});
        // num=0;
        times = setInterval('AutoScroll($("#demo"))', 3000);
    }


}
var times= null;
var num=0;
function clearShowInfo(){
    $("#holder").html("");
}

function AutoScroll(obj) {

    num++;
    $(obj).find("ul:first").animate({
        marginTop: "-262px"
    }, 500, function() {
        $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
    });
    console.log(num);
    if((($(obj).find("li").length)-3)==num){
        clearInterval(times);
        num=0;
    }

}