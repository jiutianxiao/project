//格式化时间
~function (pro) {
    pro.myFormatTime = myFormatTime;
    function myFormatTime(template) {
        var res = null,
            ary = this.match(/\d+/g);
        template = template || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
        res = template.replace(/\{(\d+)\}/g, function () {
            var val = ary[arguments[1]];
            !val ? val = "00" : null;
            val.length < 2 ? val = "0" + val : null;
            return val;
        });
        return res;
    }
}(String.prototype);

var columnId = 100000;

//->局部滚动(ISCROLL)
var $navScroll = new IScroll("#nav", {
    scrollbars: true,
    mouseWheel: true,
    bounce: false
});
var $hotScroll = new IScroll("#hot", {
    scrollbars: true,
    mouseWheel: true,
    bounce: false
});
var $matchScroll = new IScroll("#matchList", {
    scrollbars: true,
    mouseWheel: true,
    bounce: false
});

//->头部导航下载区域的展开和收起
$(function () {
    $(".header .downLoad").on("mouseover", function () {
        $(this).children(".code,.iframeBg").css({
            height: 179
        });
    }).on("mouseout", function () {
        $(this).children(".code,.iframeBg").css({
            height: 0
        });
    });
});

//->JS控制SECTION区域的高度
$(function () {
    change();
    function change() {
        var $section = $(".section");
        var curH = $(window).outerHeight() - $(".header").outerHeight() - parseFloat($section.css("marginTop")) - parseFloat($section.css("marginBottom"));
        $section.css({
            height: curH
        });
        $section.find(".matchList").css({
            height: curH - 100
        });
        $navScroll.refresh();
        $hotScroll.refresh();
        $matchScroll.refresh();
        $(".iScrollVerticalScrollbar").css({
            opacity: 0.3
        });
    }

    $(window).on("resize", change);
});

//->绑定热门赛事区域中的内容
function bindHTML(data, title, time, type) {
    var str = '';
    if (data && data.length > 0) {
        str += '<h2><i></i>' + title + '</h2>';
        str += '<ul>';
        $.each(data, function (index, curData) {
            var mt = curData["matchType"];
            str += '<li>';
            str += '<div class="detail">';
            if (type === 1) {
                str += '<span class="d1">' + curData["matchDesc"] + '</span>';
                str += '<span class="d2">' + curData["startTime"].myFormatTime(time) + '</span>';
            } else {
                str += '<span class="d2">' + curData["startTime"].myFormatTime(time) + '</span>';
                str += '<span class="d1">' + curData["matchDesc"] + '</span>';
            }
            if (curData["rightName"]) {
                str += '<img src="' + curData["leftBadge"] + '" alt="" class="d7"/>';
                str += '<span class="d3">' + curData["leftName"] + '</span>';
                str += '<span class="d4">' + curData["leftGoal"] + '-' + curData["rightGoal"] + '</span>';
                str += '<span class="d5">' + curData["rightName"] + '</span>';
                str += '<img src="' + curData["rightBadge"] + '" alt="" class="d8"/>';
            } else {
                str += '<img src="' + curData["leftBadge"] + '" alt="" class="d7"/>';
                str += '<span class="single">' + curData["leftName"] + '</span>';
            }
            str += '<span class="d6">' + (mt == 1 ? "图文直播" : (mt == 2 ? "直播中 " : "视频回顾")) + '</span>';
            str += '</div>';

            var ad = curData["ad"];
            if (ad) {
                str += '<div class="last">';
                str += '<span class="one">' + ad["tag"] + ':</span>';
                str += '<span>' + ad["desc"] + '</span>';
                str += '</div>';
            }
            str += '</li>';
        });
        str += '</ul>';
    }
    return str;
}
$(function () {
    $.ajax({
        url: "http://matchweb.sports.qq.com/kbs/hotMatchList",
        type: "get",
        dataType: "jsonp",
        jsonpCallback: "getHotMatchList",
        success: function (jsonData) {
            var $hot = $("#hot"),
                $living = $hot.find(".living"),
                $ending = $hot.find(".ending"),
                $preing = $hot.find(".preing");
            var data = jsonData["data"];
            data["on"] && data["on"].length > 0 ? $living.html(bindHTML(data["on"], "直播中", "{1}-{2} {3}:{4}")) : $living.remove();
            data["after"] && data["after"].length > 0 ? $ending.html(bindHTML(data["after"], "已结束", "{1}-{2} {3}:{4}")) : $ending.remove();
            data["pre"] && data["pre"].length > 0 ? $preing.html(bindHTML(data["pre"], "未开始", "{1}-{2} {3}:{4}")) : $preing.remove();

            //->重新刷新
            $hotScroll.refresh();
        }
    });
});

