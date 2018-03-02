const Koa = require('koa');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaStatic = require("koa-static");

const router = require('./app/router/router');

const app = new Koa();

/**
 * @desc error handler
 * @desc 错误处理
 */
onerror(app);

/**
 * @desc 解析请求中的数据
 */
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));

/**
 * @desc response中间件，可以直接返回json
 * @example
 * app.use(function *(next){
 *     this.body = { foo: 'bar' };
 * })
 */
app.use(json());

/**
 * @desc 在console输出日志
 */
app.use(logger());

/**
 * @desc 配置静态资源目录
 */
app.use(koaStatic(__dirname + "/public"));

/**
 * @desc 配置路由
 */
app.use(router.routes(), router.allowedMethods());

module.exports = app;