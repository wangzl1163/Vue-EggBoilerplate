/*
 * @Description: build target type
 * @Author: 王占领
 * @Date: 2021-10-26 13:07:49
 * @LastEditTime: 2021-10-28 11:20:31
 * @LastEditors: 王占领
 * @FilePath: \web-ccs\client\build\targetOptions.js
 */

const util = require("./utils");

const getOption = (opt) => {
   return Object.assign(
      {
         outputPath: util.resolvePath("../dist"),
         publicPath: "/public/",
         externals: {},
         htmlWebpackPlugin: {},
         copyWebpackPlugin: {}
      },
      opt
   );
};

const target = {
   nginx: {
      nginx: "nginx",
      ...getOption({
         outputPath: util.resolvePath("../../server/nginx/app"),
         publicPath: "/",
         htmlWebpackPlugin: {
            template: util.resolvePath("../public/index.html")
         },
         copyWebpackPlugin: {
            patterns: [
               {
                  from: util.resolvePath("../public"),
                  globOptions: {
                     ignore: ["index.html"]
                  }
               }
            ]
         }
      })
   },
   egg: {
      egg: "egg",
      ...getOption({
         outputPath: util.resolvePath("../../server/eggjs/app/public"),
         externals: {
            vue: "Vue",
            "vue-router": "VueRouter"
         },
         htmlWebpackPlugin: {
            filename: util.resolvePath("../dist/webpackBundle.html")
         },
         copyWebpackPlugin: {
            patterns: [
               {
                  from: util.resolvePath("../public"),
                  globOptions: {
                     ignore: [".*"]
                  }
               }
            ]
         }
      })
   }
};

module.exports = target;
