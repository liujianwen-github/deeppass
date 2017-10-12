
var data = {
			    "msg": "SUCC",
			    "code": 0,
			    "succ_code": 0,
			    "method": "123",
			    "time": 1495179545185,
				"results": {
					"personId":"qweqw",
					"personImgUrl":"http://a0.att.hudong.com/42/66/01200000030574136881661233928.jpg",
			        "array": [
					            {
					                "score": 0.8,
					                "img": "http://a0.att.hudong.com/42/66/01200000030574136881661233928.jpg",
					                "percent": 0.98,
					                "id_facetrack": "73573a5"
					            },
					            {
					                "score": 0.79,
					                "img": "http://a0.att.hudong.com/42/66/01200000030574136881661233928.jpg",
					                "percent": 0.98,
					                "id_facetrack": "b926800"
					            }
					        ]
			    		}
			}


$(function(){
	$('body').click(function(){
		getData(data);
	})
})



function getData(data){
	if(data != null && data.code == data.succ_code){
		var results = data.results;
		console.log(data);
		if(results != null && results != '' && results.array != null && results.array != ''){
			var 	personId = results.	personId;
			var personImg = results.	personImgUrl;
			var array = results.array;
			$('.top .img li').append('<img src="'+ personImg +'"/>');
			var str = '';
			for(var i = 0;i < array.length;i++){
				var per = array[i];
				var perImg = per.img;
				str = '<li>'
					+ '<img src="'+ perImg +'"/>'
					+ '</li>';
				$('.cont .img').append(str);
			}
		}
	}
	
}
