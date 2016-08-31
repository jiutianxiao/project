function on(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
        return;
    }
    if (!ele["aEvent" + type]) {
        ele["aEvent" + type] = [];
        ele.attachEvent("on" + type, function () {
            run.call(ele);
        });
    }
    var a = ele["aEvent" + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] == fn) {
            return;
        }
    }
    a.push(fn);
}

function run() {
    var e = window.event;
    var a = this["aEvent" + e.type];
    if (a) {
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] == "function") {
                a[i].call(this, e);
            } else {
                a.splice(i, 1);
                i--;
            }
        }
    }
}

function off(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
        return;
    }
    var a = ele["aEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                a[i] = null;
                return;
            }
        }
    }
}

function processThis(fn, obj) {
    return function (e) {
        fn.call(obj, e)
    }
}