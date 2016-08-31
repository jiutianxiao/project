/**
 * Created by Thinkpad on 2016/8/17.
 */
var oBox = document.getElementById("box");
var content = oBox.getElementsByTagName("input");
var ensure = oBox.getElementsByTagName("div")[0]

//->获取地址栏中的问号后面传递的参数值
function queryUrl() {
    var obj = {},
        curURL = window.location.href,
        reg = /([^?&=]+)=([^?&=]+)/g;
    curURL.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}

//->获取浏览器地址中间问号后面传递的参数值：如果传了ID当前操作是修改，否者是新增
var isAdd = true,
    urlObj = queryUrl();
if (typeof urlObj["num"] !== "undefined") {//->获取详情；
    isAdd = false;
    ajax({
        url: "/getInfo?id=" + urlObj["num"] + "&_=" + Math.random(),
        type: "get",
        success: function (data) {
            content[0].value = data["num"];
            content[1].value = data["name"];
            content[2].value = data["sex"];
            content[3].value = data["score"];
        }
    })
}
//绑定点击事件：实现我们的增加或者修改操作
ensure.onclick = function () {
    var obj = {};
    obj.num = content[0].value.replace(/^ +| +$/g, "");
    obj.name = content[1].value.replace(/^ +| +$/g, "");
    obj.sex = content[2].value.replace(/^ +| +$/g, "");
    obj.score = content[3].value.replace(/^ +| +$/g, "");

    var objStr = "";
    if (!isAdd) {
        obj["num"] = urlObj["num"];
        objStr = JSON.stringify(obj);

        ajax({
            url: "update",
            type: "post",
            data: objStr,
            success: function (data) {
                alert(data["message"]);
                if (data["code"] == 0) {
                    window.location.href = "index.html";
                }
            }
        });
        return;
    }
    //->增加
    objStr = JSON.stringify(obj);
    ajax({
        url: "/add",
        type: "post",
        data: objStr,
        success: function (data) {
            alert(data["message"]);
            if (data["code"] == 0) {
                window.locaton.href = "index.html";
            }
        }
    })
}












