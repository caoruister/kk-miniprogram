'use strict';

// URP_PREFIX: 'http://192.168.15.154:8080/xcx2c/',
// URP_PREFIX: 'https://xcx-dev-1.xhx2018.cn:8443/xcx2c/',
// var URP_PREFIX = 'http://192.168.3.43:8080/xcx2c/';
// var FILE_URL_PREFIX = 'http://192.168.3.43:8080/file/';

var URP_PREFIX = 'https://kkdev.kz-info.cn:9243/kkdev-xcx2c/';
var FILE_URL_PREFIX = 'https://kkdev.kz-info.cn:9243/kkdev-file/';

// 显示成功提示
var showSuccess = (content, callback) => { 
  wx.showToast({
    title: content,
    icon: 'success',
    duration: 2000,
    mask: true,
    success: function() {
      callback && callback();
    }
  })
}

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
        console.log(value);
        if (field.type == 'Y') {
          field.value2 = (value != null ? value.name : null);
        }  else if (field.type == 'IMG') {
          let tempValue = JSON.parse(value);
          //
          if (tempValue.length > 0) {
            let temp = tempValue[0];
            let item = null;
            if (typeof (temp) == 'string') {
              item = JSON.parse(temp);
            } else {
              item = temp;
            }
            //
            let thumbnail_url = FILE_URL_PREFIX + item.thumbnail_url;
            field.thumbnail_url = thumbnail_url;
          }
        }
        //
        field.value = value;
        //
        let fieldValues = pageInstance.data.fieldValues;
        fieldValues[field.fieldid] = value;
        //
        pageInstance.setData({
          fieldValues: fieldValues,
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
        let fieldValues = pageInstance.data.fieldValues;
        return fieldValues[field.fieldid]; // field.value || '';
      }
    }
  }
}

var checkField = function (pageInstance) {
  var sections = pageInstance.data.sections;
  for (var i = 0; i < sections.length; i++) {
    let section = sections[i];
    let fields = section.fields;
    for (var k = 0; k < fields.length; k++) {
      let field = fields[k];

      if (field.required && !!!field.value) {
        this.alert(field.label + '不能为空');
        return false;
      }
    }
  }
  return true;
}

var callInterface = function (apiName, data, callbackWhenSuccess) {
  if (apiName == null || apiName == '') {
    alert('参数apiName取值为空');
    return;
  }
  //
  var token = wx.getStorageSync('__token__');
  let newData = {
    apiName: apiName,
    token: token,
  };
  if (data != null && typeof (data) == 'object') {
    for (var key in data) {
      newData[key] = data[key];
    }
  }

  var url = URP_PREFIX + 'callInterface';
  var oThis = this;
  wx.request({
    url: url,
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: newData,
    success: function (response) {
      console.log(response)
      let data = response.data;
      if (data.msg === '未登录') {
        wx.redirectTo({
          url: '../../pages/login/login'
        })
        return;
      }
      if (callbackWhenSuccess != null) {
        callbackWhenSuccess(data);
      }
    },
    fail: function (response) {
      console.error(response);
    }
  })
}

var uploadFile = (tempFilePath, success, fail) => {
  let filename = tempFilePath.substr(tempFilePath.lastIndexOf('/') + 1);
  let url = FILE_URL_PREFIX + 'file';
  console.log("上传信息" + JSON.stringify({ "url": url, "tempFilePath": tempFilePath, "filename": filename }))
  wx.uploadFile({
    url: url,
    filePath: tempFilePath,
    name: 'Filedata',
    formData: {
    },
    success: function (res) {
      success && success(res)
    },
    fail: function (res) {
      fail && fail(res)
    }
  })
}

module.exports = {
  URP_PREFIX: URP_PREFIX,
  FILE_URL_PREFIX: FILE_URL_PREFIX,
  showSuccess: showSuccess,
  alert: alert,
  setFieldValue: setFieldValue,
  getFieldValue: getFieldValue,
  callInterface: callInterface,
  uploadFile: uploadFile,
  checkField: checkField
}