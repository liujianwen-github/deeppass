/**
 * 2017.04.26 20:02
 */
/**
 * @Author    liujianwen
 * @DateTime  2017-04-27
 * @description  [住客、陌生人、黑名单查看详情按钮（图标->）]
 */
function getmessageDetails() {
	console.log('获取查看总览的person类型：'+$(this).parents('.visitItem').attr('personType'));

}


//获取地址栏后面的参数
function getQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
/**
 * [将日期转换为时间戳]
 * @param  {[String]} date [需要转换的日期]
 * @return {[Number]}      [参数日期的0点毫秒数]
 */
function dateConversion(date) {
        var newDate=new Date(date).getFullYear()+'/'+(new Date(date).getMonth()+1)+'/'+new Date(date).getDate();//转换为日期
        return new Date(newDate).getTime();//转换为毫秒
    }


function  timeStampConversion(timeStamp){
	//数值不足两位时前面加上0
	var mon=new Date(timeStamp).getMonth()+1<10?''+Number(new Date(timeStamp).getMonth()+1) : new Date(timeStamp).getMonth()+1;
	var day=new Date(timeStamp).getDate()<10 ? ''+new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
	var newDate=new Date(timeStamp).getFullYear()+'-'+mon+'-'+day;
	return newDate;
}

// function closeDetail(personType){
// 	if (personType!=1 && personType !=2 && personType !=3) {
// 		window.location.reload();
// 	}
// 	// console.log($scope.currentPage);
// 	$('.tab-pane').eq(personType).addClass('active');
// 	$('.tab-pane').eq(personType).css('display','block');
// 	$('.tab-pane').eq(personType).siblings().removeClass('active');
// 	$('#detailBox').css('display','none');
	
// }

function isArray(arr){
    return arr instanceof Array;
}

// 允许、禁止点击
function stopClick(){
	$('.MASK').css('visibility','visible');
	setTimeout(function(){
		$('.MASK').css('visibility','hidden');
	},1000)
}
function startClick(){
	$('.MASK').css('visibility','hidden');
	setTimeout(function(){
		$('.MASK').css('visibility','hidden');
	},1000)
}
