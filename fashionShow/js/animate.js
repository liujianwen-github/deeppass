
var str = '';

var moveTime = 0.1;	
//$('body').click(function(){
//	getData(data)
//	animate()
//})

function animate(){
	var lis = document.querySelectorAll('.ul li');
	var num = lis.length;
	if( num == 1){
		move(0,6);
		setTimeout(function(){
			$('.ul').append(str);
		},moveTime*1000)
	}
	else if( num == 2){
		move(0,5);
		move(1,0);
		setTimeout(function(){
			$('.ul').append(str);
		},moveTime*1000)
	}
	else if( num == 3){
		move(0,4);
		move(1,0);
		move(2,0);
		setTimeout(function(){
			$('.ul').append(str);
		},moveTime*1000)
	}
	else if( num == 4){
		move(0,3);
		move(1,0);
		move(2,0);
		move(3,0);
		setTimeout(function(){
			$('.ul').append(str);
		},moveTime*1000)
	}
	else if( num == 5){
		move(0,2);
		move(1,0);
		move(2,0);
		move(3,0);
		move(4,0);
		setTimeout(function(){
			$('.ul').append(str);
		},moveTime*1000)
	}
	else if( num == 6){
		move(0,1);
		move(1,0);
		move(2,0);
		move(3,0);
		move(4,0);
		move(5,0);
		setTimeout(function(){
			$('.ul').append(str);
		},moveTime*1000)
	}
	else if( num == 7){
		move(0,0);
		move(1,0);
		move(2,0);
		move(3,0);
		move(4,0);
		move(5,0);
		move(6,0);
		setTimeout(function(){
			$('.ul').append(str);
		},moveTime*1000)
	}
	else if( num == 8){
		move(0,-1.3);
		move(1,0);
		move(2,0);
		move(3,0);
		move(4,0);
		move(5,0);
		move(6,0);
		move(7,0);
		setTimeout(function(){
			$('.ul').append(str);
			$('.ul li').eq(0).remove();
		},moveTime*1000)
	}
}




function move(index,i){
	$('.ul li').eq(index).css({
			'transition':'all 0.6s',
			'marginLeft': i*201+'px'
		});
}

function leftCircle(one,two,three){
	console.log(one)
	console.log(two)
	console.log(three)
	$('#indicatorContainer1').empty()
	$('#indicatorContainer1').radialIndicator({
	        barColor: '#3accf1',
	        radius:37,
	        barWidth: 4,
	        initValue: one,
	        roundCorner : true,
	        minValue: 0,
	    		maxValue: 100,
	    		displayNumber: false,
	    		barBgColor: '#535559'
});
$('#indicatorContainer2').empty()
$('#indicatorContainer2').radialIndicator({
	        barColor: '#3accf1',
	        radius:37,
	        barWidth: 4,
	        initValue: two,
	        roundCorner : true,
	        minValue: 0,
	    		maxValue: 100,
	    		displayNumber: false,
	    		barBgColor: '#535559'
});
$('#indicatorContainer3').empty()
$('#indicatorContainer3').radialIndicator({
	        barColor: '#3accf1',
	        radius:37,
	        barWidth: 4,
	        initValue: three,
	        roundCorner : true,
	        minValue: 0,
	    		maxValue: 100,
	    		displayNumber: false,
	    		barBgColor: '#535559'
});
}

function rightCircle(four,five,six){
	console.log(four)
	console.log(five)
	console.log(six)
	$('#indicatorContainer4').empty()
	$('#indicatorContainer4').radialIndicator({
	        barColor: '#3accf1',
	        radius:37,
	        barWidth: 4,
	        initValue: four,
	        roundCorner : true,
	        minValue: 0,
	    		maxValue: 100,
	    		displayNumber: false,
	    		barBgColor: '#535559'
});
$('#indicatorContainer5').empty()
$('#indicatorContainer5').radialIndicator({
	        barColor: '#3accf1',
	        radius:37,
	        barWidth: 4,
	        initValue: five,
	        roundCorner : true,
	        minValue: 0,
	    		maxValue: 100,
	    		displayNumber: false,
	    		barBgColor: '#535559'
});
$('#indicatorContainer6').empty()
$('#indicatorContainer6').radialIndicator({
	        barColor: '#3accf1',
	        radius:37,
	        barWidth: 4,
	        initValue: six,
	        roundCorner : true,
	        minValue: 0,
	    		maxValue: 100,
	    		displayNumber: false,
	    		barBgColor: '#535559'
});
}

