/*
 * @Description: test env config
 * @Author: 王占领
 * @Date: 2021-08-12 15:57:44
 * @LastEditTime: 2021-09-17 13:43:07
 * @LastEditors: 王占领
 * @FilePath: \web-ccs\server\config\config.test.js
 */
"use strict";

module.exports = () => {
   const config = {};

   config.nunjucks = {
      cache: false
   };

   config.static = {
      maxAge: 0,
      buffer: false
   };

   // 后端配置
   config.backEnd = {
      gatewayUrl: process.env.GATEWAY_URL || "http://172.20.72.111:31559/"
   };

   return config;
};
