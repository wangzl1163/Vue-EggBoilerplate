// https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: ['plugin:vue/recommended', 'standard', 'prettier', 'prettier/standard'],
  plugins: ['vue', 'prettier', 'standard'],
  rules: {
    'prettier/prettier': ['error', {"tabWidth": 3}],
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
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    clearSelection: {
      jsx: true
    }
  },
  root: true
}
