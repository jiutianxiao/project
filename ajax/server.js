/**
 * Created by Thinkpad on 2016/7/26.
 */
var http = require("http"),
    fs = require("fs"),
    url = require("url");

var sv = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        pathQuery = urlObj.query;
    var reg = /\.(HTML|JS|CSS)/i;
    if (reg.test(pathname)) {
        try {
            var suffix = reg.exec(pathname)[1].toUpperCase();
            var suffixType = "text/plain";
            switch (suffix) {
                case "HTML":
                    suffixType = "text/html";
                    break;
                case "JS":
                    suffixType = "text/javascript";
                    break;
                case "CSS":
                    suffixType = "text/css";
                    break;
            }
            var conFile = fs.readFileSync("." + pathname, "utf8");
            res.writeHead(200, {"content-type": suffixType + ";charset=utf-8"});
            res.end(conFile);
        } catch (e) {
            res.writeHead(404);
            res.end()
        }
        return;
    }
    if (pathname === "/getData") {
        var n = pathQuery["n"] || 1;
        var ary = [],
            allData=JSON.parse(fs.readFileSync("./json/pageData.json","utf8"));
        for(var i=(n-1)*10,len=n*10-1;i<=len;i++){
            if(i>allData.length-1){
                break;
            }
            ary.push(allData[i])
        }
        var obj={
            total:Math.ceil(allData.length/10),
            data:ary
        };
        res.writeHead(200,{"content-type":"application/json;charset=utf-8;"});
        res.end(JSON.stringify(obj))
    }
    if(pathname==="/dataPage"){

    }
});
sv.listen(90);





















