module.exports = {
   presets: [
     [
       '@babel/preset-env',
       {
         modules: false,
         useBuiltIns: 'entry',
         corejs: { version: 3, proposals: true }
       }
     ],
     '@vue/babel-preset-jsx'
   ],
   plugins: [
     '@babel/plugin-transform-runtime',
     '@babel/plugin-syntax-dynamic-import',
     '@babel/plugin-syntax-import-meta',
     '@babel/plugin-syntax-jsx'
   ],
   env: {
     test: {
       plugins: [
          '@babel/plugin-transform-modules-commonjs', 'dynamic-import-node'
       ],
       presets: [[
          '@babel/preset-env', 
          { targets: { node: 'current' } }
       ]]
     }
   }
 }
 