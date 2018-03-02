const token = require("../service/token");
const request = require("request");
const path = require("path");
const fs = require("fs");
const wxApi = require("../api/wxApi");

module.exports = {
    /**
     * @todo 获取临时素材
     */
    async getTempMaterial(mediaId){
        let accessToken = await token.accessToken();
        let url = wxApi.tempMaterial + "?access_token=" + accessToken.content + "&media_id=" + mediaId;

        request
            .get(url)
            .on("response", function (res) {
                console.log(res);
            })
            .pipe();
    }
};