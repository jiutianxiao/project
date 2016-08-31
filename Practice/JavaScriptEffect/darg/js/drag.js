//->JS���ṩ�ĺ���ģ������,��ȡ�Ľ����Զ������,����С����������Լ�������������
//->�������������С��TOP����LEFTֵ
var oBox = document.getElementById("box");
var minL = 0,
    minT = 0,
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;

//1��ʵ����ק
on(oBox, "mousedown", down);
function down(ev) {
    //->thisָ�����oBox
    this["strX"] = ev.clientX;
    this["strY"] = ev.clientY;
    this["strL"] = this.offsetLeft;
    this["strT"] = this.offsetTop;

    var _this = this;//->_thisָ����oBox
    _this["MOVE"] = function (e) {
        //->thisָ�����document
        move.call(_this, e);
    };
    _this["UP"] = function (e) {
        //->thisָ�����document
        up.call(_this, e);
    };
    on(document, "mousemove", _this["MOVE"]);
    on(document, "mouseup", _this["UP"]);

    //->������ק֮ǰ�Ȱ������������еĶ���ֹͣ
    window.clearInterval(_this["flyTimer"]);
    window.clearInterval(_this["dropTimer"]);
}
function move(ev) {
    //->thisָ�����oBox
    var curL = ev.clientX - this["strX"] + parseFloat(this["strL"]);
    var curT = ev.clientY - this["strY"] + parseFloat(this["strT"]);
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + "px";
    this.style.top = curT + "px";

    //->����ˮƽ�����˶����ٶ�
    if (!this["prev"]) {
        this["prev"] = this.offsetLeft;
    } else {
        this["speedFly"] = this.offsetLeft - this["prev"];
        this["prev"] = this.offsetLeft;
    }
}
function up(ev) {
    //->thisָ�����oBox
    off(document, "mousemove", this["MOVE"]);
    off(document, "mouseup", this["UP"]);

    //->����ˮƽ�����˶��Ķ���
    fly.call(this);

    //->������ֱ�����˶��Ķ���
    drop.call(this);
}


//2��ʵ��ˮƽ������˶�����
//->ˮƽ�����˶����ٶȲ�һ��,ȡ��������ɿ�����һ˲�������ƶ��Ŀ���
function fly() {
    var _this = this,
        speedFly = _this["speedFly"];
    _this["flyTimer"] = window.setInterval(function () {
        //->��ʱ��ֹͣ������:����ٶ�ֵС��0.5,��������ÿһ�μ��ϵ��ٶ�ֵ,����һ���˶���ʱ��,ͨ��_this.offsetLeft��ȡ��ʱ���Լ���ʡ����ȥ��,Ҳ���Ǽӻ��߲����𲻵��κ�������,��ʱ���ǽ�����ʱ������
        if (Math.abs(speedFly) < 0.5) {
            window.clearInterval(_this["flyTimer"]);
            return;
        }
        speedFly *= 0.98;//->�ٶ�һֱ��˥�������ܶ���
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

//3��ʵ�ִ�ֱ������˶�����
function drop() {
    var _this = this,
        speedDrop = 9.8;
    _this["dropFlag"] = 0;
    _this["dropTimer"] = window.setInterval(function () {
        if (_this["dropFlag"] > 1) {
            window.clearInterval(_this["dropTimer"]);
            return;
        }
        speedDrop += 10;//->������������ǵ��ٶ���Խ��Խ���(��Ϊ�ٶ������ʱ��������,��10�϶�Խ��Խ��),��������ʱ���ٶ�Ϊ����,����10�ٶȻ����,���Է�����Խ��Խ��...
        speedDrop *= 0.98;//->�ӿ��ٶȵ�˥���ٶ�
        var curT = _this.offsetTop + speedDrop;
        if (curT >= maxT) {
            curT = maxT;
            speedDrop *= -1;
            //->����ױߵ�ʱ��,������_this["dropFlag"]�ۼ�
            _this["dropFlag"]++;
        } else {
            //->���������仹�ǵ���ֻҪ�ڿ������Ǿ������Ϊ0
            _this["dropFlag"] = 0;
        }
        _this.style.top = curT + "px";
    }, 10);
}