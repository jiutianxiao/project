/**
 * Created by Mr.Gao on 2016/6/13.
 */
function jd() {
    var curCity = document.getElementById("curCity");
    var cityList = document.getElementById("city_h");
    var oBanner = document.getElementById("top_banner");
    var oDiv = document.getElementById("topBanner_close");

    function citySelect(ev) {
        ev = ev || window.event;
        var tar = ev.target || ev.srcElement;
        curCity.innerHTML = tar.innerHTML;
        select();
    }

    function select() {
        var cityA = cityList.getElementsByTagName("a");
        for (var i = 0; i < cityA.length; i++) {
            var curA = cityA[i].innerHTML;
            if (curA == curCity.innerHTML) {
                cityA[i].className = "bg";
            } else {
                cityA[i].className = "";
            }
        }
    }

    select();
    cityList.addEventListener("click", citySelect);
    oDiv.onclick = function () {
        oBanner.style.display = "none";
    }
}
jd();

/*rightFix*/
(function () {
    var oDiv = document.getElementById('rightFix');
    var aLi = oDiv.getElementsByTagName('li');
    var b = aLi[1].getElementsByTagName('b')[0];
    var bl = aLi[0].getElementsByTagName('b')[0];
    var div = oDiv.getElementsByTagName('div')[0];
    for (var i = 0, len = aLi.length; i < len; i++) {
        var curLi = aLi[i];
        this.index = i;
        curLi.onmouseover = function () {
            var oI = this.getElementsByTagName('i')[0];
            var aSpan = this.getElementsByTagName('span')[0];
            oI.className = 'color';
            aSpan.className = 'color';
            if (this.parentNode.nodeName === "OL") {
                zhufengAnimate(aSpan, {'left': -50}, 300)
            } else {
                zhufengAnimate(aSpan, {'left': -47}, 300)
            }
        };
        curLi.onmouseout = function () {
            var oI = this.getElementsByTagName('i')[0];
            var aSpan = this.getElementsByTagName('span')[0];
            oI.className = '';
            aSpan.className = '';
            zhufengAnimate(aSpan, {'left': 0}, 300);
        };
        curLi.onclick = function () {
            var aSpan = this.getElementsByTagName('span')[0];
            aSpan.style.left = 0;
            zhufengAnimate(oDiv, {'right': 270}, 300)
        };
        div.onmouseout = function () {
            zhufengAnimate(oDiv, {'right': 0}, 300)
        }
    }
})();

function selectTab(){
    var oUl=document.getElementById("tab");
    var oLis=oUl.getElementsByTagName('li');
    var oDiv=document.getElementById("tabList");
    var oDivs=utils.children(tabList,"div");
    for(var i=0;i<oLis.length;i++){
        oLis[i].index=i;
        oLis[i].onclick=function(){
            changeTab(this.index);
        }
    }
    function changeTab(n){
        for(var i=0;i<oLis.length;i++){
            oLis[i].className='tab_item';
            oDivs[i].className="hide";

        }
        oLis[n].className="tab_select tab_item";
        oDivs[n].className="main-select hide";
        /*if(!oLis[n].previousSibling){
            return;
        }*/
        /*var lisNext=utils.prev(oLis[n]);
        var lisNexts=utils.lastChild(lisNext);
        utils.setCss(lisNexts,"display","none");*/
        /*var lisNext1=utils.prev(oLis[n]);
        var lisNexts1=utils.lastChild(lisNext1);
        utils.setCss(lisNexts1,"display","block")*/
    }
}
selectTab();

