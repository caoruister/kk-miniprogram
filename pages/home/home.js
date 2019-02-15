var common = require('../../utils/common.js')
const App = getApp()

Page({
  data: {
    items: [],
    title: ''
  },
  onLoad(options) {
    // console.log(options);
  },
  onShow() {
    var token = wx.getStorageSync('__token__');
    if (token == null || token == '') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      this.getData(token);
    }
  },
  getData: function (token) {
    var url = common.URP_PREFIX + 'page?op=getPage&pageName=HOME';
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
        // console.log(response);
        let data = response.data;
        if (data.success) {
          oThis.setData({
            items: data.items,
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
        console.error(response);
      }
    })
  }
})
