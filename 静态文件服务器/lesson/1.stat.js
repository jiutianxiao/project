var fs = require('fs');
fs.stat('./1.txt',function(err,stat){
    console.log(stat);
})
/**
 atime: 2016-08-28T16:00:00.000Z, access time 访问时间
 mtime: 2016-08-29T12:35:20, modified time 修改时间(修改动作)
 ctime: 1940-10-24T02:26:18, change time 改变时间(内容只要不改就不会改变)
 birthtime: 2016-08-29T12:32:49.870Z 创建时间
**/