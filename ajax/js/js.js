/**
 * Created by Thinkpad on 2016/8/2.
 */
var name="赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏桃江";
var name2="一二三四五六七八九十";
var ran=function(a,b){
    return Math.round(Math.random()*(b-a)+a);
};
var ary=[];
for(var i=1;i<100;i++){
    var data={};
    data["id"]=i < 10 ? "00" + i : "0" + i;
    data["name"]=name.charAt(ran(0,7))+name2.charAt(ran(0,9));
    data["age"]=ran(20,30);
    data["works"]={};
    ary.push(data);
}
console.log(JSON.stringify(ary));