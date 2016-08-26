/**
 * Created by Thinkpad on 2016/8/25.
 */
var tab = function () {
    var nav = document.getElementById("nav"),
        navTop = nav.getElementsByClassName("navSec-top")[0],
        navCon = nav.getElementsByClassName("navSec-con")[0].getElementsByTagName("ul")[0],
        conLis = navCon.getElementsByTagName("li"),
        navSec = document.getElementById("navSec");

    var timer = null,
        t = new Date().getTime() - 10000;
    navTop.onmouseover = function (ev) {
        ev = ev || window.event;
        var tar = ev.target,
            tarText = tar.innerText;
        window.clearInterval(timer)
        var evTop = null, pave, next, ary;
        if (tarText === "我想...") {
            if (new Date().getTime() - t >1500) {
                console.log(t)
                t = new Date().getTime()
                evH = conLis[0].clientHeight;
                next = utils.nextAll(conLis[0]);
                next.push(navSec);
                a(next, null, evH)
            }
        } else if (tarText === "行业洞察") {
            if (new Date().getTime() - t > 1500) {
                t=new Date().getTime()
                evH = conLis[1].clientHeight;
                if (utils.getCss(conLis[1], "top") != 0) {
                    a.call(conLis[1], conLis[1], null, 0)
                }

                a.call(navSec, navSec, null, evH)
            }
        }

    };
    navTop.onmouseout = function (ev) {

        ev = ev || window.event;
        var tar = ev.target,
            tarText = tar.innerText;

        var next = null;
        if (tarText === "我想...") {
            window.clearInterval(timer)
            next = utils.nextAll(conLis[0]);
            next.push(navSec)
            //utils.setCss(next,"top",-4)
            a(next, null, 0)
            //a(next, null, 0)
        } else if (tarText === "行业洞察") {
            window.clearInterval(timer)
            a(navSec, null, -4)
            //utils.setCss(navSec, "top", 0)
        }

    };


    function a(ele, distance, end) {
        distance = distance || ((ele instanceof Array ) ? utils.getCss(ele[0], "top") : utils.getCss(ele, "top"));
        var change = end - distance,
            n = 1000 / (600 / Math.abs(change)) / 15,
            changs = change / n,
            flag = end - distance;
        timer = setInterval(function () {

            if ((n <= 0  )) {
                if (ele instanceof Array) {
                    for (var key in ele) {
                        if (key == ele.length - 1) {
                            utils.setCss(ele[key], "top", end - 4);
                        } else {
                            utils.setCss(ele[key], "top", end);
                        }

                    }
                } else {

                    utils.setCss(ele, "top", end);
                }
                this.clearInterval(timer);
                return;
            } else {
                n--;
            }

            distance += changs;
            b(distance)
        }, 15)

        function b(distance) {
            if (ele instanceof Array) {
                for (var key in ele) {
                    utils.setCss(ele[key], "top", distance);
                }
            } else {

                utils.setCss(ele, "top", distance);
            }
        }
    }
}
tab();