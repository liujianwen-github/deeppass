//清除人物信息
function clearShowInfo(){
	$('.main_l').html("");
}
//弹窗
const shibie = document.getElementById('shibie');
const yanzheng = document.getElementById('yanzheng');
const no = document.getElementById('no');
shibie.onclick = function(){
	yanzheng.style.display = "block";
};
yes.onclick = function(){
    alert('111');
	yanzheng.style.display = "none";
};
no.onclick = function(){
	yanzheng.style.display = "none";
};

let frequency=-200;//定义一个变量，用来控制slidecontent向上偏移的长度
let swt='';// 声明一个控制开关
function doscroll() {
    const parent=$('.slidebox');
    const sons=$('.slideContent');

	console.log(frequency);
    if(frequency<=-200){
    	//1:开始动画,第一次平移
        frequency+=200;
        sons.animate({'margin-top':-frequency},1000);
        $('.slideContent .dlItem').eq(1).css('opacity','1');
    } else if (swt=='swt1'){
    	//3:第二次停顿
        sons.animate({'margin-top':-frequency},1000);
        $('.slideContent .dlItem').eq(2).css('opacity','1');
        swt='swt2';
    } else if (swt=='swt2'){
        //4:然后开始正常动画
        $('.slideContent .dlItem').css('opacity','1');
        frequency+=200;
        sons.animate({'margin-top':-frequency},1000,function(){
            if(frequency/200>$('.slideContent .dlItem').length){
                clearInterval(timer);
//			根据结果判断：如果子元素个数小于滚动次数,计时器停止
            }
        });

    }else if (frequency<=0){
        console.log('if=2');
        //2:开始第一次停顿
        swt='swt1';
    }

}
const timer=self.setInterval(doscroll,1000);




