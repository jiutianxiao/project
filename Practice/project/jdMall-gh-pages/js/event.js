/**
 * Created by Mr.Gao on 2016/6/2.
 */
Function.prototype.myBind = function myBind(context) {
    if ("bind"in Function.prototype) {
        return this.bind.apply(this, arguments);
    }
    var _this = this;
    var outerArg = [].prototype.call(arguments, 1);
    return function () {
        var innerArg = [].slice.call(arguments, 0);
        _this.apply(context, outerArg.concat(innerArg))
    }
};

/**
 * bind:实现DOM2事件绑定，兼容所有浏览器，解决this和重复问题
 * @param curEle[Object] 当前要操作的元素
 * @param type[String] 需要绑定类型
 * @param fn[function] 需要绑定的方法
 * by Gao on 2016/06/02
 */
function bind(curEle, type, fn) {
    if (document.addEventListener) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    !curEle["myBind" + type] ? curEle["myBind" + type] = [] : null;
    var tempFn = fn.myBind(curEle);
    tempFn.photo = fn;
    var ary = curEle["myBind" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].photo === fn) {
            return;
        }
    }
    ary.push(tempFn);
    curEle.attachEvent("on" + type, tempFn);
}
function unbind(curEle, type, fn) {
    if (document.addEventListener) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    var ary = curEle["myBind" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            var tempFn = ary[i];
            if (tempFn.photo == fn) {
                curEle.detachEvent("on" + type, tempFn);
                ary.splice(i, 1);
                break;
            }
        }
    }

}