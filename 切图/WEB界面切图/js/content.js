/**
 * Created by Administrator on 2016/11/11.
 */

$('.option a').click(function(){
    var _index = $(this).index();
    $(this).addClass('cur').siblings().removeClass('cur');
    $('.optionTab').eq(_index).show().siblings().hide();
});
$(".intAnalysis .intContent .pItem hr:eq(1)").css("background","#58CE58");
$(".intAnalysis .intContent .pItem hr:eq(2)").css("background","#B3DF9D");

var $options = $(".createUser").find(".pItem");
$options.each(function(){
    var $option = $(this),$input = $option.find(":radio");
    $option.on("click",function(){
        if(!$option.hasClass("current")){
            $options.removeClass("current");
            $options.not($option).each(function(){
                var $option = $(this),$input = $option.find(":radio");
                $input.prop("checked",false);
            });
            $option.addClass("current");
            $input.prop("checked",true);
        }
    });
    if($input.prop("checked")){
        $option.addClass("current");
    }
});

var $options2 = $(".intAnalysis").find(".pItem");
$options2.each(function(){
    var $option = $(this),$input = $option.find(":radio");
    $option.on("click",function(){
        if(!$option.hasClass("current")){
            $options2.removeClass("current");
            $options2.not($option).each(function(){
                var $option = $(this),$input = $option.find(":radio");
                $input.prop("checked",false);
            });
            $option.addClass("current");
            $input.prop("checked",true);
        }
    });
    if($input.prop("checked")){
        $option.addClass("current");
    }
});

var $options3 = $(".leaveMessage").find(".pItem");
$options3.each(function(){
    var $option = $(this),$input = $option.find(":radio");
    $option.on("click",function(){
        if(!$option.hasClass("current")){
            $options3.removeClass("current");
            $options3.not($option).each(function(){
                var $option = $(this),$input = $option.find(":radio");
                $input.prop("checked",false);
            });
            $option.addClass("current");
            $input.prop("checked",true);
        }
    });
    if($input.prop("checked")){
        $option.addClass("current");
    }
});

var $options4 = $(".searchTimeInfo").find(".pItem");
$options4.each(function(){
    var $option = $(this),$input = $option.find(":radio");
    $option.on("click",function(){
        if(!$option.hasClass("current")){
            $options4.removeClass("current");
            $options4.not($option).each(function(){
                var $option = $(this),$input = $option.find(":radio");
                $input.prop("checked",false);
            });
            $option.addClass("current");
            $input.prop("checked",true);
        }
    });
    if($input.prop("checked")){
        $option.addClass("current");
    }
});
    $("#userScroll").jScrollPane();


$(".searchTimeInfo .addSex .pItem").click(function(){
        var num = $(this).index();
        if(num==4){
            $(".hourNum").show();
        }else{
            $(".hourNum").hide();
        }

});

$(".leaveMessage .addSex .pItem").click(function(){
    var num = $(this).index();
    if(num==0){
        $(".shortMessage").show();
    }else{
        $(".shortMessage").hide();
    }

});
$("#searchInfoBottomCont").Slide({
    effect : "scroolLoop",
    autoPlay:false,
    speed : "normal",
    timer : 3000,
    steps:1
});
var start = {
    format: 'YYYY-MM-DD hh:mm:ss',
    minDate: $.nowDate(0), //设定最小日期为当前日期
    isinitVal:true,
    festival:false,
    ishmsVal:false,
    maxDate: '2099-06-30 23:59:59', //最大日期
    choosefun: function(elem,datas){
        end.minDate = datas; //开始日选好后，重置结束日的最小日期
    }
};
var end = {
    format: 'YYYY-MM-DD hh:mm:ss',
    minDate: $.nowDate(0), //设定最小日期为当前日期
    festival:false,
    maxDate: '2099-06-16 23:59:59', //最大日期
    choosefun: function(elem,datas){
        start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
    }
};
$('#startDate').jeDate(start);
$('#endDate').jeDate(end);
