/**
 * Created by liu on 2016/5/15.
 */
var utils = (function () {
    var flag = 'getComputedStyle' in window;
    //listToArray:������ת����
    function listToArray(arg) {
        if (flag) {
            return Array.prototype.slice.call(arg);
        } else {
            var ary = [];
            for (var i = 0; i < arg.length; i++) {
                ary.push(arg[i]);
            }
            return ary;
        }
    }

    //jsonParse:JSON��ʽ���ַ���תJSON��ʽ����
    function jsonParse(str) {
        return flag ? JSON.parse(str) : eval('(' + str + ')');
    }

    //offset:��ǰԪ�ؾ���body��ƫ����
    function offset(curEle) {
        var l = 0;
        var t = 0;
        var par = curEle.offsetParent;
        l += curEle.offsetLeft;
        t += curEle.offsetTop;
        while (par) {
            //IE8 offsetLeft/top�Ѿ������˱߿򣬵�������������������߿�
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;

        }
        return {left: l, top: t}
    }

    //win:��ȡ���������������ģ�ͣ�
    function win(attr, value) {
        if (typeof value === 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;
    }

    //getByClass:��һ����Χ��ͨ��className��ȡԪ��
    function getByClass(curEle, strClass) {
        if (flag) {//�߼�
            return this.listToArray(curEle.getElementsByClassName(strClass));
        }
        var ary = [];
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/g);
        var nodeList = curEle.getElementsByTagName('*');//�õ���ǰԪ��������Ԫ��
        for (var i = 0; i < nodeList.length; i++) {//ѭ����Ŀ����Ϊ��ƥ��ÿ��Ԫ�ص�className�Ƿ����Ҫ��ƥ��Ҫ�������Ԫ���ϵ�className����aryclass�е�ÿһ��className�ַ���
            var curNode = nodeList[i];
            var bOk = true;//���跨�����趼����
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                //var reg=new RegExp('(\\b)'+curClass+'(\\b)');
                var reg = new RegExp('(^| +)' + curClass + '( +|$)');
                if (!reg.test(curNode.className)) {
                    bOk = false;
                }
            }
            if (bOk) {
                ary.push(curNode)
            }
        }
        return ary;
    }

    //hasClass:�жϵ�ǰԪ�����Ƿ������strClass��class����
    function hasClass(curEle, strClass) {
        var reg = new RegExp('(\\b)' + strClass + '(\\b)');
        return reg.test(curEle.className)
    }

    //addClass:���һ��class��
    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass;
            }
        }

    }

    //removeClass:�Ƴ�����ǰԪ���ϵ�class��
    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (this.hasClass(curEle, curClass)) {
                var reg = new RegExp('(^| +)' + curClass + '( +|$)')
                curEle.className = curEle.className.replace(reg, ' ')
            }
        }

    }

    //getCss:��ȡ���м���ʽ
    function getCss(curEle, attr) {
        var val = null;
        var reg = null;
        if (flag) {//�߼������
            val = getComputedStyle(curEle, null)[attr];
        } else {//�ͼ������
            if (attr == 'opacity') {// alpha(opacity=10)
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity[=:](\d+(?:\.\d+))?\)$/i;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }

        }
        reg = /^([+-]?\d+(\.\d+)?)(px|pt|em|rem)?$/i;//-200px +200px 22.33px px pt em rem
        // reg=/^((\+|-)?\d+(\.\d+)?)(px|pt|em|rem)?$/i;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //setCss:�����м���ʽ
    function setCss(curEle, attr, value) {
        //float
        if (attr == 'float') {
            curEle.style.cssFloat = value;//���
            curEle.style.styleFloat = value;//ie
            return;
        }
        //͸���ȵĴ���
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        //�ӵ�λ�Ĵ���
        var reg = /(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/
        if (reg.test(attr)) {
            value += 'px';
        }
        curEle.style[attr] = value;
    }

    //setGroupCss:����һ����ʽ
    function setGroupCss(curEle, options) {
        if (options.toString() !== '[object Object]') {
            return;
        }
        for (var attr in options) {
            this.setCss(curEle, attr, options[attr])
        }
    }

    //css:��ȡ��������ʽ
    function css(curEle) {
        var argTwo = arguments[1];
        if (typeof argTwo === 'string') {
            if (typeof arguments[2] !== 'undefined') {// ��������
                this.setCss(curEle, argTwo, arguments[2]);
                return;
            } else {//��ȡ
                return this.getCss(curEle, argTwo)
            }
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === '[object Object]') {//����һ����ʽ
            this.setGroupCss(curEle, argTwo)
        }
    }

    //children:��ȡ��ǰԪ�ص������ӽڵ�
    function children(curEle, tagName) {
        var ary = [];
        if (flag) {
            ary = this.listToArray(curEle.children);
        } else {
            var chs = curEle.childNodes;
            for (var i = 0; i < chs.length; i++) {
                var curNode = chs[i];
                if (curNode.nodeType == 1) {
                    ary.push(curNode)
                }
            }
        }
        if (typeof tagName == 'string') {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(i, 1);
                    i--;
                }
            }
        }
        return ary;
    }

    //prev:��ȡ��һ�����Ԫ��
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    //prevAll:��ȡ���еĸ��Ԫ�ؽڵ�
    function prevAll(curEle) {
        var pre = this.prev(curEle);
        var ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    //next:��һ���ܵ�Ԫ�ؽڵ�
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    //nextAll:���еĵܵ�Ԫ�ؽڵ�
    function nextAll(curEle) {
        var nex = this.next(curEle);
        var ary = [];
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    //sibling:����Ԫ�ؽڵ�
    function sibling(curEle) {
        var pre = this.prev(curEle)
        var nex = this.next(curEle);
        var ary = [];
        if (pre) ary.push(pre);
        if (nex) ary.push(nex);
        return ary;
    }

    //siblings:�ֵ�Ԫ�ؽڵ�
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    //firstChild:��һ����Ԫ��
    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length ? chs[0] : null;
    }

    //lastChild:���һ����Ԫ��
    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length ? chs[chs.length - 1] : null;
    }

    //index:��ǰԪ�ص�������
    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    //appendChild:��Ԫ�ز��뵽������ĩβ
    function appendChild(context, curEle) {
        context.appendChild(curEle);
    }

    //prepend:��Ԫ�ز��뵽�������ͷ
    function prepend(context, curEle) {
        var fir = this.firstChild(context);
        if (fir) {
            context.insertBefore(curEle, fir);
        } else {
            context.appendChild(curEle);
        }
    }

    //insertBefore:��ĳ��Ԫ�ز��뵽ָ��Ԫ�ص�ǰ��
    function insertBefore(curEle, oldEle) {
        oldEle.parentNode.insertBefore(curEle, oldEle);
    }

    //insertAfter:��ĳ��Ԫ�ز��뵽ָ��Ԫ�صĺ���
    function insertAfter(curEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(curEle, nex);
        } else {
            oldEle.parentNode.appendChild(curEle);
        }

    }

    return {
        listToArray: listToArray,
        jsonParse: jsonParse,
        offset: offset,
        win: win,
        getByClass: getByClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: getByClass,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        children: children,
        prev: prev,
        prevAll: prevAll,
        next: next,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        firstChild: firstChild,
        lastChild: lastChild,
        index: index,
        appendChild: appendChild,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter

    }
})();









