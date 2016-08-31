//1.先创建div,并安排好每个div的位置和背景图
var oBanner = document.getElementById("banner");
var frg = document.createDocumentFragment();//创建文档碎片
var col = 10;//列
var row = 3;//行
var boxW = oBanner.offsetWidth / col;//每个盒子的宽度
var boxH = oBanner.offsetHeight / row;//每个盒子的高度
var ary = [];
for (var j = 0; j < row; j++) {//循环的行数
    for (var i = 0; i < col; i++) {//创建第一行里10个div
        var oDiv = document.createElement("div");
//            oDiv.style.width = boxW + "px";
//            oDiv.style.height = boxH + "px";
        oDiv.style.width = 0;
        oDiv.style.height = 0;
        var l = i * boxW;//左偏移
        var t = j * boxH;//上偏移
//            oDiv.style.left = l + "px";
//            oDiv.style.top = t + "px";
        oDiv.style.left = "-300px";
        oDiv.style.top = "-500px";
        oDiv.l = l;//通过自定义属性的方式把左偏移量和上偏移量保存下来
        oDiv.t = t;
        oDiv.style.backgroundPosition = "-" + l + "px -" + t + "px";
        frg.appendChild(oDiv);
        ary.push(oDiv);
    }
}
oBanner.appendChild(frg);
//ary里的每个div和页面上的div是一一映射的关系
//在一定时间,一列一列的出来,先第一列出来,然后再第二列出来....
for (var i = 0; i < ary.length; i++) {
    ~(function (i) {
        window.setTimeout(function () {
            animate(ary[i], {"width": boxW, "height": boxH, "left": ary[i].l, "top": ary[i].t}, 600, 3);
        }, i % col * 100);//为了让每列里的每个div执行动画的时间相同
        //i= 1 i= 11  1%10=1  11%10=1
    })(i)
}


