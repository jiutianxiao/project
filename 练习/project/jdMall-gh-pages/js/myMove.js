function myMove(){
    var oBox=document.getElementById('guessyou_content'),
        oBoxMove=oBox.getElementsByTagName('i')[0];
    var _this=oBoxMove;
    oBox.onmouseenter=function(){
        _this.className='moveImg';
        var timer=window.setTimeout(function(){
            _this.style.webkitTransform='translateX(0)';
            _this.className='';
            window.clearTimeout(timer);
        },800)
    }
}
myMove();
