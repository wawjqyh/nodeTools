let baseUrl = "https://api.weixin.qq.com/";

module.exports = {
    accessToken: baseUrl + "cgi-bin/token?grant_type=client_credential",
    jsApiTicket: baseUrl + "cgi-bin/ticket/getticket?type=jsapi"
};