/*
 * @Description: site file
 * @Author: 王占领
 * @Date: 2021-08-27 11:24:36
 * @LastEditTime: 2021-11-05 11:22:47
 * @LastEditors: 王占领
 * @FilePath: \web-ccs\server\eggjs\config\siteFile.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
   "/favicon.ico": fs.readFileSync(path.join(__dirname, "../favicon.ico")),
   "/site/vue.min.js": fs.readFileSync(
      path.join(__dirname, "../siteFile/vue.min.js")
   ),
   "/site/vue.js": fs.readFileSync(
      path.join(__dirname, "../siteFile/vue.js")
   ),
   "/site/vue-router.min.js": fs.readFileSync(
      path.join(__dirname, "../siteFile/vue-router.min.js")
   ),
   "/site/vue-router.js": fs.readFileSync(
      path.join(__dirname, "../siteFile/vue-router.js")
   )
};
