// pages/query/query.js
var common = require('../../utils/common.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray: [],
    showedFields: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    hasMoreData: true,
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync('__token__');
    if (token == null || token == '') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      this.loadInitData(token);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 
   */
  loadInitData: function (token) {
    var that = this
    var currentPage = 0; // 因为数组下标是从0开始的，所以这里用了0
    var tips = "加载第" + (currentPage + 1) + "页";
    wx.showLoading({
      title: tips,
    })
    // 刷新时，清空dataArray，防止新数据与原数据冲突
    that.setData({
      dataArray: []
    })
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    var url = common.URP_PREFIX + 'record?op=searchRecordsForLookupWindow';
    wx.request({
      url: url,
      data: {
        token: token,
        objid: that.options.objid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);

        var data = res.data.root; // 接口相应的json数据
        if (res.data.success) {
          var records = data.records; // 接口中的data对应了一个数组，这里取名为 records

          wx.setNavigationBarTitle({
            title: '请选择' + data.objLabel
          });

          var showedFields = data.showedFields;
          var recordsLength = records.length;
          var total = data.total;

          if (recordsLength < that.data.pageSize) {
            that.setData({
              ["dataArray[" + currentPage + "]"]: records,
              currentPage: data.current,
              total: total,
              showedFields: showedFields,
              hasMoreData: false
            })
          } else {
            that.setData({
              ["dataArray[" + currentPage + "]"]: records,
              currentPage: data.current,
              total: total,
              showedFields: showedFields,
              hasMoreData: true
            })
          }
        } else {
          if (data.msg === '未登录') {
            wx.redirectTo({
              url: '../../pages/login/login'
            })
          } else {
            common.alert(data.msg);
          }
        }
      }
    })
  },
  selectItem: function(event) {
    console.log(event.currentTarget.dataset.id);

    var token = wx.getStorageSync('__token__');
    if (token == null || token == '') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    }
    
    var url = common.URP_PREFIX + 'record?op=getlookupObjShowedFieldValue';
    var oThis = this;
    wx.request({
      url: url,
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        token: token,
        objid: oThis.options.objid,
        id: event.currentTarget.dataset.id,
        lookupObjShowedFieldid: oThis.options.lookupObjShowedFieldid,
      },
      success: function (res) {
        console.log(res)

        var data = res.data.root; // 接口相应的json数据
        if (res.data.success) {
          var pages = getCurrentPages();
          //获取上一个页面的page对象
          var prev = pages[pages.length - 2];   // 注意空索引校验
          //然后就可以通过操作当前页一样操作上一个页面的data对象了
          prev.setData({
            lookupObjShowedFieldid: oThis.options.lookupObjShowedFieldid,
            lookupObjShowedFieldValue: data.lookupObjShowedFieldValue
          });

          wx.navigateBack({
            delta: 1  // 返回上一级页面。
          })
        }
      },
      fail: function (response) {
        console.error(response);
      }
    })
  },
})