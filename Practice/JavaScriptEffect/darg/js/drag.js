//->JS中提供的盒子模型属性,获取的结果永远是整数,出现小数浏览器会自己进行四舍五入
//->计算出最大或者最小的TOP或者LEFT值
var oBox = document.getElementById("box");
var minL = 0,
    minT = 0,
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;

//1、实现拖拽
on(oBox, "mousedown", down);
function down(ev) {
    //->this指向的是oBox
    this["strX"] = ev.clientX;
    this["strY"] = ev.clientY;
    this["strL"] = this.offsetLeft;
    this["strT"] = this.offsetTop;

    var _this = this;//->_this指的是oBox
    _this["MOVE"] = function (e) {
        //->this指向的是document
        move.call(_this, e);
    };
    _this["UP"] = function (e) {
        //->this指向的是document
        up.call(_this, e);
    };
    on(document, "mousemove", _this["MOVE"]);
    on(document, "mouseup", _this["UP"]);

    //->开启拖拽之前先把所有正在运行的动画停止
    window.clearInterval(_this["flyTimer"]);
    window.clearInterval(_this["dropTimer"]);
}
function move(ev) {
    //->this指向的是oBox
    var curL = ev.clientX - this["strX"] + parseFloat(this["strL"]);
    var curT = ev.clientY - this["strY"] + parseFloat(this["strT"]);
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + "px";
    this.style.top = curT + "px";

    //->计算水平方向运动的速度
    if (!this["prev"]) {
        this["prev"] = this.offsetLeft;
    } else {
        this["speedFly"] = this.offsetLeft - this["prev"];
        this["prev"] = this.offsetLeft;
    }
}
function up(ev) {
    //->this指向的是oBox
    off(document, "mousemove", this["MOVE"]);
    off(document, "mouseup", this["UP"]);

    //->开启水平方向运动的动画
    fly.call(this);

    //->开启垂直方向运动的动画
    drop.call(this);
}


//2、实现水平方向的运动动画
//->水平方向运动的速度不一样,取决于最后松开的那一瞬间我们移动的快慢
function fly() {
    var _this = this,
        speedFly = _this["speedFly"];
    _this["flyTimer"] = window.setInterval(function () {
        //->定时器停止的条件:如果速度值小于0.5,这样这样每一次加上的速度值,在下一次运动的时候,通过_this.offsetLeft获取的时候自己就省略下去了,也就是加或者不加起不到任何作用了,此时我们结束定时器即可
        if (Math.abs(speedFly) < 0.5) {
            window.clearInterval(_this["flyTimer"]);
            return;
        }
        speedFly *= 0.98;//->速度一直在衰减的势能动画
        var curL = _this.offsetLeft + speedFly;
        if (curL >= maxL) {
            _this.style.left = maxL + "px";
            speedFly *= -1;
        } else if (curL <= minL) {
            _this.style.left = minL + "px";
            speedFly *= -1;
        } else {
            _this.style.left = curL + "px";
        }
    }, 10);
}

//3、实现垂直方向的运动动画
function drop() {
    var _this = this,
        speedDrop = 9.8;
    _this["dropFlag"] = 0;
    _this["dropTimer"] = window.setInterval(function () {
        if (_this["dropFlag"] > 1) {
            window.clearInterval(_this["dropTimer"]);
            return;
        }
        speedDrop += 10;//->下落过程中我们的速度是越来越快的(因为速度下落的时候是正数,加10肯定越来越大),当反弹的时候速度为负数,加上10速度会变慢,所以反弹是越来越慢...
        speedDrop *= 0.98;//->加快速度的衰减速度
        var curT = _this.offsetTop + speedDrop;
        if (curT >= maxT) {
            curT = maxT;
            speedDrop *= -1;
            //->到达底边的时候,我们让_this["dropFlag"]累加
            _this["dropFlag"]++;
        } else {
            //->不管是下落还是弹起只要在空中我们就让其变为0
            _this["dropFlag"] = 0;
        }
        _this.style.top = curT + "px";
    }, 10);
}