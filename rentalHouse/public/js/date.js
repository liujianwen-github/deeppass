/**
 * 时间相关的js操作
 * 依赖dataInit.js
 * 
 */
"user strict";
var startTime,endTime;
//获取日期
var today=new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate();//今天
var yesterDay=new Date()-86400000;//昨天
var withInWeek=new Date()-86400000*7;//一周内
var withInMonth=new Date()-86400000*30;//一个月内
// yesterDay=new Date(yesterDay).getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate();		
// 今天：当前日期零点至今
// 昨天：一天前零点-今天零点



// 页面内所有下拉日期选单的填充

$('select').each(function(index,el){	
	$(this).find('option').each(function(index,el){
		// $('#dateList'+personType).val('今日 ('+new Date(today).getFullYear()+'/'+(new Date(today).getMonth()+1)+'/'+new Date(today).getDate()+')');
		// console.log('今日 ('+new Date(today).getFullYear()+'/'+(new Date(today).getMonth()+1)+'/'+new Date(today).getDate()+')')
		switch($(this).val()){
//			case'今日':
//				$(this).html('今日 ('+new Date(today).getFullYear()+'/'+(new Date(today).getMonth()+1)+'/'+new Date(today).getDate()+')');
//				break;
			case'0':
				$(this).html('今日 ('+new Date(today).getFullYear()+'/'+(new Date(today).getMonth()+1)+'/'+new Date(today).getDate()+')');
				break;
			case'1':
				$(this).html('昨日 ('+new Date(yesterDay).getFullYear()+'/'+(new Date(yesterDay).getMonth()+1)+'/'+new Date(yesterDay).getDate()+')');
				break;
			case'7':
				$(this).html('一周内 ('+today+'-'+new Date(withInWeek).getFullYear()+'/'+(new Date(withInWeek).getMonth()+1)+'/'+new Date(withInWeek).getDate()+')');
				break;
			case'30':
				$(this).html('一个月内 ('+today+'-'+new Date(withInMonth).getFullYear()+'/'+(new Date(withInMonth).getMonth()+1)+'/'+new Date(withInMonth).getDate()+')');
				break;
		}

	})
})



console.log(today);
//日期转换为时间戳；
today=dateConversion(today);
yesterDay=dateConversion(yesterDay);
withInWeek=dateConversion(withInWeek);
withInMonth=dateConversion(withInMonth);

endTime=new Date().getTime();//查询结束日期赋值当前时间
startTime=today;//开始时间赋值当前日期零点

function resetTime(personType){
	// console.log($('.tab-pane').eq(personType).find('select'));
	//重置时间
	startTime=new Date(today).getTime();
	endTime=new Date().getTime();
	today=new Date(today).getFullYear()+'/'+(new Date(today).getMonth()+1)+'/'+new Date(today).getDate();
	// $('#dateList'+personType).val('今日（'+today+')');
	if ($('#dateList'+personType).val()=='1'||'7'||'30') {
		console.log('日期')
	}
	console.log('今日（'+today+')')
	console.log(personType);
	$('#dateList'+personType).find('option').each(function(){
		// console.log($(this).val());
		// console.log(today)
		switch($(this).val()){
//			case'今日 ('+today+')':
//				$(this).html('今日 ('+today+')');
//				break;
			case'0':
				$(this).html('今日 ('+today+')');
				break;
			case'1':
				$(this).html('昨日 ('+new Date(yesterDay).getFullYear()+'/'+(new Date(yesterDay).getMonth()+1)+'/'+new Date(yesterDay).getDate()+')')
				break;
			case'7':
				$(this).html('一周内 ('+today+'-'+new Date(withInWeek).getFullYear()+'/'+(new Date(withInWeek).getMonth()+1)+'/'+new Date(withInWeek).getDate()+')');
				break;
			case'30':
				$(this).html('一个月内 ('+today+'-'+new Date(withInMonth).getFullYear()+'/'+(new Date(withInMonth).getMonth()+1)+'/'+new Date(withInMonth).getDate()+')');
				break;
		}
	})
	
	$('.tab-pane .visitHead .bootstrap-switch-on input').val('time');
	$('.tab-pane .visitHead .bootstrap-switch-on input').removeAttr('checked');
	setTimeout(function(){
		$('.tab-pane .visitHead .bootstrap-switch-on .bootstrap-switch-container').css('margin-left','0px')
	},50)

}



