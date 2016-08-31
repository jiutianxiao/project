//->querySelectorAll������DOM��ӳ�� getElementsByTagName�����������DOM��ӳ��
var banner = document.querySelector(".banner"),
    wrapper = banner.querySelector(".wrapper"),
    bannerTip = banner.querySelector(".tip");
var wraDivList = wrapper.getElementsByTagName("div"),
    wraImgList = wrapper.getElementsByTagName("img"),
    tipList = bannerTip.getElementsByTagName("li");

//->����REM��PX�Ļ������
~function (desW) {
    var winW = document.documentElement.clientWidth;
    if (winW >= desW) {
        banner.style.width = desW + "px";
        banner.style.margin = "0 auto";
        return;
    }
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);


//->��������Ĺ�������
function isSwipe(strX, strY, endX, endY) {
    return Math.abs(endX - strX) > 30 || Math.abs(endY - strY) > 30;
}

function swipeDir(strX, strY, endX, endY) {
    return Math.abs(endX - strX) >= Math.abs(endY - strY) ? (endX - strX >= 0 ? "right" : "left") : (endY - strY >= 0 ? "down" : "up");
}

//->��ȡwrapper��leftֵ
function getLeft() {
    return parseFloat(window.getComputedStyle(wrapper, null)["left"]);
}

//->�Ժ�ֻҪ�����ƶ���ʵ�ֻ�������Ҫ�Ȱ��ĵ���������Ĭ����Ϊ��ֹ��
document.addEventListener("touchmove", function (ev) {
    ev.preventDefault();
}, false);

//->ʵ���ֲ�ͼ��ҵ���߼�
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

            //->ֻ�з����˻������ҷ���������������ǲŽ�������Ĵ���
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
            //->ֻ�з����˻������ҷ���������������ǲŽ�������Ĵ���
            if (this["flag"] && /(left|right)/i.test(this["swpDir"])) {
                wrapper.style.webkitTransitionDuration = "0.3s";

                //->������ƫ�Ʋ�������֮һ��Ļ:������ʾ��ǰ����ͼƬ
                if (Math.abs(this["changeX"]) < winW / 3) {
                    wrapper.style.left = -step * winW + "px";
                }

                //->������ƫ�Ƴ�������֮һ��Ļ:���������
                if (Math.abs(this["changeX"]) >= winW / 3) {
                    this["swpDir"] === "left" ? step++ : step--;
                    wrapper.style.left = -step * winW + "px";
                    changeTip();
                }

                //->ÿһ�δ�ǰһ���л�����ǰ��(300ms)���Ƕ�����һ����ʱ��,���˶�����һ�ŵ�ʱ�����ǵĶ�ʱ��Ҳ��ִ����;
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
            //->������Զ��ֲ�
            window.clearInterval(autoTimer);

            //->����߽��ʱ��,������������ص��ڶ���DIV��λ��(����Ҫ���ɶ���)
            wrapper.style.webkitTransitionDuration = "0s";
            wrapper.style.left = -winW + "px";

            //->�趨����һ��ִ��(CSS3�����趨��Ҫ��Ӧ��ʱ��,��������һ����ʱ���ӳٴ���,Ҳ����������һ����ʱ��)
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




