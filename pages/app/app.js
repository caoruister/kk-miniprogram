var common = require('../../utils/common.js')
const App = getApp()

Page({
  data: {
    apps: []
  },
  onShow() {
    var token = wx.getStorageSync('__token__');
    if (token == null || token == '') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      this.getAppData(token);
    }
  },
  getAppData: function (token) {
    var url = common.URP_PREFIX + 'app?op=getApps';
    var oThis = this;
    wx.request({
      url: url,
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        token: token,
      },
      success: function (response) {
        console.log(response)
        let data = response.data;
        if (data.success) {
          oThis.setData({
            apps: data.apps,
          })

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
        console.log(response)
      }
    })
  }
})
