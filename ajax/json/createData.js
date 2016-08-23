//->创造项目测试使用的假数据
function getRandom(n, m) {
    return Math.round(Math.random() * (m - n) + n);
}
var nameAreFir = "赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏桃江";//->索引从0~31
var nameAreTwo = "一二三四五六七八九";//->索引从0~8

var ary = [];
for (var i = 1; i <= 86; i++) {
    var obj = {};
    obj["num"] = i < 10 ? "00" + i : "0" + i;
    obj["name"] = nameAreFir.charAt(getRandom(0, 31)) + nameAreTwo.charAt(getRandom(0, 8));
    obj["sex"] = getRandom(0, 1);
    obj["score"] = getRandom(10, 99);
    ary.push(obj);
}
console.log(JSON.stringify(ary));