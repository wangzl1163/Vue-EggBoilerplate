/*
 * @Description: eslint config
 * @Author: 王占领
 * @Date: 2021-06-07 09:52:39
 * @LastEditTime: 2021-10-14 15:11:26
 * @LastEditors: 王占领
 * @FilePath: \web-ccs\server\.eslintrc.js
 */
// https://eslint.org/docs/user-guide/configuring
"use strict";

module.exports = {
   extends: ["eslint-config-egg", "prettier"],
   plugins: ["prettier"],
   rules: {
      "node/no-new-require": "off",
      "prettier/prettier": [
         "error",
         {
            tabWidth: 3,
            printWidth: 80,
            trailingComma: "none",
            endOfLine: "auto"
         }
      ]
   },
   env: {
      node: true
   }
};
