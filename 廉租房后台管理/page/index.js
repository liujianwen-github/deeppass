$.fn.extend({
	/**
	 * @Author   ljw
	 * @DateTime 2017-04-25
	 * @requires [jquery]
	 * @param    {[number]}      totalNum   总的页码数量
	 * @param    {[number]}      currentNum 当前页码
	 * @param    {[number]}      shownum 	显示的页码数量
	 * @return   {[type]}               	[void]
	 */
	loadContent:function(totalNum,currentNum,showNum){
		//如果当前页码没有赋值，取值1
		console.log(currentNum)
		if (currentNum==undefined) {
			currentNum=1;
		}
		// console.log(currentNum)
		if(currentNum<showNum/2){
			console.log('small')
			//当前页码<3
			for (var i=0; i < showNum; i++) {
				var childs=document.createElement('li');
				var curr=i+1;
			 //判断输出页码是否为当前页码	
				if (currentNum==curr) {
					childs.style.backgroundColor = 'lightgrey';
					childs.setAttribute('class', 'current')
					}
				childs.innerHTML=i+1;
				$(this).append(childs)
			}
		}else if(currentNum>totalNum-Math.floor(showNum/2)){
			console.log('large')
			//当前页码大于总数-2
			for (var i=0; i <=showNum; i++) {
				var childs=document.createElement('li');
				//显示的当前页码
				var curr=totalNum-showNum+i;
				//判断输出页码是否为当前页码
				if (currentNum==curr) {
					childs.style.backgroundColor = 'lightgrey'
					childs.setAttribute('class', 'current')
				}
				childs.innerHTML=curr;
				$(this).append(childs)
			}
		}else{
			// 当前页码>=3 -->Math.round(showNum/2) 中心点页码的相对位置
			for (var i=0; i < showNum; i++) {
				var childs=document.createElement('li');
				var curr=currentNum-Math.floor(showNum/2)+i;
				if (currentNum==curr) {
					childs.style.backgroundColor = 'lightgrey';
					childs.setAttribute('class', 'current')
				}
				childs.innerHTML=currentNum-Math.floor(showNum/2)+i;
				// childs.setAttribute('class', 'child'+i);
				$(this).append(childs)
			}
		}
		//点选翻页
		$(this).find('li').on('click',function(){
			console.log($(this).parent());
			var curr=Number($(this).text());
			//预先定义父元素，防止remove后找不到
			var father=$(this).parent();
			father.find('li').remove();
			father.loadContent(totalNum,curr,showNum)

		})
 
	}
	
});

/**
	 * @Author   ljw
	 * @DateTime 2017-04-26
	 * @description [翻页]
	 * @requires [jquery]
	 * @param    {[string]}      buttonType       [向前/向后翻页]
	 * @param    {[object]}      pageList 	[页码容器所在的ul]
	 * @param    {[Number]}		 totalNum	[页码总数]
	 * @return   {[type]}                 [void]
	 */
	function flip(next,pageList){
		var currentPage;
		pageList.find('li').each(function(index, el) {
			// console.log($(this).attr('class'))
			if($(this).attr('class')=='current'){
				currentPage=Number($(this).text());
				console.log('curr:'+currentPage)
				// return
			}
		});
		if (currentPage<=1&&next==false) {
			//当前为第一页，并且继续向前翻页
			alert('当前为第一页');
			return
		}else if(currentPage>=totalNum&&next==true){
			//当前为最后一页，并且继续向后翻页
			alert('当前为最后一页');
			return
		}
		pageList.find('li').remove();//清空子元素，重新填充
		console.log(typeof currentPage)
		if (next==false) {
			pageList.loadContent(totalNum,currentPage-1,showNum)
		}else if (next==true){
			pageList.loadContent(totalNum,currentPage+1,showNum)
		}else{
			console.log('参数错误')
		}
	}