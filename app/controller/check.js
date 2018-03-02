const sha1 = require("sha1");
const wxtConfig = require("../../config/config").wechat;

module.exports = async function (ctx, next) {
    if (!ctx.query.signature) {
        next();
        return;
    }

    let signature = ctx.query.signature;
    let echostr = ctx.query.echostr;
    let timestamp = ctx.query.timestamp;
    let nonce = ctx.query.nonce;

    let sha = sha1([wxtConfig.token, timestamp, nonce].sort().join(""));

    if (sha === signature) {
        ctx.body = echostr;
    } else {
        ctx.body = "error";
    }
};