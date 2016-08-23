
    function bannerHands(){
        var oBanner=document.getElementById('lazy_banner');
        var oImgWrap=oBanner.getElementsByTagName('div')[0];
        var aDiv=oImgWrap.getElementsByTagName('div');
        var oBtnLeft=oBanner.getElementsByTagName('a')[0];
        var oBtnRight=oBanner.getElementsByTagName('a')[1];
        var step=0;
        oImgWrap.innerHTML+='<div><img src="img/57634f9bN112c0fa0.jpg" alt=""/><p class="linear"></p><img src="img/57634f9bN112c0fa0.jpg" alt=""/><p class="linear"></p><img src="img/57634f9bN112c0fa0.jpg" alt=""/><p class="linear"></p><img src="img/57634f9bN112c0fa0.jpg" alt=""/></div>'
        oImgWrap.style.width=aDiv.length*aDiv[0].offsetWidth+'px';
        oBtnRight.onclick=function(){
            if(step>=aDiv.length-1){
                step=0;
                utils.css(oImgWrap,'left',-step*1000)
            }
            step++;
            zhufengAnimate(oImgWrap,{'left':-step*1000},500)
        }
        oBanner.onmousemove=function(){
            utils.css(oBtnLeft,'display','block');
            utils.css(oBtnRight,'display','block');
        }
        oBanner.onmouseout=function(){
            utils.css(oBtnLeft,"display",'none');
            utils.css(oBtnRight,"display",'none');
        }
        oBtnLeft.onclick=function(){
            if(step<=0){
                step=aDiv.length-1;
                utils.css(oImgWrap,'left',-step*1000)
            }
            step--;
            zhufengAnimate(oImgWrap,{'left':-step*1000},500);
        }
    }
    bannerHands();

   function bannerMain(){
       var oBanner=document.getElementById('main_slider');
       var oImgWrap=oBanner.getElementsByTagName('div')[0];
       var aDiv=oImgWrap.getElementsByTagName('div');
       var aImg=oImgWrap.getElementsByTagName('img');
       var oUl=oBanner.getElementsByTagName('ul')[0];
       var aLi=oUl.getElementsByTagName('li');
       var oBtnLeft=oBanner.getElementsByTagName('a')[0];
       var oBtnRight=oBanner.getElementsByTagName('a')[1];
       var autoTimer=null;
       var interval=2000;
       var step=0;
       oImgWrap.innerHTML+='<div><img src="img/576fe7adNcc344544.jpg" alt=""/></div>';
       oImgWrap.style.width=aDiv.length*aDiv[0].offsetWidth+'px';
       //图片自动轮播
       clearInterval(autoTimer);
       autoTimer=setInterval(autoMove,interval);
       function autoMove(){
           if(step>=aDiv.length-1){
               step=0;
               utils.css(oImgWrap,'left',-step*439)
           }
           step++;
           zhufengAnimate(oImgWrap,{'left':-step*439},500);
           bannerTip();
       }
       //2.焦点随图片自动轮播
       function bannerTip(){
           var tmpStep=step>=aLi.length?0:step;
           for(var i=0; i<aLi.length; i++){
               var curLi=aLi[i];
               i===tmpStep?utils.addClass(curLi,'bg'):utils.removeClass(curLi,'bg');
           }
       }
       //3.鼠标移入停止播放，移出继续播放
       oBanner.onmouseover=function(){
           clearInterval(autoTimer);
           utils.css(oBtnLeft,'display','block');
           utils.css(oBtnRight,'display','block');
       };
       oBanner.onmouseout=function(){
           autoTimer=setInterval(autoMove,interval);
           utils.css(oBtnLeft,'display','none');
           utils.css(oBtnRight,'display','none');
       };
       //4.点击焦点实现手动图片切换
       handleChange();
       function handleChange(){
           for(var i=0; i<aLi.length; i++){
               var curLi=aLi[i];
               curLi.index=i;
               curLi.onclick=function(){
                   step=this.index;
                   zhufengAnimate(oImgWrap,{'left':-step*439},500);
                   bannerTip();
               }
           }
       }
       //5.点击左右按钮实现左右切换
       oBtnRight.onclick=autoMove;
       oBtnLeft.onclick=function(){
           if(step<=0){
               step=aDiv.length-1;
               utils.css(oImgWrap,'left',-step*439)
           }
           step--;
           zhufengAnimate(oImgWrap,{'left':-step*439},500);
           bannerTip();
       }
   }
    bannerMain();