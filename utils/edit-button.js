'use strict';
const common = require('common.js')

var edit1 = function (pageInstance) {
  console.log('edit1');
}

var edit2 = function (pageInstance) {
  console.log('edit2');
}

var edit3 = function (pageInstance) {
  console.log('edit3');
}

module.exports = {
  edit1: edit1,
  edit2: edit2,
  edit3: edit3
};