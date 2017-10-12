
/**
 * created by liujianwen on 2017.04.26
 * 首页加载图标函数
 */


function getCanvasData(){
	/**
	 * [DATALIST1  住客]
	 * [DATALIST2  陌生人]
	 * [DATALIST3  黑名单	]
	 * @type {Array}
	 */

	var DATALIST1=[];
	var DATALIST2=[];
	var DATALIST3=[];
	console.log(userkey);

	//	X轴显示的日期
		var timeLine = new Array(30);
		var oneday=86400000;
		// for (var i = 0; i < 30; i++) {
		// 	timeLine[i]=timeStampConversion(today-oneday*i).slice(5);
		// }
		// var timeLine = new Array(30);
	// 此处get请求到的数据，填充
	$.ajax({
			type:"get",
			data:{
				userkey:userkey,
				dayBefore:30
			},
			datatype:'jsonp',
			jsonp:'callback',
			url:HOST+"lowRentHouse/lowRentHouse/getDaysBeforDayStatistics",
			async:true,
			success:function(res){
				console.log(res.results.dayStatisticsDto.dayStatistics);
				// res.results.dayStatisticsDto.dayStatistics.reverse();
				var box=res.results.dayStatisticsDto.dayStatistics;
				box.reverse();
				console.log(box)

				for(var j=0;j<=30;j++){
					timeLine[j]=timeStampConversion(today-oneday*j).slice(5);
					DATALIST1[j]=0;
					DATALIST2[j]=0;
					DATALIST3[j]=0;
					for (var k = 0; k < box.length; k++) {
						// console.log('box'+box[k].date);
						//声明一个存储日期值的变量
						var lbox=box[k].date.slice(5);
						lbox=lbox.split('-');
						// console.log(lbox);
						for (var i = 0; i < lbox.length; i++) {
							lbox[i]=Number(lbox[i]);
							// console.log(lbox[i]);
						}
						//适应长度，去掉0
						lbox=lbox.join('-');
						if (timeLine[j]==lbox) {
							// console.log('第'+j+'个元素');

							// console.log(box[k].content.renter);
							DATALIST1[j]=box[k].content.renter  =='undefined' ? 0 : box[k].content.renter;
							DATALIST2[j]=box[k].content.stranger  =='undefined' ? 0 : box[k].content.stranger;
							DATALIST3[j]=box[k].content.blackList  =='undefined' ? 0 : box[k].content.blackList;
							// DATALIST1[j]==typeof(box[k].content.renter) =='undefined' ? 0 : box[k].content.renter;
							// DATALIST2[j]==typeof(box[k].content.renter) =='undefined' ? 0 : box[k].content.renter;
							// DATALIST3[j]==typeof(box[k].content.renter) =='undefined' ? 0 : box[k].content.renter;
						}
					}
				}
				//获取到的时间是从最近往前，倒序
				DATALIST1.reverse();
				DATALIST2.reverse();
				DATALIST3.reverse();
				timeLine.reverse();
				console.log(timeLine)
				var DATALIST=[DATALIST1,DATALIST2,DATALIST3];
				drawCanvas(timeLine,DATALIST)

			}
		});

		function drawCanvas(xContent,DATALIST){
			//配置文件
			var config = {
				type: 'line',
				data: {
					//TODO 添加的数组不生效，直接写有效。wrnm
					//脑壳儿疼
					labels: timeLine,//x轴显示的数据
					datasets: [ {
						label: "住客",
						borderColor: "rgba(91,192,160,1)",
						backgroundColor: "rgba(91,192,160,0.2)",
						pointRadius: 3,
						pointHoverRadius: 10,
		     				data:DATALIST[0]
					}, {
						label: "陌生人",
						borderColor: "rgba(80,122,200,1)",
						backgroundColor: "rgba(116,143,198,0.7)",
						pointRadius: 3,
						pointHoverRadius: 10,
		     				data:DATALIST[1]
					},{
						label: "黑名单",
						borderColor:"rgba(220,125,121,1)",
						pointRadius: 3,//数据点显示radius
						pointHoverRadius: 10,
						// fillColor:'rgba(0,0,0,1)',
						// fill:false,//是否填充
						backgroundColor: "rgba(220,125,121,0.9)",
		     				data:DATALIST[2]
					}]
				},
				options: {
					responsive: false,//自动响应布局
					title:{
						display:true,//表头
						text:"出入人次统计分析(人次)",
						position:'top'
						// x:500
					},
					tooltips: {
						mode: 'index',
					},
					hover: {
						mode: 'index'
					},
					scales: {
						xAxes: [{
							scaleLabel: {
								display: false,//x轴文本是否显示
								labelString: '日期'
							},
							gridLines: false//图表内部横轴不显示
							// showGridLines：false
							
						}],
						yAxes: [{
							stacked: false,//是否堆叠（生成的图形面积，是：堆？否：叠）
							scaleLabel: {
								display: true,//y轴说明文本
								labelString: '人次'
							}
						}],
						showLines:false
					},
					 scaleShowGridLines : false
				}
			};

			var ctx = document.getElementById("dataCvs1").getContext("2d");
			window.myLine = new Chart(ctx, config);
				
		}


	

	


}