//->绑定日期区域的数据
var $calListUL = $("#calListUL");
var maxL = 0, minL = 0;
var $calendarCallbackList = $.Callbacks();
//1)实现数据绑定
$calendarCallbackList.add(function (today, data) {
    var str = '';
    $.each(data, function (index, curData) {
        str += '<li date="' + curData["date"] + '">';
        str += '<span class="week">' + curData["weekday"] + '</span>';
        str += '<span class="time">' + curData["date"].myFormatTime("{1}-{2}") + '</span>';
        str += '</li>';
    });
    $calListUL.html(str).css("width", data.length * 110);
    minL = -(data.length - 7) * 110;
});
//2)让整个日期区域定位到当前的位置
$calendarCallbackList.add(function (today, data) {
    var $oLis = $calListUL.children("li"),
        $todayLi = $oLis.filter("[date=" + today + "]"),
        flag = true;
    if ($todayLi.length === 0) {
        //->在所有的LI中并没有今天日期这一项:我需要和每一个LI的时间进行比较,直到遇到一个比自己大的时间,我们结束查找
        $oLis.each(function (index, curLi) {
            if ($todayLi.length > 0) {
                return;
            }
            var curLiTime = $(curLi).attr("date").replace(/-/g, "/");
            var todayTime = today.replace(/-/g, "/");
            if (new Date(curLiTime) > new Date(todayTime)) {
                $todayLi = $(curLi);
            }
        });
        if ($todayLi.length === 0) {
            $todayLi = $oLis.eq($oLis.length - 1);
        }
        flag = false;
    }
    var $todayIndex = $todayLi.index(),
        $tarLeft = -($todayIndex - 3) * 110;
    $tarLeft = $tarLeft < minL ? minL : ($tarLeft > maxL ? maxL : $tarLeft);
    $calListUL.css("left", $tarLeft);
    $todayLi.addClass("bg").siblings().removeClass("bg");
    if (flag) {
        $todayLi.children("span").eq(0).html("今天");
    }
    //->展示数据
    var strIn = Math.abs($tarLeft / 110);
    var endIn = strIn + 6;
    bindMatchHTML(columnId, $oLis.eq(strIn).attr("date"), $oLis.eq(endIn).attr("date"));
});
function getCalendarList(columnId) {
    $.ajax({
        url: "http://matchweb.sports.qq.com/kbs/calendar?columnId=" + columnId,
        type: "get",
        dataType: "jsonp",
        success: function (jsonData) {
            if (jsonData && jsonData["data"]) {
                jsonData = jsonData["data"];
                var today = jsonData["today"],
                    data = jsonData["data"];

                $calendarCallbackList.fire(today, data);
            }
        }
    });
}

