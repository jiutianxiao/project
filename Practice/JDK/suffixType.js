//->suffixType���ģ����Ǹ��ݺ�׺����ȡ��MIME����
function getType(suffix) {
    var type = "text/plain";
    switch (suffix) {
        case "HTML":
            type = "text/html";
            break;
        case "CSS":
            type = "text/css";
            break;
        case "JS":
            type = "text/javascript";
            break;
        case "JPG":
            console.log(11111);
            type="image/jpeg";
            break;
        case "PNG":
            type="image/png";
            break;
    }
    return type;
}
module.exports.getType = getType;