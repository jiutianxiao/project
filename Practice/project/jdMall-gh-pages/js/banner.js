
    function autoBanner() {
        var oBanner = document.getElementById('banner1');
        var oImgWrap = oBanner.getElementsByTagName('div')[0];
        var aDiv = oImgWrap.getElementsByTagName('div');
        var aImg = oImgWrap.getElementsByTagName('img');
        var oUl = oBanner.getElementsByTagName('ul')[0];
        var aLi = oUl.getElementsByTagName('li');
        var oBtnLeft = oBanner.getElementsByTagName('a')[0];
        var oBtnRight = oBanner.getElementsByTagName('a')[1];
        var data = null;

        getData();
        function getData() {
            var xml = new XMLHttpRequest();
            xml.open('get', 'json/jsonBanner1?_=' + Math.random(), false);
            xml.onreadystatechange = function () {
                if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
                    data = utils.jsonParse(xml.responseText);
                }
            };
            xml.send();
        }

        bind();
        function bind() {
            var str = '';
            var str2 = '';
            for (var i = 0; i < data.length; i++) {
                var ab = i + 1;
                str += '<div><img src="" realImg="' + data[i].imgSrc + '" alt=""/></div>';
                str2 += i == 0 ? '<li class="bg">1</li>' : '<li>' + ab + '</li>';
            }
            oImgWrap.innerHTML = str;
            oUl.innerHTML = str2;
        }

        lazyImg();
        function lazyImg() {
            for (var i = 0; i < aImg.length; i++) {
                (function (index) {
                    var curImg = aImg[index];
                    var oImg = new Image;
                    oImg.src = curImg.getAttribute('realImg');
                    oImg.onload = function () {
                        curImg.src = this.src;
                        oImg = null;
                        utils.css(aDiv[0], 'zIndex', 1);
                        zhufengAnimate(aDiv[0], {'opacity': 1}, 1000)
                    }
                })(i);
            }
        }

        var step = 0;
        clearInterval(autoTimer);
        var autoTimer = setInterval(autoMove, 2000);

        function autoMove() {
            if (step >= aDiv.length - 1) {
                step = -1;
            }
            step++;
            setBanner();
        }

        function setBanner() {
            for (var i = 0; i < aDiv.length; i++) {
                var curDiv = aDiv[i];
                if (i == step) {
                    utils.css(curDiv, "zIndex", 1);
                    zhufengAnimate(curDiv, {opacity: 1}, 600, function () {
                        var siblings = utils.siblings(this);
                        for (var i = 0; i < siblings.length; i++) {
                            utils.css(siblings[i], 'opacity', 0);
                        }
                    });
                    continue;
                }
                utils.css(curDiv, 'zIndex', 0)
            }
            bannerTip();
        }

        function bannerTip() {
            for (var i = 0; i < aLi.length; i++) {
                var curLi = aLi[i];
                i === step ? utils.addClass(curLi, 'bg') : utils.removeClass(curLi, 'bg');
            }
        }

        oBanner.onmouseover = function () {
            clearInterval(autoTimer);
            utils.css(oBtnLeft, 'display', 'block');
            utils.css(oBtnRight, 'display', 'block');
        };
        oBanner.onmouseout = function () {
            autoTimer = setInterval(autoMove, 2000);
            utils.css(oBtnLeft, 'display', 'none');
            utils.css(oBtnRight, 'display', 'none');
        };

        handleChange();
        function handleChange() {
            for (var i = 0; i < aLi.length; i++) {
                (function (index) {
                    var curLi = aLi[index];
                    curLi.onclick = function () {
                        step = index;
                        setBanner();
                    }
                })(i)
            }
        }

        oBtnRight.onclick = autoMove;
        oBtnLeft.onclick = function () {
            if (step <= 0) {
                step = aLi.length;
            }
            step--;
            setBanner();
        };
    }
    autoBanner();

