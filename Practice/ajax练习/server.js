/**
 * Created by Thinkpad on 2016/7/26.
 */

var http = require("http"),
    fs = require("fs"),
    url = require("url"),
    suffixType = require("./suffixType");
//->存放回话数据
var sessions = {}
//与客户端约定的回话ID
var SESSION_KEY = "session.id"
var sv = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        pathQuery = urlObj.query;
    var reg = /\.(HTML|JS|CSS)/i;
    if (reg.test(pathname)) {
        try {
            //->获取资源文件的后缀名,通过后缀名计算出其MIME类型
            var suffix = reg.exec(pathname)[1].toUpperCase(),
                suType = suffixType.getType(suffix);

            //->根据请求资源文件的路径获取到文件的中代码,并且把内容响应给客户端
            var conFile = fs.readFileSync("." + pathname, "utf8");
            res.writeHead(200, {'content-type': suType + ';charset=utf-8;'});
            res.end(conFile);
        } catch (e) {
            res.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
            res.end('请求的资源文件在服务器中并不存在!');
        }
        return;
    }

    var path = "./json/pageData.json";
    //->获取10条用户信息
    if (pathname === "/getData") {
        var n = pathQuery["n"] || 1;
        var ary = [],
            allData = JSON.parse(fs.readFileSync(path, "utf8"));
        for (var i = (n - 1) * 10, len = n * 10 - 1; i <= len; i++) {
            if (i > allData.length - 1) {
                break;
            }
            ary.push(allData[i])
        }
        var obj = {
            total: Math.ceil(allData.length / 10),
            data: ary
        };
        res.writeHead(200, {"content-type": "application/json;charset=utf-8;"});
        res.end(JSON.stringify(obj))
    }

    //->新增所有的客户信息
    if (pathname === "/add") {
        var addTemp = ""
        req.addListener("data", function (postCon) {
            addTemp += postCon;
        });
        req.addListener("end", function () {
            var con = fs.readFileSync(path, "utf8");
            con = JSON.parse(con);
            addTemp = JSON.parse(addTemp);
            if (con.length === 0) {
                addTemp["num"] = 1;
            } else {
                addTemp["num"] = parseFloat(con[con.length - 1]["id"]) + 1;
            }
            con.push(addTemp);
            fs.writeFileSync(path, JSON.stringify(con));
            res.writeHead(200, {"content-type": "application/json;charset=utf-8"});
            res.end(JSON.stringify({
                "code": 0,
                "message": "创建成功!"
            }))
        })
        return;
    }

    //->获取指定的用户信息
    if (pathname === "/getInfo") {
        var con = fs.readFileSync(path, "utf8");
        con = JSON.parse(con);
        var curObj = null;
        for (i = 0; i < con.length; i++) {
            if (con[i]["num"] == pathQuery["id"]) {
                curObj = con[i];
                break;
            }
        }
        if (!curObj) {
            curObj = {};
        }
        res.writeHead(200, {"content-type": "application/json;charset=utf-8"});
        res.end(JSON.stringify(curObj));
        return;
    }

    //->修改客户信息
    if (pathname === "/update") {
        var updateTemp = "";
        req.addListener("data", function (chunk) {
            updateTemp += chunk;
        });
        req.addListener("end", function () {
            con = JSON.parse(fs.readFileSync(path, "utf8"));
            updateTemp = JSON.parse(updateTemp);
            for (var i = 0; i < con.length; i++) {
                var cur = con[i];
                if (cur["num"] == updateTemp["num"]) {
                    con.splice(i, 1, updateTemp);
                    break;
                }
            }
            fs.writeFileSync(path, JSON.stringify(con));
            res.writeHead(200, {"content-type": "application/json;charset=utf-8;"})
            res.end(JSON.stringify({
                "code": 0,
                "message": "修改成功"
            }));
        })
    }

    //->删除客户信息
    if (pathname === "/remove") {
        obj = {
            "code": 1,
            "message": "删除失败!"
        };
        con = JSON.parse(fs.readFileSync(path, "utf8"));
        for (i = 0; i < con.length; i++) {
            if (con[i]["num"] == pathQuery["num"]) {
                //->可以删除
                con.splice(i, 1);
                fs.writeFileSync(path, JSON.stringify(con));
                obj = {
                    "code": 0,
                    "message": "删除成功！"
                };
                break;
            }
        }
        res.writeHead(200, {"content-type": "application/json;charset=utf-8"})
        res.end(JSON.stringify(obj));
    }
});
sv.listen(90);