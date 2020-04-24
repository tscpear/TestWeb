const { override, fixBabelImports, addLessLoader } = require('customize-cra');

//  module.exports = function override(config, env) {
//    // do stuff with the webpack config...
//    return config;
//  };
 module.exports = override(
     //根据import来打包（使用babel-plugin-import）
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,//自动打包相关的样式
   }),
   addLessLoader({
       javascriptEnabled: true,
     }),
 );