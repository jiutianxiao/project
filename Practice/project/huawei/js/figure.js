/**
 * Created by Thinkpad on 2016/8/24.
 */
var fn = function (ID) {
    var winH = ID.clientWidth;
    window.onresize = function () {
        winH = ID.clientWidth;
    };
    var n = 0
    var oUl = ID.getElementsByTagName("ul")[0],
        botLeft = ID.getElementsByClassName("btn-left")[0],
        botRight = ID.getElementsByClassName("btn-Right")[0];
    var time;
    ID.onmouseenter = function () {
        window.clearInterval(time);
    }
    ID.onmouseleave = function () {
    }
    ID.onclick = function (ev) {
        ev = ev || window.event;
        var tar = ev.target,
            tarName = tar.className;
        if (tarName === "btn-left") {
            if (n > 0) {
                n--;
                a(oUl, winH, 500);
            }
        } else if (tarName === "btn-right") {
            if (n < 2) {
                n++
                a(oUl, -winH, 500);
            }

        }
    };
    time = setInterval(function () {
        n++;
        if (n >= 3) {
            n = 0;
            utils.setCss(oUl, "left", 0)
        }
        a(oUl, -winH, 500);
    }, 3000);

    function a(ele, distance, tim) {
        var change = distance / tim * 14,
            interval = distance / change,
            changes = utils.getCss(ele, "left");
        var anm = setInterval(function () {
            changes += change
            if (interval <= 0) {
                window.clearInterval(anm);
                return
            }
            utils.setCss(ele, "left", changes)
            interval--;
        }, 14);
    }
    window.time=time;
};
