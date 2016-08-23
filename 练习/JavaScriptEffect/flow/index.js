var oDiv = document.getElementById('div');
var aUl = oDiv.getElementsByTagName('ul');
var n = 0;
/*
 *1.����һ��Ԫ�أ������丳ֵ����ߺ����������������Ԫ��
 *2.��̬����50��Ԫ�أ�ÿ�β嵽��̵�ul�
 *3.��ϵͳ���onScroll�¼������������ʱ������50��li;
 * */
function rnd(n, m) {
    return Math.round(Math.random() * (m - n) + n)
}
function createLi() {
    var oLi = document.createElement('li');
    oLi.style.height = rnd(100, 400) + 'px';
    oLi.style.background = 'rgb(' + rnd(0, 255) + ',' + rnd(0, 255) + ',' + rnd(0, 255) + ')';
    return oLi;
}
createLi50()
function createLi50() {
    for (var i = 0; i < 50; i++) {
        n++;
        var oLi = createLi();
        oLi.innerHTML = n;
        var ary = utils.listToArray(aUl);
        ary.sort(function (a, b) {
            var a = a.offsetHeight;
            var b = b.offsetHeight;
            return a - b;
        })
        ary[0].appendChild(oLi);
    }
}
window.onscroll = function () {
    var winBottom = utils.win('scrollTop') + utils.win('clientHeight');
    if (winBottom >= document.body.scrollHeight - 400) {
        createLi50();
    }

}