'use strict';

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var alert = (content, callback) => {
  wx.hideToast();
  if (content != null) {
    var typeof0 = (typeof content);
    if (typeof0 === 'String') {
      content = content;
    } else if (typeof0 === 'Object') {
      content = JSON.stringify(content);
    }
  }
  wx.showModal({
    title: '提示',
    content: (content == null ? '' : content.toString()),
    showCancel: false,
    success(res) {
      if (res.confirm) {
        callback && callback();
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

var setFieldValue = function (fieldName, value, pageInstance) {
  var sections = pageInstance.data.sections;
  for (var i = 0; i < sections.length; i++) {
    let section = sections[i];
    let fields = section.fields;
    for (var k = 0; k < fields.length; k++) {
      let field = fields[k];

      if (field.name == fieldName) {
        field.value = value;
        pageInstance.setData({
          sections: sections
        });
      }
    }
  }
}

var getFieldValue = function (fieldName, pageInstance) {
  var sections = pageInstance.data.sections;
  for (var i = 0; i < sections.length; i++) {
    let section = sections[i];
    let fields = section.fields;
    for (var k = 0; k < fields.length; k++) {
      let field = fields[k];

      if (field.name == fieldName) {
        return field.value || '';
      }
    }
  }
}

module.exports = {
  // URP_PREFIX: 'http://192.168.15.154:8080/xcx2c/',
  // URP_PREFIX: 'https://xcx-dev-1.xhx2018.cn:8443/xcx2c/',
  URP_PREFIX: 'http://192.168.15.156:8080/xcx2c/',
  FILE_URL_PREFIX: 'http://192.168.15.156:8080/file/',
  showSuccess: showSuccess,
  alert: alert,
  setFieldValue: setFieldValue,
  getFieldValue: getFieldValue
}