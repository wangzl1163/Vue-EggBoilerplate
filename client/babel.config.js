module.exports = {
   presets: [
     [
       '@babel/preset-env',
       {
         modules: false,
         useBuiltIns: 'entry',
         corejs: { 
           version: '3.11.1',
           proposals: true
         }
       }
     ],
     '@vue/babel-preset-jsx'
   ],
   plugins: [
     '@babel/plugin-transform-runtime',
     '@babel/plugin-syntax-dynamic-import',
     '@babel/plugin-syntax-import-meta',
     '@babel/plugin-syntax-jsx',
     [
        '@babel/plugin-proposal-decorators', 
        {
          decoratorsBeforeExport: true
        }
     ],
     '@babel/plugin-proposal-function-sent',
     '@babel/plugin-proposal-throw-expressions'
   ],
   env: {
     test: {
       plugins: [
         'dynamic-import-node'
       ],
       presets: [
         [
           '@babel/preset-env', 
           { targets: { node: 'current' } }
         ]
      ]
     }
   }
 }
 