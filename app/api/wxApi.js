let baseUrl = "https://api.weixin.qq.com/";

module.exports = {
    accessToken: baseUrl + "cgi-bin/token?grant_type=client_credential",    //获取access_token
    jsApiTicket: baseUrl + "cgi-bin/ticket/getticket?type=jsapi",           //获取jaApiTicket
    tempMaterial: baseUrl + "cgi-bin/media/get",                            //获取临时素材
};