var common = require('../../utils/common.js')
var app = getApp()

function Base64() {
  // private property
  this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = this._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
  }

  // private method for UTF-8 encoding
  this._utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }
}

Page({
  data: {
    username: 'zs',
    password: '1',
  },
  bindUsername: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  bindPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function (e) {
    var username = this.data.username;
    var password = this.data.password;
    if (username == null || username === '') {
      common.alert('请输入用户名');
      return;
    }
    if (password == null || password === '') {
      common.alert('请输入密码');
      return;
    }
    username = username.toString();
    password = password.toString();
    //
    var base64 = new Base64();
    var username0 = base64.encode(base64.encode(base64.encode(username) + base64.encode(username) + base64.encode(username) + base64.encode(username) + base64.encode(username)));
    var password0 = base64.encode(base64.encode(password + password + password + password + password + password + password));
    var str1 = base64.encode(username0);
    var str2 = base64.encode(password0);

    var info = {
      str1: str1,
      str2: str2
    };
    info = base64.encode(base64.encode(JSON.stringify(info)));

    var url = common.URP_PREFIX + 'login?op=login';
    wx.request({
      url: url,
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        info: info,
      },
      success: function (response) {
        console.log(response)
        if (response.data && response.data.success) {
          wx.setStorageSync('__token__', response.data.token)
          wx.setStorageSync('__token__userName', response.data.name)
          wx.switchTab({
            url: '../../pages/home/home'
          })
        } else {
          common.alert(response.data.msg);
        }
      },
      fail: function (response) {
        common.alert(JSON.stringify(response));
        console.log(response)
      }
    })
  }
})
