var common = require('../../utils/common.js')
var app = getApp()

Page({
  data: {
    dataArray: [],
    showedFields: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    hasMoreData: true,
    options: {},
    canAnd: false
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      var token = wx.getStorageSync('__token__');
      if (token == null || token == '') {
        wx.redirectTo({
          url: '../../pages/login/login'
        })
      } else {
        this.loadMoreData(token);
      }
    }
  },
  onLoad(options) {
    // console.log(options);
    
    this.setData({
      options: options
    });
  },
  onShow() {
    var token = wx.getStorageSync('__token__');
    if (token == null || token == '') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      this.loadInitData(token);
    }
  },
  onReady() {
  },
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
    var url = common.URP_PREFIX + 'record?op=searchRecords';
    wx.request({
      url: url,
      data: {
        token: token,
        objid: that.options.objid,
        notNeedLogin: that.options.notNeedLogin
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.hideLoading();
        // console.log(res);

        if (res.data.success) {
          var data = res.data.root;// 接口相应的json数据
          var records = data.records; // 接口中的data对应了一个数组，这里取名为 records

          var title = null;
          if (that.options.title != null && that.options.title != '') {
            title = that.options.title;
          } else {
            title = data.tabLabel;
          }
          wx.setNavigationBarTitle({
            title: title
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
              hasMoreData: false,
              canAdd: data.canAdd
            })
          } else {
            that.setData({
              ["dataArray[" + currentPage + "]"]: records,
              currentPage: data.current,
              total: total,
              showedFields: showedFields,
              hasMoreData: true,
              canAdd: data.canAdd
            })
          }
        } else {

          if (res.data.msg === '未登录') {
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
  loadMoreData: function (token, options) {
    var that = this;
    var currentPage = that.data.currentPage; // 获取当前页码
    var tips = "加载第" + (currentPage + 1) + "页";
    wx.showLoading({
      title: tips,
    })
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    var url = common.URP_PREFIX + 'record?op=searchRecords&objid=' + that.options.objid;
    wx.request({
      url: url,
      data: {
        token: token,
        current: that.data.currentPage + 1,
        pageSize: that.data.pageSize,
        filterForMember: that.options.filterForMember
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.hideLoading();
        var data = res.data.root; // 接口相应的json数据

        if (res.data.success) {
          var records = data.records; // 接口中的data对应了一个数组，这里取名为 records
          var showedFields = data.showedFields;
          var recordsLength = records.length;
          var total = data.total;

          if (recordsLength < that.data.pageSize) {
            // 直接将新一页的数据添加到数组里
            that.setData({
              ["dataArray[" + currentPage + "]"]: records,
              currentPage: data.current,
              total: total,
              showedFields: showedFields,
              hasMoreData: false,
              canAdd: data.canAdd
            })
          } else {
            that.setData({
              ["dataArray[" + currentPage + "]"]: records,
              currentPage: data.current,
              total: total,
              showedFields: showedFields,
              hasMoreData: true,
              canAdd: data.canAdd
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
  addRecord: function(){
    wx.navigateTo({
      url: '../../pages/add/add'
    })
  }
})