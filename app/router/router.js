const router = require('koa-router')();
const check = require("../controller/check");
const jsApiConfig = require("../controller/jsApiConfig");

router.get("/wxReceive", check);
router.get("/wechat/jsApiConfig", jsApiConfig);

module.exports = router;