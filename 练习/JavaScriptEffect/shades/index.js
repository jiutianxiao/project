//1.�ȴ���div,�����ź�ÿ��div��λ�úͱ���ͼ
var oBanner = document.getElementById("banner");
var frg = document.createDocumentFragment();//�����ĵ���Ƭ
var col = 10;//��
var row = 3;//��
var boxW = oBanner.offsetWidth / col;//ÿ�����ӵĿ��
var boxH = oBanner.offsetHeight / row;//ÿ�����ӵĸ߶�
var ary = [];
for (var j = 0; j < row; j++) {//ѭ��������
    for (var i = 0; i < col; i++) {//������һ����10��div
        var oDiv = document.createElement("div");
//            oDiv.style.width = boxW + "px";
//            oDiv.style.height = boxH + "px";
        oDiv.style.width = 0;
        oDiv.style.height = 0;
        var l = i * boxW;//��ƫ��
        var t = j * boxH;//��ƫ��
//            oDiv.style.left = l + "px";
//            oDiv.style.top = t + "px";
        oDiv.style.left = "-300px";
        oDiv.style.top = "-500px";
        oDiv.l = l;//ͨ���Զ������Եķ�ʽ����ƫ��������ƫ������������
        oDiv.t = t;
        oDiv.style.backgroundPosition = "-" + l + "px -" + t + "px";
        frg.appendChild(oDiv);
        ary.push(oDiv);
    }
}
oBanner.appendChild(frg);
//ary���ÿ��div��ҳ���ϵ�div��һһӳ��Ĺ�ϵ
//��һ��ʱ��,һ��һ�еĳ���,�ȵ�һ�г���,Ȼ���ٵڶ��г���....
document.body.onclick = function () {
    for (var i = 0; i < ary.length; i++) {
        ~(function (i) {
            window.setTimeout(function () {
                animate(ary[i], {"width": boxW, "height": boxH, "left": ary[i].l, "top": ary[i].t}, 600, 3);
            }, i % col * 100);//Ϊ����ÿ�����ÿ��divִ�ж�����ʱ����ͬ
            //i= 1 i= 11  1%10=1  11%10=1
        })(i)
    }
}

