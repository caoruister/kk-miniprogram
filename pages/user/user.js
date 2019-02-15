var common = require('../../utils/common.js')
const App = getApp()

Page({
  data: {
    options: {},
    list: [],
    userInfo: {}
  },
  onLoad(options) {
    // console.log(options);

    this.setData({
      options: options
    });
  },
  onShow: function() {
    var token = wx.getStorageSync('__token__');
    if (token == null || token == '') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      this.getData(token);
    }
  },
  getData: function(token) {
    var url = common.URP_PREFIX + 'my?op=getMy';
    var oThis = this;
    wx.request({
      url: url,
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        token: token
      },
      success: function(response) {
        // console.log(response)
        let data = response.data;
        if (data.success) {
          
          oThis.setData({
            list: data.list,
            userInfo: data.userInfo
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
      fail: function(response) {
        console.error(response)
      }
    })
  },
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出吗？',
      success: function(response) {
        if (response.confirm) {
          wx.setStorageSync('__token__', '')
          wx.setStorageSync('__token__userName', '')
          wx.redirectTo({
            url: '../../pages/login/login'
          })
        }
      },
    })
  },
})