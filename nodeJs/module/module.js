/*
* builtinModule
* */
const builtin = require('module').builtinModules;
// console.log('builtinModules: %j', builtin);
/*
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: 'E:\\myProject\\myTools\\nodeJs\\module\\module.js',
  loaded: false,
  children: [],
  paths:
   [ 'E:\\myProject\\myTools\\nodeJs\\module\\node_modules',
     'E:\\myProject\\myTools\\nodeJs\\node_modules',
     'E:\\myProject\\myTools\\node_modules',
     'E:\\myProject\\node_modules',
     'E:\\node_modules' ] }
* */
console.log('module', module);