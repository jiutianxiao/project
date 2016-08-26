/*
 * 1.ʵ�ֻص�������ͨ����ʱ��ʵ�֣�
 * 2.��ť�Ƿ���ʾ���ڴ���ϵͳ�����¼���ʱ��ҳ���scrollTop �� clientHeight���бȽϣ�
 * 3.�������ť��ʼ������ʱ����ť������ʧ��
 * */
var oBtn = document.getElementById('leftBox').getElementsByTagName("li")[0];
window.onscroll = computedDisplay;
function computedDisplay() {
    if (utils.win('scrollTop') >= utils.win('clientHeight')) {
        utils.setCss(oBtn, 'display', 'block');
    } else {
        utils.setCss(oBtn, 'display', 'none');
    }
}
oBtn.onclick = function () {
    utils.setCss(oBtn, 'display', 'none');
    window.onscroll = null;
    var target = utils.win('scrollTop');
    var duration = 500;
    var interval = 10;
    var step = (target / duration) * interval;
    var timer = setInterval(function () {
        var curT = utils.win('scrollTop');
        if (curT <= 0) {
            clearInterval(timer);
            window.onscroll = computedDisplay;
            return;
        }
        curT -= step;
        utils.win('scrollTop', curT);
    }, interval)
}