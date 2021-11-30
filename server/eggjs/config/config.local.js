"use strict";

const webpackConfig = require("../../../client/build/webpack.dev.conf");

module.exports = () => {
   const config = {};

   config.view = {
      cache: false
   };

   // 配置开发模式需要的中间件，数组顺序即为中间件的加载顺序
   config.middleware = ["webpack"];

   // 配置webpack中间件，见middleware文件夹下webpack.js
   // 参数参考：https://github.com/shellscape/koa-webpack
   config.webpack = {
      enable: true,
      config: webpackConfig,
      devMiddleware: {
         publicPath: "/public/",
         serverSideRender: true
      },
      hotClient: {}
   };

   config.cluster = {
      listen: {
         port: 9001,
         hostname: "0.0.0.0"
      }
   };

   config.logger = {
      level: "ERROR",
      consoleLevel: "ERROR"
   };

   return config;
};
