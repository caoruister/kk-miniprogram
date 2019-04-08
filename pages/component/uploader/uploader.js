// pages/component/uploader.js
var common = require('../../../utils/common.js')
Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    //上传图片数量限制
    imageCount: {
      type: Number,
      value: 9
    },
    //上传标题
    headerTitle: {
      type: String,
      value: '图片上传'
    },
    //是否隐藏头部
    hideHeader: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    files: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 选择图片
     */
    chooseImage: function (e) {
      let that = this;
      wx.chooseImage({
        count: that.imageCount,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          if (that.data.files.length < 9) {
            that.setData({
              files: that.data.files.concat(res.tempFilePaths)
            });
          }
          let tempFilePaths = res.tempFilePaths
          for (let i = 0; i < tempFilePaths.length; i++) {
            common.uploadFile(tempFilePaths[i], (res) => {
              let myEventDetail = { dataSource: res }
              let myEventOption = {}
              that.triggerEvent('uploadSuccess', myEventDetail, myEventOption)
              console.log(res)
            }, (res) => {
              let myEventDetail = { dataSource: res }
              let myEventOption = {}
              that.triggerEvent('uploadFail', myEventDetail, myEventOption)
              console.log(res)
            })
          }
        }
      })
    },

    previewImage: function (e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
      })
    },
  }
})
