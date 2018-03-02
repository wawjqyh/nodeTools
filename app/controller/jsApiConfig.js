const token = require("../service/token");
const wxConfig = require("../../config/config").wechat;
const sha1 = require("sha1");

/**
 * @desc 获取jsApi配置
 */
module.exports = async function (ctx, next) {
    let jsApiTicket = await token.jsApiTicket();
    let nonce = Math.random().toString(36).substr(2, 15);
    let timeStamp = parseInt(new Date().getTime() / 1000);
    let url = ctx.query.url;

    let params = [
        "noncestr=" + nonce,
        "jsapi_ticket=" + jsApiTicket.content,
        "timestamp=" + timeStamp,
        "url=" + url
    ];

    let str = params.sort().join("&");
    let signature = sha1(str);

    ctx.body = {
        appId: wxConfig.appID,
        timestamp: timeStamp,
        nonceStr: nonce,
        signature: signature
    };
};