/**
 * Created by Thinkpad on 2016/8/29.
 */
var crypto=require("crypto");
console.log(crypto.getHashes());
var fs=require("fs");
var fs=fs.createReadStream("./1.txt");
var md5=crypto.createHash("md5");
rs.on("data",function(data){
    md5.update(data);
})
rs.on("end",function(data){
    md5.digest("hex");
})