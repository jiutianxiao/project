var oBox = document.getElementById("box"),
    oMark = document.getElementById("mark");
var boxRight = document.getElementById("boxRight"),
    bigImg = boxRight.getElementsByTagName("img")[0];

var computedMarkPos = function (ev) {
    if (!ev) {
        ev = window.event;
        console.log(ev)
        ev.pageX = ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        ev.pageY = ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
    }

    var left = ev.pageX - oBox.offsetLeft - (oMark.offsetWidth / 2) - oBox.clientLeft;
    var top = ev.pageY - oBox.offsetTop - (oMark.offsetHeight / 2) - oBox.clientTop;

    //->边界判断
    var minL = 0,
        minT = 0,
        maxL = oBox.clientWidth - oMark.offsetWidth,
        maxT = oBox.clientHeight - oMark.offsetHeight;
    left = left < minL ? minL : (left > maxL ? maxL : left);
    top = top < minT ? minT : (top > maxT ? maxT : top);

    oMark.style.left = left + "px";
    oMark.style.top = top + "px";

    //->让右侧的图片按照三倍的距离进行移动即可
    bigImg.style.left = -left * 3 + "px";
    bigImg.style.top = -top * 3 + "px";
};
oBox.onmouseenter = function (ev) {
    console.log(11111)
    oMark.style.display = "block";
    boxRight.style.display = "block";
    computedMarkPos(ev);
};
oBox.onmousemove = computedMarkPos;
oBox.onmouseleave = function (ev) {
    oMark.style.display = "none";
    boxRight.style.display = "none";
};