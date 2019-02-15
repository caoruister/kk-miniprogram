'use strict';
const common = require('common.js')

var view1 = function (pageInstance) {
  console.log('view1');
}

var view2 = function (pageInstance) {
  console.log('view2');
}

var view3 = function (pageInstance) {
  console.log('view3');
}

module.exports = {
  view1: view1,
  view2: view2,
  view3: view3
};