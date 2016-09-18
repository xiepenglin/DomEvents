var data=['iphone7', 'ipad', '三星笔记本','佳能相机', '惠普打印机', '谢谢参与', '1000元现金', '200元充值卡'];
var timer = null;
var flag = 0;

window.onload = function(){
	var	play = document.getElementById('play'),
		stop = document.getElementById('stop');

	//开始抽奖
	play.onclick = fnPlay;

	//停止抽奖
	stop.onclick = fnStop;

	//键盘事件
	document.onkeyup = function(event){
		event = event || window.event;
		if(event.keyCode == 13) {  //按下回车
			if(flag == 0){
				fnPlay();
			}else{
				fnStop();
			}
		}
	}
}

function fnPlay(){
	flag = 1;
	var title = document.getElementById('title');
	clearInterval(timer);
	timer = setInterval(function(){
		var random = Math.floor(Math.random()*data.length);
		title.innerHTML = data[random];
	}, 50);
	var play = document.getElementById('play');
	play.style.background = '#999';
}

function fnStop(){
	flag = 0;
	clearInterval(timer);
	var play = document.getElementById('play');
	play.style.background='#036';
}