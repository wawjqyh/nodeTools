const router = require('koa-router')();
const check = require("../controller/check");
const jsApiConfig = require("../controller/jsApiConfig");

const getImg = require("../controller/getImg");

router.get("/wxReceive", check);
router.get("/wechat/jsApiConfig", jsApiConfig);

router.get("/wechat/getImg",getImg);

module.exports = router;