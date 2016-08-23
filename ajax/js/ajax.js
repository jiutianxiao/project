/**
 * Created by Thinkpad on 2016/7/29.
 */
function ajax(options) {
    var _default = {
        url: "",
        type: "get",
        async: true,
        data: null,
        success: null
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }
//    Ajax«Î«Û
    var xhr = new XMLHttpRequest();
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var data = "JSON" in window ? JSON.parse(xhr.responseText) : eval("(" + xhr.responseText + ")");            if (typeof _default.success === "function") {
                _default.success.call(window, data)
            }
        }
    };
    xhr.send(_default.data);
}