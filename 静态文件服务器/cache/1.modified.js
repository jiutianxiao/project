/**
 * 1.浏览器第一次访问服务器的时候，服务器返回需要的文件并返回响应头(Last-Modified)表示此文件的上次修改时间
 *
 */

var express = require('express');
var fs = require('fs');
var app = express();
//为res增加了一个方法，发送错误
app.use(function(req,res,next){
    res.sendError = function(){
        res.statusCode = 500;//写上状态码
        res.end('服务器端错误');//错误响应体
    }
    next();
});
app.get('/',function(req,res){
    res.sendFile('index.html',{root:__dirname});
});
/**
 * 如果客户端第二次访问此资源的时候如果发现本地有缓存，则会向
 * 服务器端确认是缓存是否过期
 * 请求服务器的时候会发一个If-Modified-Since的请求头到服务器端
 *
 *
 */
app.get('/index.js',function(req,res){
    var ifModifiedSince = req.headers['if-modified-since'];
    if(ifModifiedSince){
        fs.stat('./index.js',function(err,stat){
            //判断客户端发过来最后修改时间和当前文件的实际最后修改时间是否一致
            if(ifModifiedSince == stat.ctime.toUTCString()){
                //返回304，表示缓存未修改
                res.statusCode = 304;
                res.end();
            }else{
                res.setHeader('Last-Modified',stat.ctime.toUTCString());
                fs.createReadStream('./index.js').pipe(res);
            }
        })
    }else{
        //获取此文件的上次修改时间并通过响应头发送给客户端
        fs.stat('./index.js',function(err,stat){
            if(err){
                res.sendError();
            }else{
                res.setHeader('Last-Modified',stat.ctime.toUTCString());
                fs.createReadStream('./index.js').pipe(res);
            }
        })
    }

});
app.listen(9090);
