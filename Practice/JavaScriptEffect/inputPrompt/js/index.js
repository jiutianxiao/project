~function (pro) {
    //->去除字符串的首尾空格:trim是去除获取字符串的首尾空格(String.prototype),但是这个方法不兼容,我们需要用正则进行处理
    function myTrim() {
        if ("trim" in pro) {
            return this.trim();
        }
        return this.replace(/^ +| +$/g, "");
    }

    pro.myTrim = myTrim;
}(String.prototype);

//->控制提示区域的显示或者隐藏：
//1)不管是光标进入，还是文本框中有内容的输入，只要文本框中有内容，我们就让提示区显示，反之让提示区隐藏
//2)只要文本框失去焦点,提示区域就会隐藏
//3)当点击提示区域的LI的时候,我们让文本框中的内容变为我们当前点击的这个内容,然后让提示区域消失

var $searchInp = $("#searchInp"),
    $searchTip = $(".searchTip");

$searchInp.on("focus keydown keyup", function (e) {
    var $val = $(this).val().myTrim();
    $val ? searchModule.init() : $searchTip.css("display", "none");
}).on("click", function (e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
});

$("body").on("click", function (e) {
    var tar = e.target,
        tarTag = tar.tagName.toUpperCase(),
        $tar = $(tar);
    if (tarTag === "LI" && tar.parentNode.className === "searchTip") {
        $searchInp.val(tar.innerHTML);
    }
    $searchTip.css("display", "none")
});

//->根据输入的内容向百度服务器发送请求，把提示信息获取到，更新提示区域的展示
var searchModule = (function () {
    function bindHTML(data) {
        var str = '';
        if (data) {
            data = data["s"];
            if (data.length === 0) {//->没有搜索匹配
                $searchTip.css("display", "none");
                return;
            }
            $.each(data, function (index, item) {
                if (index > 3) {
                    return;
                }
                str += '<li>' + item + '</li>';
            });
        }
        $searchTip.html(str).stop().slideDown(100);
    }

    function init() {
        var $val = $searchInp.val().myTrim();
        $.ajax({
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + $val,
            type: "get",
            dataType: "jsonp",
            jsonp: "cb",
            jsonpCallback: "searchModule.bindHTML"
        });
    }

    return {
        init: init,
        bindHTML: bindHTML
    }
})();