//->calendar区域事件委托
$(".calendar").on("click", function (ev) {
    var tar = ev.target,
        $tar = $(tar),
        tarTag = tar.tagName.toUpperCase();
    var $tarParent = $tar.parents().add($tar);

    //->左右切换按钮
    var $tarLink = $tarParent.filter("a");
    if ($tarLink.length > 0) {
        var curL = parseFloat($calListUL.css("left"));
        $tarLink.hasClass("calLeft") ? curL += 770 : curL -= 770;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        $calListUL.finish().animate({left: curL}, 300, function () {
            curL = Math.round(parseFloat($(this).css("left")) / 110) * 110;
            $(this).css("left", curL);

            //->让当前七个LI中的第一个有选中的样式
            $(this).children("li").eq(Math.abs(curL) / 110).addClass("bg").siblings().removeClass("bg");

            //->展示数据
            var strIn = Math.abs(curL / 110);
            var endIn = strIn + 6;
            var $oLis = $(this).children("li");
            bindMatchHTML(columnId, $oLis.eq(strIn).attr("date"), $oLis.eq(endIn).attr("date"));
        });
        return;
    }

    //->点击LI
    var $tarLi = $tarParent.filter("li");
    if ($tarLi.length > 0) {
        $tarLi.addClass("bg").siblings().removeClass("bg");
        //$matchScroll.scrollTo(x,y);
        //$matchScroll.scrollToElement();
        lc($tarLi);

        //bH= b.html();

        /*        console.log(oneH,twoH,thrH,frH,fivH,sixH,svnH,winH,winTop)
         console.log($num,$tarLi.attr("num"))*/
        /*switch (a) {
            case 6:
                $matchScroll.scrollTo(0, 0);
                break;
            case 0:
                $a = oneH;
                $matchScroll.scrollTo(0, -$a);
                break;
            case 1:
                $a = oneH + twoH;
                $matchScroll.scrollTo(0, -$a);
                break;
            case 2:
                $a = oneH + twoH + thrH;
                $matchScroll.scrollTo(0, -$a);
                break;
            case 3:
                $a = oneH + twoH + thrH + frH;
                $matchScroll.scrollTo(0, -$a);
                break;
            case 4:
                $a = oneH + twoH + thrH + frH + fivH;
                $matchScroll.scrollTo(0, -$a);
                break;
            case 5:
                $a = oneH + twoH + thrH + frH + fivH + sixH;
                $matchScroll.scrollTo(0, -$a);
                break;
        }*/
    }
});
function lc($tarLi){
    var $a = "";
    var oneH = ($a = $("#one")[0]) ? $a.clientHeight : 0,
        twoH = ($a = $("#two")[0]) ? $a.clientHeight : 0,
        thrH = ($a = $("#three")[0]) ? $a.clientHeight : 0,
        frH = ($a = $("#four")[0]) ? $a.clientHeight : 0,
        fivH = ($a = $("#five")[0]) ? $a.clientHeight : 0,
        sixH = ($a = $("#six")[0]) ? $a.clientHeight : 0,
        svnH = ($a = $("#seven")[0]) ? $a.clientHeight : 0,
        win = $("#matchList .content"),
        winH = win.clientHeight,
        winTop = win.css("top");
    var reg = /(\d{2}-\d{2})/;
    var a = reg.exec($tarLi.html())[1];
    winTop = parseFloat(winTop);
    scrollTo(0, -oneH);
    var b = win.find("h2");

    for (var i = 0; i < b.length; i++) {
        if (reg.exec(b[i].innerHTML)[1] == a) {
            $a = $(b[i].parentNode).prevAll();
            var top=0;
            for(var j=0;j<$a.length;j++){
                top+=$a[j].clientHeight+20
            }
            $matchScroll.scrollTo(0,-top);
        }
    }
}
function bindMatchHTML(columnId, strTime, endTime) {
    $.ajax({
        url: "http://matchweb.sports.qq.com/kbs/list?columnId=" + columnId + "&startTime=" + strTime + "&endTime=" + endTime,
        type: "get",
        dataType: "jsonp",
        success: function (jsonData) {
            var $one = $("#one"),
                $two = $("#two"),
                $three = $("#three"),
                $four = $("#four"),
                $five = $("#five"),
                $six = $("#six"),
                $seven = $("seven");
            var jsonData = jsonData["data"];
            var i = 0;
            for (key in jsonData) {
                var str = jsonData[key]
                switch (i) {
                    case 0:
                        str && str.length > 0 ? $one.html(bindHTML(str, key.myFormatTime("{1}-{2}"), "{3}:{4}")) : $one.remove();
                        break;
                    case 1:
                        str && str > 0 ? $two.html(bindHTML(str, key.myFormatTime("{1}-{2}"), "{3}:{4}")) : $two.remove();
                        break;
                    case 2:
                        str && str.length > 0 ? $three.html(bindHTML(str, key.myFormatTime("{1}-{2}"), "{3}:{4}")) : $three.remove();
                        break;
                    case 3:
                        str && str.length > 0 ? $four.html(bindHTML(str, key.myFormatTime("{1}-{2}"), "{3}:{4}")) : $four.remove();
                        break;
                    case 4:
                        str && str.length > 0 ? $five.html(bindHTML(str, key.myFormatTime("{1}-{2}"), "{3}:{4}")) : $five.remove();
                        break;
                    case 5:
                        str && str.length > 0 ? $six.html(bindHTML(str, key.myFormatTime("{1}-{2}"), "{3}:{4}")) : $six.remove();
                        break;
                    case 6:
                        str && str.length > 0 ? $seven.html(bindHTML(str, key.myFormatTime("{1}-{2}"), "{3}:{4}")) : $seven.remove();
                        break;
                }
                i++;
            }
        }
    });
}

function autoTimer(start, distance) {
    var t = 60,
        change = (distance - Math.abs(start)) / 60,
        dist = start;
    var tim = setInterval(function () {
        t--;
        if (t == 0) {
            dist = distance
            window.clearInterval(tim);
        }
        dist += change;
        //console.log(dist);
        $("#matchList .content").css("transform", "translate(0px," + distance + ")")
    }, 15);
    tim;
}

$("#nav li").on("click", function () {
    var $hot = $("#hot"),
        $match = $("#match"),
        index = $(this).index();

    //->切换赛事
    if (index > 0) {
        columnId = $(this).attr("columnId");
        if (!columnId) {
            return;
        }
        getCalendarList(columnId);
    }

    $(this).addClass("bg").siblings().removeClass("bg");

    //->切换热门
    if (index === 0) {
        $hot.css("display", "block");
        $match.css("display", "none");
    } else {
        $hot.css("display", "none");
        $match.css("display", "block");
    }

    $navScroll.scrollToElement(this, 500);
});
