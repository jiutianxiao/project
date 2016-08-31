//我的Zepto的命名空间
$.wzt = function () {
};
$.extend($.wzt, {
    default_time: 0.5,//默认运动时间
    default_type: "linear" //默认运动方式
});

//Zepto对象，追加方法
$.fn.transition = function (transition) {
    if (!arguments.length) {
        transition = ".3s all ease"
    }
    ;
    return this.css($.fx.cssPrefix + "transition", transition);
};

/**
 * [x 设置translateX]
 * @param {[css_length]}  x     [设置translateX,值为百分比，像素等。不带单位会加px]
 * @return  {[zepto_object]}    [返回this]
 */
$.fn.x = function (x) {
    if (parseInt(x) == x) {
        x = x + "px"
    }
    ;
    return this.css("-webkit-transform", "translateX(" + x + ")");
};
/**
 *  [toX 运动translateX]
 *  @param {[css_length]} x     [设置translateX,值为百分比，像素等。不带单位会加px]
 *  @param {[time]}       time  [时间，单位s]
 *  @param {[str]}        type  [运动方式,ease、linear等]
 *  @param {[function]}   fnEnd [运动完成后执行的回调]
 *  @return{[zepto_object]}     [返回this]
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
 * [y 设置translateY]
 * @param  {[css_length]}   y  [设置translateY,值为百分比，像素等。不带单位会加px]
 * @return {[zepto_object]}    [返回this]
 */
$.fn.y = function (y) {
    if (parseInt(y) == y) {
        y = y + "px"
    }
    ;
    return this.css("-webkit-transform", "translateY(" + y + ")");
}

/**
 *  [toY 运动translateY]
 *  @param {[css_length]} x     [设置translateY,值为百分比，像素等。不带单位会加px]
 *  @param {[time]}       time  [时间，单位s]
 *  @param {[str]}        type  [运动方式,ease、linear等]
 *  @param {[function]}   fnEnd [运动完成后执行的回调]
 *  @return{[zepto_object]}     [返回this]
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

//缩放
$.fn.scale = function (scale, time, type, fnEnd) {
    if (!arguments.length) {
        return this.css("-webkit-transform");
    }
    ;//没有参数，返回样式
    if (arguments.length == 1) {
        return this.css("-webkit-transform", "scale(" + scale + ")")
    }
    ;//一个参数设置样式
    //多个参数 运动
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

//旋转
$.fn.rotate = function (rotate, time, type, fnEnd) {
    if (!arguments.length) {
        return this.css("-webkit-transform");
    }
    ;//没有参数，返回样式
    if (arguments.length == 1) {
        return this.css({"-webkit-transform": "rotate(" + rotate + ")"})
    }
    ;//一个参数设置样式
    if (parseInt(rotate) == rotate) {
        rotate = rotate + "deg";
    }
    //多个参数 运动
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
 * [fadeIn 淡入]
 * @param {[time]}          time  [时间，单位s]
 * @param {[function]}      fnEnd [运动完成后执行的回调]
 * @return{[zetpo_object]}        [返回this]
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
 * [fadeOut 淡出]
 * @param {[time]}          time  [时间，单位s]
 * @param {[function]}      fnEnd [运动完成后执行的回调]
 * @return{[zetpo_object]}        [返回this]
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
 * [loader 绑定图片加载]
 * @param  {string}        selector    [需要加载的图片的容器]
 * @param  {string}        attr        [图片上保存src的属性]
 * @param  {function}    fnOne        [每加载一张图片后触发的回调函数,会传入fnOne(i, count),当前个数,总个数]
 * @param  {function}    fnEnd        [所有图片都加载完成后触发的回调函数,会传入fnEnd(count),总个数]
 * @return {undefined}    undefined    [没有返回值]
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
    (function () { // 同步加载
        var load = arguments.callee;
        if (i == count) {
            // var name =  (typeof selector === "string" ? selector : "." + selector.get(0).className) + " [" + attr + "]";
            // console.log(name + " 图片加载完成,count:", count);
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

