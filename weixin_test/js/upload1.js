/*
 * created by admin 2017/03/01 15:52
 */
$(function () {
	if(navigator.userAgent.match(/Android/g)){
//		if(navigator.userAgent.match(/iPhone/g)){
		alert('this useragent is Android')
		$('input[type=file]').on('change',function () {
       var imgbox=new Array();//创建一个存储图片路径的数组

       $('#iosDialog2').css('display','block');
//     console.log('upload1 is ready');


       //获取上传的文件

       var file=this.files[0];
       var reader=new FileReader();
       reader.readAsDataURL(file);
       reader.onload=function (e) {
           var data=e.target.result;//获取到视频文件的base64地址

           var video=document.createElement('video');
           var videobox=document.getElementById('videoBox');
           video.src=data;//创建页面元素video
//         video.setAttribute('id','videoIntercept');
           video.style.maxWidth='400px';//设置最大宽高
           video.style.maxHeight='400px';
           video.style.border='1px dashed red';
           video.autoplay=true;//自动循环播放
           videobox.appendChild(video);
           
//			$('.containers').append(video)
//         console.log(videobox)
           var searchElement=self.setInterval(searchVideo(),500);
           //截取图片
           function searchVideo() {
               if (videobox.innerHTML!=" "){
                   //子元素不为空则表示添加成功
//                 var currentVideo=videobox.firstElementChild || videobox.firstChild;
				   var currentVideo=videobox.getElementsByTagName('video');
                   //                      console.log(currentVideo.duration+'s');//获取视频总时长的秒数
                   var totalImg;
                   //	
//                 console.log(currentVideo)

//                 console.log(Number(currentVideo.duration))
//                     if(isNaN(Number(currentVideo.duration))==false){
//                         console.log('视频时长为'+currentVideo.duration)
//                             totalImg=Math.ceil(Number(currentVideo.duration)/0.2);
//                             //设置截取图片的总数量
//
//                     }else{
//                         console.log('您的浏览器不支持duration,图片截取数量更改为固定数值')
//                         totalImg=Math.ceil(Number(5/0.2));
//                     }
                   totalImg=20;
                   clearInterval(searchElement);
//                 				console.log($("#videoBox video").get(0)+video);
                   var imgNum=0;//统计已经截取的图片数量
                   var video = $("#videoBox video").get(0);//获取文件
//					var video=document.getElementById('videoIntercept');
//                 console.log(videofile)
                   var startImg=self.setInterval(function () {
                       if (imgNum<totalImg){
//                     		var video=document.getElementById('videoIntercept')
                           var canvas = document.createElement("canvas");
                           canvas.width = video.clientWidth;//设置生成图片的宽高
                           canvas.height = video.clientHeight;
                           canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
//                         console.log(canvas);
                           var img = new Image();//创建一个图片对象

//                         image.src=canvas.toDataURL("image/jpg");
                           img.src = canvas.toDataURL('image/png', 0.5);//添加图片路径,压缩比例0.8                 
//
                           if(imgNum>1 && imgbox[imgNum-1]==img.src){
//							    当后一张图片与前一张图片地址一样，判定视频播放完毕，停止截图
								uploadgogo(imgbox);
                                clearInterval(startImg);
                           }
                           imgbox[imgNum]=img.src;
                           console.log(imgNum);//这行不要去掉
                           // document.getElementById('output').appendChild(image);
                           /////////////////////添加数组/////////////////////////////
                           imgNum++;
                       }else {
                           clearInterval(startImg);//停止计时器
                           uploadgogo(imgbox);
//			               document.getElementById('videoBox').innerHTML='';//清空videobox
                           console.log('stop');//停止程序
                       }

                   },0.2*1000);//setinterval
               }else{
                   // return
               }
           } //searchvideo 函数结束
           console.log(imgbox);

           //上传保存base64编码的数组

          function uploadgogo(imgbox){
          	var imgs={
          		"imgs":imgbox
          	}
          	alert('累计获取照片数量：'+imgs.imgs.length)
          	 $.ajax({
              	type: "post",
				url: "/faceserver/servlet/UploadHandleServlet?Method=imgs",
				async: true,
				data: {
					"userId": getCookie('userId'),
					"imgs": JSON.stringify(imgs)
				},
               complete:function (e) {
           		   var rxp=/^0?2\d{2}$/;
           		   if(rxp.test(e.status)==true){
           		   		$('.weui-dialog__bd span').removeClass('fa-spinner');
	                    $('.weui-dialog__bd span').removeClass('fa-spin');
	                    $('.weui-dialog__bd span').addClass('fa-check-circle');
	                    $('.weui-dialog__bd span').css('color','springgreen');
	//					console.log( 'this is span for '+$('.weui-dialog_bd span'))
	                    $('.weui-dialog__bd p').html('上传成功，1 s后返回主页');
	                   	setTimeout(function(){
	                     window.location.href = 'index.html';
	                   },1000)
           		   }    
               },
               error:function(error){
//                 $('#iosDialog2').css('display','none');
                   console.log(typeof error.status);
                   $('.weui-dialog__bd span').css('color','white');
                    $('.weui-dialog__bd p').html('上传失败，错误代码：'+error.status);
                     $('.weui-dialog__bd p').css('color','gray')
               }

           });
          }
       }; //reader.onload 函数结束

   }); //eventlistener绑定的事件函数结束
		
		
	}
//console.log(navigator.userAgent.match(/iPhone/g))
   
});