/*activeList*/
function activeList() {

    var oBox = document.getElementById('activeList');
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    oUl.innerHTML += oUl.innerHTML;
    oUl.style.height = aLi[0].offsetHeight * aLi.length + 'px';
    var curTop = oUl.offsetTop;
    var timer = setInterval(function () {
        curTop -= 1;
        if (curTop <= -oUl.offsetHeight / 2) {
            curTop = 0;
        }
        oUl.style.top = curTop + 'px';
    }, 100)
}
activeList();
