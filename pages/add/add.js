var common = require('../../utils/common.js')
var addButton = require('../../utils/add-button.js')
const App = getApp()

Page({
  data: {
    fieldValues: {}, // key - fieldid, value - value
    fieldOptions: {}, // key - fieldid, value - options
    objLabel: '',
    layoutid: '',
    sections: [],
    options: {}
  },
  onLoad(options) {
    // console.log(options);

    this.setData({
      options: options
    });
  },
  onShow() {
    var token = wx.getStorageSync('__token__');
    if ((token == null || token == '') && this.options.objid != 'register') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      this.getData(token);
    }
  },
  onReady() {
  },
  getData: function (token) {
    var url = common.URP_PREFIX + 'record?op=getLayoutForAdding';
    var oThis = this;
    wx.request({
      url: url,
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        token: token,
        objid: oThis.options.objid
      },
      success: function (response) {
        // console.log(response)
        let data = response.data;
        if (data.success) {
          let sections = data.sections;
          //
          let fieldValues = {}, fieldOptions = {};
          for (var i = 0; i < sections.length; i++) {
            let section = sections[i];
            let fields = section.fields;
            for (var k = 0; k < fields.length; k++) {
              let field = fields[k];
              
              fieldValues[field.fieldid] = field.value;
              if (field.type == "L") {
                fieldOptions[field.fieldid] = field.options;
              }
            }
          }
          //
          oThis.setData({
            objid: data.objid,
            objLabel: data.objLabel,
            layoutid: data.layoutid,
            sections: sections,
            fieldValues: fieldValues,
            fieldOptions: fieldOptions
          })

          wx.setNavigationBarTitle({
            title: "新增"+data.objLabel
          });
        } else {
          if (data.msg === '未登录') {
            wx.redirectTo({
              url: '../../pages/login/login'
            })
          } else {
            common.alert(data.msg);
          }
          return null;
        }
      },
      fail: function (response) {
        console.error(response)
      }
    })
  },
  bindField: function (e) {
    let id = e.target.id;
    let fieldValues = this.data.fieldValues;
    fieldValues[id] = e.detail.value;
    this.setData({
      fieldValues: fieldValues,
    })
  },
  bindSelectChange: function(e) {
    let id = e.target.id;
    let fieldValues = this.data.fieldValues;
    fieldValues[id] = e.detail.value;
    this.setData({
      fieldValues: fieldValues,
    })
  },
  save: function (e) {
    var token = wx.getStorageSync('__token__');
    if ((token == null || token == '') && this.data.options.objid != 'register') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      // console.log(this.data.fieldValues);
      let fieldValues = this.data.fieldValues;
      let data = {
        token: token,
        objid: this.data.objid,
        layoutid: this.data.layoutid
      };
      for (var key in fieldValues) {
        data[key] = fieldValues[key];
        if (this.data.fieldOptions[key] && data[key]) {
          data[key] = this.data.fieldOptions[key][data[key]].value;
        }
      }
      //
      var url = common.URP_PREFIX + 'record?op=saveRecord';
      var oThis = this;
      wx.request({
        url: url,
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: data,
        success: function (response) {
          // console.log(response)
          let data = response.data;
          if (data.success) {
            common.alert('保存成功', function(){
              wx.navigateBack({
                delta: 1
              });
            });
          } else {
            if (data.msg === '未登录') {
              wx.redirectTo({
                url: '../../pages/login/login'
              })
            } else {
              common.alert(data.msg);
            }
          }
        },
        fail: function (response) {
          console.error(response)
        }
      })
    }
  },
  add: function(event) {
    var methodName = event.target.dataset.methodName;
    if (methodName == 'add1') {
      addButton.add1(this);
    } else if (methodName == 'add2') {
      addButton.add2(this);
    } else if (methodName == 'add3') {
      addButton.add3(this);
    }
  }
})
