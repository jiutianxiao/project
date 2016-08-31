//�ҵ�Zepto�������ռ�
$.wzt = function () {
};
$.extend($.wzt, {
    default_time: 0.5,//Ĭ���˶�ʱ��
    default_type: "linear" //Ĭ���˶���ʽ
});

//Zepto����׷�ӷ���
$.fn.transition = function (transition) {
    if (!arguments.length) {
        transition = ".3s all ease"
    }
    ;
    return this.css($.fx.cssPrefix + "transition", transition);
};

/**
 * [x ����translateX]
 * @param {[css_length]}  x     [����translateX,ֵΪ�ٷֱȣ����صȡ�������λ���px]
 * @return  {[zepto_object]}    [����this]
 */
$.fn.x = function (x) {
    if (parseInt(x) == x) {
        x = x + "px"
    }
    ;
    return this.css("-webkit-transform", "translateX(" + x + ")");
};
/**
 *  [toX �˶�translateX]
 *  @param {[css_length]} x     [����translateX,ֵΪ�ٷֱȣ����صȡ�������λ���px]
 *  @param {[time]}       time  [ʱ�䣬��λs]
 *  @param {[str]}        type  [�˶���ʽ,ease��linear��]
 *  @param {[function]}   fnEnd [�˶���ɺ�ִ�еĻص�]
 *  @return{[zepto_object]}     [����this]
 */
$.fn.toX = function (x, time, type, fnEnd) {
    var default_time = 0.6;
    var default_type = "ease";
    if (parseInt(x) == x) {
        x = x + "px"
    }
    ;
    if ($.isFunction(time)) {
        fnEnd = time;
        time = default_time;
    }
    ;
    return this.anim({"-webkit-transform": "translateX(" + x + ")"}, time || default_time, type || default_type, fnEnd);
};


/**
 * [y ����translateY]
 * @param  {[css_length]}   y  [����translateY,ֵΪ�ٷֱȣ����صȡ�������λ���px]
 * @return {[zepto_object]}    [����this]
 */
$.fn.y = function (y) {
    if (parseInt(y) == y) {
        y = y + "px"
    }
    ;
    return this.css("-webkit-transform", "translateY(" + y + ")");
}

/**
 *  [toY �˶�translateY]
 *  @param {[css_length]} x     [����translateY,ֵΪ�ٷֱȣ����صȡ�������λ���px]
 *  @param {[time]}       time  [ʱ�䣬��λs]
 *  @param {[str]}        type  [�˶���ʽ,ease��linear��]
 *  @param {[function]}   fnEnd [�˶���ɺ�ִ�еĻص�]
 *  @return{[zepto_object]}     [����this]
 */
$.fn.toY = function (y, time, type, fnEnd) {
    var default_time = 0.6;
    var default_type = "ease";
    if (parseInt(y) == y) {
        y = y + "px"
    }
    ;
    if ($.isFunction(time)) {
        fnEnd = time;
        time = default_time;
    }
    return this.anim({"-webkit-transform": "translateY(" + y + ")"}, time || default_time, type || default_type, fnEnd);
}

//����
$.fn.scale = function (scale, time, type, fnEnd) {
    if (!arguments.length) {
        return this.css("-webkit-transform");
    }
    ;//û�в�����������ʽ
    if (arguments.length == 1) {
        return this.css("-webkit-transform", "scale(" + scale + ")")
    }
    ;//һ������������ʽ
    //������� �˶�
    var default_time = 0.6;
    var default_type = "linear";
    if ($.isFunction(time)) {
        fnEnd = time;
        time = default_time;
    } else if ($.isFunction(type)) {
        fnEnd = type;
        type = default_type;
    }
    ;
    return this.anim({"-webkit-transform": "scale(" + scale + ")"}, time || default_time, type || default_type, fnEnd);
};

//��ת
$.fn.rotate = function (rotate, time, type, fnEnd) {
    if (!arguments.length) {
        return this.css("-webkit-transform");
    }
    ;//û�в�����������ʽ
    if (arguments.length == 1) {
        return this.css({"-webkit-transform": "rotate(" + rotate + ")"})
    }
    ;//һ������������ʽ
    if (parseInt(rotate) == rotate) {
        rotate = rotate + "deg";
    }
    //������� �˶�
    var default_time = 0.6;
    var default_type = "linear";
    if ($.isFunction(time)) {
        fnEnd = time;
        time = default_time;
    } else if ($.isFunction(type)) {
        fnEnd = type;
        type = default_type;
    }
    ;
    return this.anim({"-webkit-transform": "rotate(" + rotate + ")"}, time || default_time, type || default_type, fnEnd);
};

/**
 * [fadeIn ����]
 * @param {[time]}          time  [ʱ�䣬��λs]
 * @param {[function]}      fnEnd [�˶���ɺ�ִ�еĻص�]
 * @return{[zetpo_object]}        [����this]
 * */
$.fn.fadeIn = function (time, fnEnd) {
    if (!arguments.length) {
        time = 0.5;
    };
    if ($.isFunction(time)) {
        fnEnd = time;
        time = 0.5;
    };
    return this.show().anim({"opacity": 1}, time, "linear", fnEnd);
};
/**
 * [fadeOut ����]
 * @param {[time]}          time  [ʱ�䣬��λs]
 * @param {[function]}      fnEnd [�˶���ɺ�ִ�еĻص�]
 * @return{[zetpo_object]}        [����this]
 * */
$.fn.fadeOut = function (time, fnEnd) {
    if (!arguments.length) {
        time = 0.5;
    }
    ;
    if ($.isFunction(time)) {
        fnEnd = time;
        time = 0.5;
    }
    ;
    var that = this;
    return this.anim({opacity: 0}, time, "linear", function () {
        that.hide();
        fnEnd && fnEnd.call(this);
    });
}
/**
 * [loader ��ͼƬ����]
 * @param  {string}        selector    [��Ҫ���ص�ͼƬ������]
 * @param  {string}        attr        [ͼƬ�ϱ���src������]
 * @param  {function}    fnOne        [ÿ����һ��ͼƬ�󴥷��Ļص�����,�ᴫ��fnOne(i, count),��ǰ����,�ܸ���]
 * @param  {function}    fnEnd        [����ͼƬ��������ɺ󴥷��Ļص�����,�ᴫ��fnEnd(count),�ܸ���]
 * @return {undefined}    undefined    [û�з���ֵ]
 */
$.loader = function (selector, attr, fnOne, fnEnd) {
    var i = 0;
    var srcs = [];
    var imgs = typeof selector === "string" ? $(selector + "[" + attr + "]") : $(selector).find("[" + attr + "]");
    var count = imgs.length;
    if (count == 0) {
        fnEnd && fnEnd(0);
        return;
    }
    (function () { // ͬ������
        var load = arguments.callee;
        if (i == count) {
            // var name =  (typeof selector === "string" ? selector : "." + selector.get(0).className) + " [" + attr + "]";
            // console.log(name + " ͼƬ�������,count:", count);
            fnEnd && fnEnd(count);
            imgs = srcs = null;
            return;
        }
        var img = imgs[i];
        var src = img.getAttribute(attr);
        if (srcs.indexOf(src) == -1) {
            srcs.push(src);
            img.onload = function () {
                i++;
                fnOne && fnOne(i, count);
                img = img.onload = null;
                load();
            };
        } else {
            i++;
            fnOne && fnOne(i, count);
            load();
        }
        img.src = src;
        img.removeAttribute(attr);
    })();
};

