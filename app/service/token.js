const wxConfig = require("../../config/config").wechat;
const wxApi = require("../api/wechat");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

let token = {
    content: "",
    time: 0
};

let ticket = {
    content: "",
    time: 0
};

async function accessToken() {
    if (token.content === "" || new Date().getTime() > token.time) {
        await readAccessToken();
    }

    return token;
}

/**
 * @desc 从文件读取access_token
 */
async function readAccessToken() {
    //从文件读取access_token
    await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "../token/accessToken.txt"), "utf-8", function (err, data) {
            if (err) {
                resolve(false);
            } else {
                let fToken = JSON.parse(data);

                if (fToken.content) {
                    token = fToken;
                    resolve();
                }
            }
        });
    });

    //判断文件读取的access_token是否有效，如果无效则在线获取
    if (token.content === "" || new Date().getTime() > token.time) {
        await getAccessToken();
    }
}

/**
 * @desc 获取access_token
 */
async function getAccessToken() {
    let url = wxApi.accessToken + "&appid=" + wxConfig.appID + "&secret=" + wxConfig.appsecret;

    //获取access_token
    let res = await axios.post(url);

    if (res.status === 200 && res.data && res.data.access_token) {
        token.content = res.data.access_token;
        token.time = new Date().getTime() + 7100 * 1000;

        //将获取的access_token存入文件
        fs.writeFile(path.resolve(__dirname, "../token/accessToken.txt"), JSON.stringify(token), function () {
        });
    }
}

async function jsApiTicket() {
    if (ticket.content === "" || new Date().getTime() > ticket.time) {
        await readJsApiTicket();
    }

    return ticket;
}

/**
 * @desc 从文件读取jsApiTicket
 */
async function readJsApiTicket() {
    //从文件读取jsApiTicket
    await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "../token/jsApiTicket.txt"), "utf-8", function (err, data) {
            if (err) {
                resolve(false);
            } else {
                let fTicket = JSON.parse(data);

                if (fTicket.content) {
                    ticket = fTicket;
                    resolve();
                }
            }
        });
    });

    //判断文件读取的access_token是否有效，如果无效则在线获取
    if (ticket.content === "" || new Date().getTime() > ticket.time) {
        await getJsApiTicket();
    }
}

/**
 * @desc 获取access_token
 */
async function getJsApiTicket() {
    let uToken = await accessToken();
    let url = wxApi.jsApiTicket + "&access_token=" + uToken.content;

    //获取access_token
    let res = await axios.post(url);

    if (res.status === 200 && res.data && res.data.ticket) {
        ticket.content = res.data.ticket;
        ticket.time = new Date().getTime() + 7100 * 1000;

        //将获取的access_token存入文件
        fs.writeFile(path.resolve(__dirname, "../token/jsApiTicket.txt"), JSON.stringify(ticket), function () {
        });
    }
}

module.exports = {
    accessToken,
    jsApiTicket
};