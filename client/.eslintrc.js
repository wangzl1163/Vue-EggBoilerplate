// https://eslint.org/docs/user-guide/configuring

const path = require('path')

module.exports = {
   root: true,
   extends: [
      'eslint:recommended',
      'standard',
      'plugin:vue/recommended',
      'plugin:import/errors', // 配置eslint-plugin-import
      'plugin:import/warnings', // 配置eslint-plugin-import
      'plugin:node/recommended', // 配置eslint-plugin-node
      'plugin:promise/recommended', // 配置eslint-plugin-promise
      'prettier' // 需要放在最后，以便覆盖其他配置
   ],
   plugins: ['@babel'],
   rules: {
      'node/no-unsupported-features/es-syntax': 'off',
      'vue/no-async-in-computed-properties': 'off',
      'vue/max-attributes-per-line': 'off', // 关闭Vue，使用prettier自动根据行宽判断
      'vue/html-self-closing': [
         'error',
         {
            html: {
               void: 'any'
            }
         }
      ],
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-indent': 'off',
      'vue/singleline-html-element-content-newline': 'off'
   },
   env: {
      browser: true,
      node: true,
      es6: true // 使eslint支持es6语法
   },
   parser: 'vue-eslint-parser', // eslint-plugin-vue需要此配置，参考：https://eslint.vuejs.org/user-guide/#usage
   parserOptions: {
      parser: '@babel/eslint-parser', // 配置使用@babel/eslint-parser，参考：https://eslint.vuejs.org/user-guide/#usage，其中的babel-eslint已经改为babel内置的@babel/eslint-parser
      sourceType: "module",
      ecmaVersion: 2020,
      babelOptions: {
         configFile: path.join(__dirname, '/babel.config.js')
      }
   }
}
