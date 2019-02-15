'use strict';
const common = require('common.js')

var add1 = function(pageInstance) {
  var value = common.getFieldValue('mc', pageInstance);
  // console.log(value);
  // common.setFieldValue('mc', '姓名', pageInstance);

  wx.navigateTo({
    url: '/pages/dynamic/dynamic1?id=1'
  })
}

var add2 = function (pageInstance) {
  console.log('add2');
}

var add3 = function (pageInstance) {
  console.log('add3');
}

module.exports = {
  add1: add1,
  add2: add2,
  add3: add3
};