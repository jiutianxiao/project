/**
 * Created by Thinkpad on 2016/8/22.
 */
var http=require("http"),
    url=require("url"),
    fs=require("fs"),
    suf=require("./Practice/JDK/suffixType")

var sv=http.createServer(function(req,res){
    var urlObj=url.parse(req.url),
        pathname=urlObj.pathname,
        query=urlObj.query;

    var reg=/\.(HTML|JS|CSS|PNG|JPG)/i;
    if(reg.test(pathname)){
        try{
            var suffix=reg.exec(pathname)[1].toUpperCase(),
                suType=suf.getType(suffix);
            var conFile=fs.readFileSync("."+pathname,"utf8");
            res.writeHead(200,{"content-type":suType+";charset=utf-8"})
            res.end(conFile);
        }catch(e){
            res.writeHead(404,{"content-type":"text/plain;charset=utf-8"})
            res.end("请求的资源文件不存在")
        }
        return
    }
}).listen(1111)