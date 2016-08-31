//->querySelectorAll不存在DOM的映射 getElementsByTagName这个方法存在DOM的映射
var banner = document.querySelector(".banner"),
    wrapper = banner.querySelector(".wrapper"),
    bannerTip = banner.querySelector(".tip");
var wraDivList = wrapper.getElementsByTagName("div"),
    wraImgList = wrapper.getElementsByTagName("img"),
    tipList = bannerTip.getElementsByTagName("li");

//->计算REM和PX的换算比例
~function (desW) {
    var winW = document.documentElement.clientWidth;
    if (winW >= desW) {
        banner.style.width = desW + "px";
        banner.style.margin = "0 auto";
        return;
    }
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);


//->滑动处理的公共方法
function isSwipe(strX, strY, endX, endY) {
    return Math.abs(endX - strX) > 30 || Math.abs(endY - strY) > 30;
}

function swipeDir(strX, strY, endX, endY) {
    return Math.abs(endX - strX) >= Math.abs(endY - strY) ? (endX - strX >= 0 ? "right" : "left") : (endY - strY >= 0 ? "down" : "up");
}

//->获取wrapper的left值
function getLeft() {
    return parseFloat(window.getComputedStyle(wrapper, null)["left"]);
}

//->以后只要是在移动端实现滑动都需要先把文档本身滑动的默认行为阻止掉
document.addEventListener("touchmove", function (ev) {
    ev.preventDefault();
}, false);

//->实现轮播图的业务逻辑
var bannerModule = (function () {
    var total = 0,//->Number of stored div
        step = 1,//->Index of this area of the current activity
        autoTimer = null,
        interval = 1000;
    var winW = banner.offsetWidth;

    //->swipe left or right
    function bindEvent() {
        banner.addEventListener("touchstart", function (ev) {
            window.clearInterval(autoTimer);
            var point = ev.touches[0];
            this["strX"] = point.clientX;
            this["strY"] = point.clientY;
            this["strL"] = getLeft();
        }, false);

        banner.addEventListener("touchmove", function (ev) {
            var point = ev.touches[0];
            this["endX"] = point.clientX;
            this["endY"] = point.clientY;
            this["flag"] = isSwipe(this["strX"], this["strY"], this["endX"], this["endY"]);
            this["swpDir"] = swipeDir(this["strX"], this["strY"], this["endX"], this["endY"]);

            //->只有发生了滑动并且方向是左或者右我们才进行下面的处理
            if (this["flag"] && /(left|right)/i.test(this["swpDir"])) {
                this["changeX"] = this["endX"] - this["strX"];
                var curL = this["strL"] + this["changeX"],
                    minL = -(total - 1) * winW;
                curL = curL >= 0 ? 0 : (curL <= minL ? minL : curL);
                wrapper.style.webkitTransitionDuration = "0s";
                wrapper.style.left = curL + "px";
            }
        }, false);

        banner.addEventListener("touchend", function (ev) {
            if (this["isMoving"]) {
                return;
            }
            this["isMoving"] = true;
            //->只有发生了滑动并且方向是左或者右我们才进行下面的处理
            if (this["flag"] && /(left|right)/i.test(this["swpDir"])) {
                wrapper.style.webkitTransitionDuration = "0.3s";

                //->滑动的偏移不足三分之一屏幕:还是显示当前这张图片
                if (Math.abs(this["changeX"]) < winW / 3) {
                    wrapper.style.left = -step * winW + "px";
                }

                //->滑动的偏移超过三分之一屏幕:分情况处理
                if (Math.abs(this["changeX"]) >= winW / 3) {
                    this["swpDir"] === "left" ? step++ : step--;
                    wrapper.style.left = -step * winW + "px";
                    changeTip();
                }

                //->每一次从前一张切换到当前张(300ms)我们都监听一个定时器,当运动到这一张的时候我们的定时器也会执行了;
                var _this = this;
                var delayTimer = window.setTimeout(function () {
                    if (step === 0) {
                        step = total - 2;
                    }
                    if (step === total - 1) {
                        step = 1;
                    }
                    wrapper.style.webkitTransitionDuration = "0s";
                    wrapper.style.left = -step * winW + "px";
                    window.clearInterval(delayTimer);
                    _this["isMoving"] = false;
                }, 300);
            }
            autoTimer = window.setInterval(autoMove, interval);
        }, false);
    }

    //->set tip
    function changeTip() {
        var temp = step;
        //0 1 2 3 4 5 6  div  step/temp
        //  0 1 2 3 4    li   index
        step === 0 ? temp = total - 2 : null;
        step === total - 1 ? temp = 1 : null;
        [].forEach.call(tipList, function (curLi, index) {
            curLi.className = index + 1 === temp ? "bg" : null;
        });
    }

    //->AUTO MOVE
    function autoMove() {
        step++;
        if (step === total) {
            //->先清除自动轮播
            window.clearInterval(autoTimer);

            //->到达边界的时候,我们让其立马回到第二个DIV的位置(不需要过渡动画)
            wrapper.style.webkitTransitionDuration = "0s";
            wrapper.style.left = -winW + "px";

            //->设定往下一张执行(CSS3动画设定需要反应的时间,我们设置一个临时的延迟处理,也就是在设置一个定时器)
            step = 2;
            var delayTimer = window.setTimeout(function () {
                wrapper.style.webkitTransitionDuration = "0.3s";
                wrapper.style.left = -step * winW + "px";
                changeTip();
                autoTimer = window.setInterval(autoMove, interval);
                window.clearTimeout(delayTimer);
            }, 100);
            return;
        }
        wrapper.style.webkitTransitionDuration = "0.3s";
        wrapper.style.left = -step * winW + "px";
        changeTip();
    }

    //->LAZY IMG
    function lazyImg() {
        [].forEach.call(wraImgList, function (curImg, index) {
            var oImg = new Image;
            oImg.src = curImg.getAttribute("data-src");
            oImg.onload = function () {
                curImg.src = this.src;
                curImg.style.display = "block";
                curImg.className = "imgMove";
                oImg = null;
            }
        });
    }

    //->BIND HTML
    function bindHTML(data) {
        var str1 = '', str2 = '';
        str1 += '<div><img data-src="' + data[data.length - 1]["img"] + '"/></div>';
        data.forEach(function (curData, index) {
            str1 += '<div><img data-src="' + curData["img"] + '"/></div>';

            index === 0 ? str2 += '<li class="bg"></li>' : str2 += '<li></li>';
        });
        str1 += '<div><img data-src="' + data[0]["img"] + '"/></div>';
        wrapper.innerHTML = str1;
        bannerTip.innerHTML = str2;

        //->computed div width
        total = data.length + 2;
        [].forEach.call(wraDivList, function (item) {
            item.style.width = winW + "px";
        });
        wrapper.style.width = total * winW + "px";

        //->lazy img
        window.setTimeout(lazyImg, 500);

        //->auto move
        autoTimer = window.setInterval(autoMove, interval);

        //->bind swipe event
        bindEvent();
    }

    //->SEND AJAX
    function init() {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "json/banner.json?_=" + Math.random(), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                var data = JSON.parse(xhr.responseText);
                bindHTML && bindHTML(data);//->Get the data to achieve the binding of the page and calculate the width of the area
            }
        };
        xhr.send(null);
    }

    return {
        init: init
    }
})();
bannerModule.init();




