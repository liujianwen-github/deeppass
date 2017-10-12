
var $options = $(".userInfo").find(".pItem");
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


var $options4 = $(".leaveMessage").find(".pItem");
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

$(".leaveMessage .addSex .pItem").click(function(){
    var num = $(this).index();
    if(num==1){
        $(".messageTime").show();
    }else{
        $(".messageTime").hide();
    }

});

$(".chooseBar .timePart").click(function(){
	var _index = $(this).index();	
	console.log(_index);
	//$()
	$('.chooseBar .timePart:lt('+(_index)+')').addClass('checked');
	$('.chooseBar .timePart:gt('+(_index-1)+')').removeClass('checked');
	
	if(_index==1){
		$(".schedule").css('width','5%');
		$(".timeNum").text("半小时内").css("opacity","0").animate({ opacity:1});
		$(".timCircle").attr("src", "images/b-1.png");  
	}
	if(_index==2){
		$(".schedule").css('width','25%');	
		$(".timeNum").text("4小时内").css("opacity","0").animate({ opacity:1});
		$(".timCircle").attr("src", "images/b-2.png");  
	}
	if(_index==3){
		$(".schedule").css('width','50%');
		$(".timeNum").text("12小时内").css("opacity","0").animate({ opacity:1});
		$(".timCircle").attr("src", "images/b-3.png");  
	}
	if(_index==4){
		$(".schedule").css('width','100%');
		$(".timeNum").text("24小时内").css("opacity","0").animate({ opacity:1});
		$(".timCircle").attr("src", "images/b-4.png");  
	}
	
	
	
});

