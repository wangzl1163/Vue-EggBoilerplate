// https://eslint.org/docs/user-guide/configuring

const path = require('path')

module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/recommended',
    'plugin:import/errors', // 配置eslint-plugin-import
    'plugin:import/warnings', // 配置eslint-plugin-import
    'plugin:node/recommended', // 配置eslint-plugin-node
    'plugin:promise/recommended', // 配置eslint-plugin-promise
    'prettier',
  ],
  plugins: ['standard', 'promise', '@babel'],
  rules: {
    'vue/no-async-in-computed-properties': 'off',
    'vue/max-attributes-per-line': 'off' , // 关闭Vue，使用prettier自动根据行宽判断
    'vue/html-self-closing':["error",{
      'html':{
        'void':'any'
      }
    }],
    'vue/html-closing-bracket-newline':'off',
    'vue/html-indent':'off',
    'vue/singleline-html-element-content-newline':'off'
  },
  env: {
    browser: true,
    node: true
  },
  parser: "vue-eslint-parser", // eslint-plugin-vue需要此配置，参考：https://eslint.vuejs.org/user-guide/#usage
  parserOptions: {
    parser: '@babel/eslint-parser', // 配置使用@babel/eslint-parser，参考：https://eslint.vuejs.org/user-guide/#usage，其中的babel-eslint已经改为babel内置的@babel/eslint-parser
    ecmaVersion: 2021,
    babelOptions: {
      // 指定babel配置文件路径，解决了找不到babel配置文件问题
      // 参考：https://www.npmjs.com/package/@babel/eslint-parser的“Additional parser configuration”节
      configFile: path.join(__dirname, "/babel.config.js")
    }
  },
  root: true
}
