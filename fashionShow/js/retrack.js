var str = '';
		
var data = {
			    "msg": "SUCC",
			    "code": 0,
			    "succ_code": 0,
			    "time": 1496224294478,
			    "results": {
			        "array": [
			            {
			                "img": "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
			                "sceneImg": "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
			                "createTime": "2017-05-31 14:54:46"
			            },
			            {
			                "img": "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
			                "sceneImg": "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
			                "createTime": "2017-05-31 14:54:46"
			            },
			            {
			                "img": "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
			                "sceneImg": "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
			                "createTime": "2017-05-31 14:54:46"
			            },
			            {
			                "img": "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
			                "sceneImg": "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
			                "createTime": "2017-05-31 14:54:46"
			            },
			            {
			                "img": "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
			                "sceneImg": "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
			                "createTime": "2017-05-31 14:54:46"
			            },
			            {
			                "img": "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
			                "sceneImg": "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
			                "createTime": "2017-05-31 14:54:46"
			            },
			            {
			                "img": "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
			                "sceneImg": "http://101.201.76.201:3000/img/getsingleimg?type=2&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=e6c1a4f3-e542-4b31-97bd-4944e7da8602&fn=bg",
			                "createTime": "2017-05-31 14:54:46"
			            }
			        ],
			        "personImgUrl": "http://101.201.76.201:3000/img/getsingleimg?type=1&appid=982d6ebc_7f6e_4062_a004_7dcab59ea514&id=7141f17a-812a-4327-a822-caa0ce9677e8&fn=upload_fade3635-3613-41d1-b6b1-1c445fe367d6.jpg",
			        "personId": "123654132343131",
					"method": "getReverseResult",
			        "pageInfo": {
			            "dataList": [],
			            "firstPageNo": 1,
			            "lastPageNo": 2,
			            "limit": 4,
			            "nextPageNo": 2,
			            "offset": 0,
			            "pageCount": 0,
			            "pageNo": 1,
			            "pageNumList": [
			                1,
			                2
			            ],
			            "prePageNo": 1,
			            "totalRecord": 5
			        }
			    }
			}

$('body').click(function(){
	getData(data)
})

var timer = null;
var move = 1;
function getData(data){
	if(data != null && data.code == data.succ_code){
		var results = data.results;
		console.log(data);
		if(results != null && results != '' && results.array != null && results.array != ''){
			var personImgUrl = results.personImgUrl;
			var personId = results.personId;
			var array = results.array;
			$('.top .img').append('<img src="'+ personImgUrl +'"/>');			
			$('.top .img span').html(personId);			
			if(array.length <= 4){
				add(array);
			}
			else{
				var leng = array.length;
				$('.main .ul').width((leng+1) * 460);
				add(array);
				var cloneNode = $('.main .ul li').eq(0).clone(true);
				$('.main .ul').append(cloneNode);
				setTimeout(function(){
					timer = setInterval(function(){
						var width = $('.main .ul').width();
						if(move == Math.ceil((leng-4)*460/50)){
							move = 1;
						}
						$('.main .ul').css('left',-move*50+"px");
						move++;
					},0.1*1000);
				},1*1000);
			}
		}
	}
	
}


function add(array){
	for(var i = 0;i < array.length;i++){
		var arr = array[i];
		var gifImg = arr.img;
		var sceneImg = arr.sceneImg;
		var time = arr.createTime;
		str = '<li>'
			+ '<div class="active">'
			+ '<img src="'+ gifImg +'"/>'
			+ '</div>'
			+ '<div class="sencePic">'
			+ '<img src="'+ sceneImg +'"/>'
			+ '</div>'
			+ '<div class="time">'+ time +'</div>'
			+ '</li>';
		$('.main .ul').append(str);
	}
}
