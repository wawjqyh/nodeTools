const token = require("../service/token");
const request = require("request");
const path = require("path");
const fs = require("fs");

module.exports = async function (ctx, next) {
    let accessToken = await token.accessToken();
    let url = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=" + accessToken.content + "&media_id=" + "BQfbAj9rrSCM3nwYzKypNW0-8f2hbakzKmpY9X6z33TOTjoH_23VxRb0i-btKNMV";

    request(url).pipe(fs.createWriteStream("img.jpg"));

    ctx.body = "666";
};