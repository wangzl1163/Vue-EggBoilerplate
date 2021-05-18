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
      'node/no-missing-import': 'off',
      // 忽略webpack中设置的路径解析别名，以避免eslint无法识别而报错
      "import/no-unresolved": ['error', { "ignore": ["@/*"] }],
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
      es2021: true // 使eslint支持es6(2021年)语法
   },
   parser: 'vue-eslint-parser', // eslint-plugin-vue需要此配置，参考：https://eslint.vuejs.org/user-guide/#usage
   parserOptions: {
      // 配置使用@babel/eslint-parser，参考：https://eslint.vuejs.org/user-guide/#usage，其中的babel-eslint已经改为babel内置的@babel/eslint-parser
      parser: '@babel/eslint-parser',
      // 不显式配置sourceType: "module"，会报错：'import' and 'export' may appear only with 'sourceType: "module"'
      sourceType: 'module',
      ecmaVersion: 2021,
      babelOptions: {
         // 指定babel配置文件路径，解决了找不到babel配置文件问题
         // 参考：https://www.npmjs.com/package/@babel/eslint-parser的“Additional parser configuration”节
         configFile: path.join(__dirname, '/babel.config.js')
      }
   }
}
