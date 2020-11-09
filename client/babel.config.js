module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // debug: true,
        modules: false,
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          browsers: ['defaults', 'ie >= 9']
        }
      }
    ],
    '@vue/babel-preset-jsx'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    'lodash'
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs', 'dynamic-import-node'],
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
    }
  }
}
