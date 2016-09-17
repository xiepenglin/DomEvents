function getByClass(clsName, parent){
  var oParent = parent ? document.getElementById(parent):document,
      eles = [],
      elements = oParent.getElementsByTagName('*');
  for(var i= 0;i<elements.length;i++){
    if(elements[i].className === clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}

window.onload = drag;

function stopPropagation(e){
  e = e || window.event;
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}

function drag(){
  var oTitle = getByClass('login_logo_webqq', 'loginPanel')[0];
  //拖拽
  oTitle.onmousedown = fnDown;

  //关闭
  var oClose = document.getElementById('ui_boxyClose');
  oClose.onclick = function(){
    document.getElementById('loginPanel').style.display = 'none';
  }

  //切换状态
  var loginState = document.getElementById('loginState'),
      stateList = document.getElementById('loginStatePanel'),
      lis = stateList.getElementsByTagName('li'),
      loginStateShow = document.getElementById('loginStateShow'),
      stateTxt = document.getElementById('login2qq_state_txt');

  loginState.onclick = function(e){
    stopPropagation(e);
    stateList.style.display = 'block';
  }

  document.onclick = function(){
    stateList.style.display = 'none';
  }

  //鼠标滑过、离开和点击状态列表
  for (var i = 0; i < lis.length; i++) {
    lis[i].onmouseover = function(){
      this.style.background = '#567';
    }
    lis[i].onmouseout = function(){
      this.style.background = '#fff';
    }
    lis[i].onclick = function(e){
      stopPropagation(e);
      var id = this.id;
      stateList.style.display = 'none';
      stateTxt.innerHTML = getByClass('stateSelect_text', id)[0].innerHTML;
      loginStateShow.className = '',
      loginStateShow.className = 'login-state-show '+id;
    }
  }

}

function fnDown(event){
  event = event || window.event;
  var oDrag = document.getElementById('loginPanel'),
      // 光标按下时光标和面板之间的距离
      disX = event.clientX - oDrag.offsetLeft,
      disY = event.clientY - oDrag.offsetTop;

  //移动
  document.onmousemove = function(event){
      event = event || window.event;
      fnMove(event, disX, disY);
  };

  //释放鼠标
  document.onmouseup = function(){
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

function fnMove(e, posX, posY){
  var oDrag = document.getElementById('loginPanel'),
      left = e.clientX - posX,
      top = e.clientY - posY,
      winW = document.documentElement.clientWidth || document.body.clientWidth,
      winH = document.documentElement.clientHeight || document.body.clientHeight,
      maxW = winW - oDrag.offsetWidth - 10,    //红叉的宽度为10px
      maxH = winH - oDrag.offsetHeight;
      if(left < 0){
        left = 0;
      }else if(left > maxW){
        left = maxW;
      }
      if(top < 0){
        top = 10;      //红叉的高度为10px
      }else if(top > maxH){
        top = maxH;
      }
      oDrag.style.left = left +'px';
      oDrag.style.top = top +'px';
}