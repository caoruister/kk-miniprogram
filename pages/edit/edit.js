var common = require('../../utils/common.js')
var onClicks = require('../../utils/button.js')
var onLoadOfPages = require('../../utils/page.js')

const App = getApp()

Page({
  data: {
    fieldValues: {}, // key - fieldid, value - value
    fieldOptions: {}, // key - fieldid, value - options
    objLabel: '',
    layoutid: '',
    id: '',
    buttons: [],
    sections: [],
    options: {}
  },
  onLoad(options) {
    let oThis = this;
    //
    this.setFieldValue = function (fieldName, value) {
      common.setFieldValue(fieldName, value, oThis);
    }

    this.getFieldValue = function (fieldName) {
      return common.getFieldValue(fieldName, oThis);
    }

    this.setData({
      options: options
    });

    var token = wx.getStorageSync('__token__');
    if (token == null || token == '') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      this.getData(token, options);
    }
  },
  onShow() {
    
  },
  getData: function (token, options) {
    var url = common.URP_PREFIX + 'record?op=getLayoutForEditing';
    var oThis = this;
    wx.request({
      url: url,
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        token: token,
        objid: options.objid,
        layoutid: options.layoutid,
        id: options.id
      },
      success: function (response) {
        // console.log(response)
        let data = response.data;
        if (data.success) {
          let buttons = data.buttons;
          let sections = data.sections;
          let onLoadMethodName = data.onLoadMethodName;
          //
          let fieldValues = {}, fieldOptions = {};
          for (var i = 0; i < sections.length; i++) {
            let section = sections[i];
            let fields = section.fields;
            for (var k = 0; k < fields.length; k++) {
              let field = fields[k];

              fieldValues[field.fieldid] = field.value;
              if (field.type == "L") {
                for (var j in field.options) {
                  if (field.options[j].value == field.value) {
                    fieldValues[field.fieldid] = j;
                  }
                } 

                fieldOptions[field.fieldid] = field.options;
              } else if (field.type == "IMG") {
                /*
                if (field.value != null && field.value != '') {
                  let tempValue = JSON.parse(field.value);
                  console.log(tempValue);
                  //
                  if (tempValue.length > 0) {
                    let temp = tempValue[0];
                    console.log(temp);
                    let item = null;
                    if (typeof (temp) == 'string') {
                      item = JSON.parse(temp);
                    } else {
                      item = temp;
                    }
                    //
                    let thumbnail_url = common.FILE_URL_PREFIX + item.thumbnail_url;
                    console.log(thumbnail_url);
                    field.thumbnail_url = thumbnail_url;
                  }
                }*/
              }
            }
          }
          // console.log(fieldValues);
          //
          oThis.setData({
            objid: data.objid,
            objLabel: data.objLabel,
            layoutid: data.layoutid,
            id: data.id,
            buttons: buttons,
            sections: sections,
            fieldValues: fieldValues,
            fieldOptions: fieldOptions
          })

          let title = "编辑" + data.objLabel;
          if (options.title != null && options.title != '') {
            title = options.title;
          } else {
            if (options.showLayoutName == 'true') {
              if (data.layoutName != null && data.layoutName != '') {
                title = data.layoutName;
              }
            }
          }
          wx.setNavigationBarTitle({
            title: title
          });

          console.log(onLoadMethodName);
          if (onLoadMethodName != null && onLoadMethodName != '') {
            oThis.onLoadOfPage(onLoadMethodName, oThis);
          }
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
  },
  bindField: function (e) {
    /*let id = e.target.id;
    let fieldValues = this.data.fieldValues;
    fieldValues[id] = e.detail.value;
    this.setData({
      fieldValues: fieldValues,
    })*/
    common.setFieldValue(e.target.dataset.name, e.detail.value, this);
  },
  save: function (e) {
    var token = wx.getStorageSync('__token__');
    if (token == null || token == '') {
      wx.redirectTo({
        url: '../../pages/login/login'
      })
    } else {
      // console.log(this.data.fieldValues);

      //check required
      if (!common.checkField(this)) {
        return;
      }

      let fieldValues = this.data.fieldValues;
      let data = {
        token: token,
        objid: this.data.objid,
        layoutid: this.data.layoutid,
        id: this.data.id
      };
      for (var key in fieldValues) {
        data[key] = fieldValues[key];
        if (this.data.fieldOptions[key]) {
          let temp = this.data.fieldOptions[key][data[key]];
          if (temp != null) {
            data[key] = temp.value;
          }
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
            common.showSuccess('保存成功', function(){
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
  chooseImage: function (e) {
    let name = e.target.dataset.name;
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        var orgid = wx.getStorageSync('__orgid__');
        wx.uploadFile({
          url: common.FILE_URL_PREFIX + 'file', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            orgid: orgid
          },
          success(res) {
            const data = res.data
            // do something
            common.setFieldValue(name, data, _this);
          }
        })
      }
    })
  },
  onClickOfButton: function (event) {
    var methodName = event.target.dataset.methodName;
    if (methodName == 'onClick1') {
      onClicks.onClick1(this);
    } else if (methodName == 'onClick2') {
      onClicks.onClick2(this);
    } else if (methodName == 'onClick3') {
      onClicks.onClick3(this);
    } else if (methodName == 'onClick4') {
      onClicks.onClick4(this);
    } else if (methodName == 'onClick5') {
      onClicks.onClick5(this);
    } else if (methodName == 'onClick6') {
      onClicks.onClick6(this);
    } else if (methodName == 'onClick7') {
      onClicks.onClick7(this);
    } else if (methodName == 'onClick8') {
      onClicks.onClick8(this);
    } else if (methodName == 'onClick9') {
      onClicks.onClick9(this);
    } else if (methodName == 'onClick10') {
      onClicks.onClick10(this);
    } else if (methodName == 'onClick11') {
      onClicks.onClick11(this);
    } else if (methodName == 'onClick12') {
      onClicks.onClick12(this);
    } else if (methodName == 'onClick13') {
      onClicks.onClick13(this);
    } else if (methodName == 'onClick14') {
      onClicks.onClick14(this);
    } else if (methodName == 'onClick15') {
      onClicks.onClick15(this);
    } else if (methodName == 'onClick16') {
      onClicks.onClick16(this);
    } else if (methodName == 'onClick17') {
      onClicks.onClick17(this);
    } else if (methodName == 'onClick18') {
      onClicks.onClick18(this);
    } else if (methodName == 'onClick19') {
      onClicks.onClick19(this);
    } else if (methodName == 'onClick20') {
      onClicks.onClick20(this);
    } else if (methodName == 'onClick21') {
      onClicks.onClick21(this);
    } else if (methodName == 'onClick22') {
      onClicks.onClick22(this);
    } else if (methodName == 'onClick23') {
      onClicks.onClick23(this);
    } else if (methodName == 'onClick24') {
      onClicks.onClick24(this);
    } else if (methodName == 'onClick25') {
      onClicks.onClick25(this);
    } else if (methodName == 'onClick26') {
      onClicks.onClick26(this);
    } else if (methodName == 'onClick27') {
      onClicks.onClick27(this);
    } else if (methodName == 'onClick28') {
      onClicks.onClick28(this);
    } else if (methodName == 'onClick29') {
      onClicks.onClick29(this);
    } else if (methodName == 'onClick30') {
      onClicks.onClick30(this);
    } else if (methodName == 'onClick31') {
      onClicks.onClick31(this);
    } else if (methodName == 'onClick32') {
      onClicks.onClick32(this);
    } else if (methodName == 'onClick33') {
      onClicks.onClick33(this);
    } else if (methodName == 'onClick34') {
      onClicks.onClick34(this);
    } else if (methodName == 'onClick35') {
      onClicks.onClick35(this);
    } else if (methodName == 'onClick36') {
      onClicks.onClick36(this);
    } else if (methodName == 'onClick37') {
      onClicks.onClick37(this);
    } else if (methodName == 'onClick38') {
      onClicks.onClick38(this);
    } else if (methodName == 'onClick39') {
      onClicks.onClick39(this);
    } else if (methodName == 'onClick40') {
      onClicks.onClick40(this);
    } else if (methodName == 'onClick41') {
      onClicks.onClick41(this);
    } else if (methodName == 'onClick42') {
      onClicks.onClick42(this);
    } else if (methodName == 'onClick43') {
      onClicks.onClick43(this);
    } else if (methodName == 'onClick44') {
      onClicks.onClick44(this);
    } else if (methodName == 'onClick45') {
      onClicks.onClick45(this);
    } else if (methodName == 'onClick46') {
      onClicks.onClick46(this);
    } else if (methodName == 'onClick47') {
      onClicks.onClick47(this);
    } else if (methodName == 'onClick48') {
      onClicks.onClick48(this);
    } else if (methodName == 'onClick49') {
      onClicks.onClick49(this);
    } else if (methodName == 'onClick50') {
      onClicks.onClick50(this);
    } else if (methodName == 'onClick51') {
      onClicks.onClick51(this);
    } else if (methodName == 'onClick52') {
      onClicks.onClick52(this);
    } else if (methodName == 'onClick53') {
      onClicks.onClick53(this);
    } else if (methodName == 'onClick54') {
      onClicks.onClick54(this);
    } else if (methodName == 'onClick55') {
      onClicks.onClick55(this);
    } else if (methodName == 'onClick56') {
      onClicks.onClick56(this);
    } else if (methodName == 'onClick57') {
      onClicks.onClick57(this);
    } else if (methodName == 'onClick58') {
      onClicks.onClick58(this);
    } else if (methodName == 'onClick59') {
      onClicks.onClick59(this);
    } else if (methodName == 'onClick60') {
      onClicks.onClick60(this);
    } else if (methodName == 'onClick61') {
      onClicks.onClick61(this);
    } else if (methodName == 'onClick62') {
      onClicks.onClick62(this);
    } else if (methodName == 'onClick63') {
      onClicks.onClick63(this);
    } else if (methodName == 'onClick64') {
      onClicks.onClick64(this);
    } else if (methodName == 'onClick65') {
      onClicks.onClick65(this);
    } else if (methodName == 'onClick66') {
      onClicks.onClick66(this);
    } else if (methodName == 'onClick67') {
      onClicks.onClick67(this);
    } else if (methodName == 'onClick68') {
      onClicks.onClick68(this);
    } else if (methodName == 'onClick69') {
      onClicks.onClick69(this);
    } else if (methodName == 'onClick70') {
      onClicks.onClick70(this);
    } else if (methodName == 'onClick71') {
      onClicks.onClick71(this);
    } else if (methodName == 'onClick72') {
      onClicks.onClick72(this);
    } else if (methodName == 'onClick73') {
      onClicks.onClick73(this);
    } else if (methodName == 'onClick74') {
      onClicks.onClick74(this);
    } else if (methodName == 'onClick75') {
      onClicks.onClick75(this);
    } else if (methodName == 'onClick76') {
      onClicks.onClick76(this);
    } else if (methodName == 'onClick77') {
      onClicks.onClick77(this);
    } else if (methodName == 'onClick78') {
      onClicks.onClick78(this);
    } else if (methodName == 'onClick79') {
      onClicks.onClick79(this);
    } else if (methodName == 'onClick80') {
      onClicks.onClick80(this);
    } else if (methodName == 'onClick81') {
      onClicks.onClick81(this);
    } else if (methodName == 'onClick82') {
      onClicks.onClick82(this);
    } else if (methodName == 'onClick83') {
      onClicks.onClick83(this);
    } else if (methodName == 'onClick84') {
      onClicks.onClick84(this);
    } else if (methodName == 'onClick85') {
      onClicks.onClick85(this);
    } else if (methodName == 'onClick86') {
      onClicks.onClick86(this);
    } else if (methodName == 'onClick87') {
      onClicks.onClick87(this);
    } else if (methodName == 'onClick88') {
      onClicks.onClick88(this);
    } else if (methodName == 'onClick89') {
      onClicks.onClick89(this);
    } else if (methodName == 'onClick90') {
      onClicks.onClick90(this);
    } else if (methodName == 'onClick91') {
      onClicks.onClick91(this);
    } else if (methodName == 'onClick92') {
      onClicks.onClick92(this);
    } else if (methodName == 'onClick93') {
      onClicks.onClick93(this);
    } else if (methodName == 'onClick94') {
      onClicks.onClick94(this);
    } else if (methodName == 'onClick95') {
      onClicks.onClick95(this);
    } else if (methodName == 'onClick96') {
      onClicks.onClick96(this);
    } else if (methodName == 'onClick97') {
      onClicks.onClick97(this);
    } else if (methodName == 'onClick98') {
      onClicks.onClick98(this);
    } else if (methodName == 'onClick99') {
      onClicks.onClick99(this);
    } else if (methodName == 'onClick100') {
      onClicks.onClick100(this);
    }
  },
  onLoadOfPage: function (methodName) {
    if (methodName == 'onLoadOfPage1') {
      onLoadOfPages.onLoadOfPage1(this);
    } else if (methodName == 'onLoadOfPage2') {
      onLoadOfPages.onLoadOfPage2(this);
    } else if (methodName == 'onLoadOfPage3') {
      onLoadOfPages.onLoadOfPage3(this);
    } else if (methodName == 'onLoadOfPage4') {
      onLoadOfPages.onLoadOfPage4(this);
    } else if (methodName == 'onLoadOfPage5') {
      onLoadOfPages.onLoadOfPage5(this);
    } else if (methodName == 'onLoadOfPage6') {
      onLoadOfPages.onLoadOfPage6(this);
    } else if (methodName == 'onLoadOfPage7') {
      onLoadOfPages.onLoadOfPage7(this);
    } else if (methodName == 'onLoadOfPage8') {
      onLoadOfPages.onLoadOfPage8(this);
    } else if (methodName == 'onLoadOfPage9') {
      onLoadOfPages.onLoadOfPage9(this);
    } else if (methodName == 'onLoadOfPage10') {
      onLoadOfPages.onLoadOfPage10(this);
    } else if (methodName == 'onLoadOfPage11') {
      onLoadOfPages.onLoadOfPage11(this);
    } else if (methodName == 'onLoadOfPage12') {
      onLoadOfPages.onLoadOfPage12(this);
    } else if (methodName == 'onLoadOfPage13') {
      onLoadOfPages.onLoadOfPage13(this);
    } else if (methodName == 'onLoadOfPage14') {
      onLoadOfPages.onLoadOfPage14(this);
    } else if (methodName == 'onLoadOfPage15') {
      onLoadOfPages.onLoadOfPage15(this);
    } else if (methodName == 'onLoadOfPage16') {
      onLoadOfPages.onLoadOfPage16(this);
    } else if (methodName == 'onLoadOfPage17') {
      onLoadOfPages.onLoadOfPage17(this);
    } else if (methodName == 'onLoadOfPage18') {
      onLoadOfPages.onLoadOfPage18(this);
    } else if (methodName == 'onLoadOfPage19') {
      onLoadOfPages.onLoadOfPage19(this);
    } else if (methodName == 'onLoadOfPage20') {
      onLoadOfPages.onLoadOfPage20(this);
    } else if (methodName == 'onLoadOfPage21') {
      onLoadOfPages.onLoadOfPage21(this);
    } else if (methodName == 'onLoadOfPage22') {
      onLoadOfPages.onLoadOfPage22(this);
    } else if (methodName == 'onLoadOfPage23') {
      onLoadOfPages.onLoadOfPage23(this);
    } else if (methodName == 'onLoadOfPage24') {
      onLoadOfPages.onLoadOfPage24(this);
    } else if (methodName == 'onLoadOfPage25') {
      onLoadOfPages.onLoadOfPage25(this);
    } else if (methodName == 'onLoadOfPage26') {
      onLoadOfPages.onLoadOfPage26(this);
    } else if (methodName == 'onLoadOfPage27') {
      onLoadOfPages.onLoadOfPage27(this);
    } else if (methodName == 'onLoadOfPage28') {
      onLoadOfPages.onLoadOfPage28(this);
    } else if (methodName == 'onLoadOfPage29') {
      onLoadOfPages.onLoadOfPage29(this);
    } else if (methodName == 'onLoadOfPage30') {
      onLoadOfPages.onLoadOfPage30(this);
    } else if (methodName == 'onLoadOfPage31') {
      onLoadOfPages.onLoadOfPage31(this);
    } else if (methodName == 'onLoadOfPage32') {
      onLoadOfPages.onLoadOfPage32(this);
    } else if (methodName == 'onLoadOfPage33') {
      onLoadOfPages.onLoadOfPage33(this);
    } else if (methodName == 'onLoadOfPage34') {
      onLoadOfPages.onLoadOfPage34(this);
    } else if (methodName == 'onLoadOfPage35') {
      onLoadOfPages.onLoadOfPage35(this);
    } else if (methodName == 'onLoadOfPage36') {
      onLoadOfPages.onLoadOfPage36(this);
    } else if (methodName == 'onLoadOfPage37') {
      onLoadOfPages.onLoadOfPage37(this);
    } else if (methodName == 'onLoadOfPage38') {
      onLoadOfPages.onLoadOfPage38(this);
    } else if (methodName == 'onLoadOfPage39') {
      onLoadOfPages.onLoadOfPage39(this);
    } else if (methodName == 'onLoadOfPage40') {
      onLoadOfPages.onLoadOfPage40(this);
    } else if (methodName == 'onLoadOfPage41') {
      onLoadOfPages.onLoadOfPage41(this);
    } else if (methodName == 'onLoadOfPage42') {
      onLoadOfPages.onLoadOfPage42(this);
    } else if (methodName == 'onLoadOfPage43') {
      onLoadOfPages.onLoadOfPage43(this);
    } else if (methodName == 'onLoadOfPage44') {
      onLoadOfPages.onLoadOfPage44(this);
    } else if (methodName == 'onLoadOfPage45') {
      onLoadOfPages.onLoadOfPage45(this);
    } else if (methodName == 'onLoadOfPage46') {
      onLoadOfPages.onLoadOfPage46(this);
    } else if (methodName == 'onLoadOfPage47') {
      onLoadOfPages.onLoadOfPage47(this);
    } else if (methodName == 'onLoadOfPage48') {
      onLoadOfPages.onLoadOfPage48(this);
    } else if (methodName == 'onLoadOfPage49') {
      onLoadOfPages.onLoadOfPage49(this);
    } else if (methodName == 'onLoadOfPage50') {
      onLoadOfPages.onLoadOfPage50(this);
    } else if (methodName == 'onLoadOfPage51') {
      onLoadOfPages.onLoadOfPage51(this);
    } else if (methodName == 'onLoadOfPage52') {
      onLoadOfPages.onLoadOfPage52(this);
    } else if (methodName == 'onLoadOfPage53') {
      onLoadOfPages.onLoadOfPage53(this);
    } else if (methodName == 'onLoadOfPage54') {
      onLoadOfPages.onLoadOfPage54(this);
    } else if (methodName == 'onLoadOfPage55') {
      onLoadOfPages.onLoadOfPage55(this);
    } else if (methodName == 'onLoadOfPage56') {
      onLoadOfPages.onLoadOfPage56(this);
    } else if (methodName == 'onLoadOfPage57') {
      onLoadOfPages.onLoadOfPage57(this);
    } else if (methodName == 'onLoadOfPage58') {
      onLoadOfPages.onLoadOfPage58(this);
    } else if (methodName == 'onLoadOfPage59') {
      onLoadOfPages.onLoadOfPage59(this);
    } else if (methodName == 'onLoadOfPage60') {
      onLoadOfPages.onLoadOfPage60(this);
    } else if (methodName == 'onLoadOfPage61') {
      onLoadOfPages.onLoadOfPage61(this);
    } else if (methodName == 'onLoadOfPage62') {
      onLoadOfPages.onLoadOfPage62(this);
    } else if (methodName == 'onLoadOfPage63') {
      onLoadOfPages.onLoadOfPage63(this);
    } else if (methodName == 'onLoadOfPage64') {
      onLoadOfPages.onLoadOfPage64(this);
    } else if (methodName == 'onLoadOfPage65') {
      onLoadOfPages.onLoadOfPage65(this);
    } else if (methodName == 'onLoadOfPage66') {
      onLoadOfPages.onLoadOfPage66(this);
    } else if (methodName == 'onLoadOfPage67') {
      onLoadOfPages.onLoadOfPage67(this);
    } else if (methodName == 'onLoadOfPage68') {
      onLoadOfPages.onLoadOfPage68(this);
    } else if (methodName == 'onLoadOfPage69') {
      onLoadOfPages.onLoadOfPage69(this);
    } else if (methodName == 'onLoadOfPage70') {
      onLoadOfPages.onLoadOfPage70(this);
    } else if (methodName == 'onLoadOfPage71') {
      onLoadOfPages.onLoadOfPage71(this);
    } else if (methodName == 'onLoadOfPage72') {
      onLoadOfPages.onLoadOfPage72(this);
    } else if (methodName == 'onLoadOfPage73') {
      onLoadOfPages.onLoadOfPage73(this);
    } else if (methodName == 'onLoadOfPage74') {
      onLoadOfPages.onLoadOfPage74(this);
    } else if (methodName == 'onLoadOfPage75') {
      onLoadOfPages.onLoadOfPage75(this);
    } else if (methodName == 'onLoadOfPage76') {
      onLoadOfPages.onLoadOfPage76(this);
    } else if (methodName == 'onLoadOfPage77') {
      onLoadOfPages.onLoadOfPage77(this);
    } else if (methodName == 'onLoadOfPage78') {
      onLoadOfPages.onLoadOfPage78(this);
    } else if (methodName == 'onLoadOfPage79') {
      onLoadOfPages.onLoadOfPage79(this);
    } else if (methodName == 'onLoadOfPage80') {
      onLoadOfPages.onLoadOfPage80(this);
    } else if (methodName == 'onLoadOfPage81') {
      onLoadOfPages.onLoadOfPage81(this);
    } else if (methodName == 'onLoadOfPage82') {
      onLoadOfPages.onLoadOfPage82(this);
    } else if (methodName == 'onLoadOfPage83') {
      onLoadOfPages.onLoadOfPage83(this);
    } else if (methodName == 'onLoadOfPage84') {
      onLoadOfPages.onLoadOfPage84(this);
    } else if (methodName == 'onLoadOfPage85') {
      onLoadOfPages.onLoadOfPage85(this);
    } else if (methodName == 'onLoadOfPage86') {
      onLoadOfPages.onLoadOfPage86(this);
    } else if (methodName == 'onLoadOfPage87') {
      onLoadOfPages.onLoadOfPage87(this);
    } else if (methodName == 'onLoadOfPage88') {
      onLoadOfPages.onLoadOfPage88(this);
    } else if (methodName == 'onLoadOfPage89') {
      onLoadOfPages.onLoadOfPage89(this);
    } else if (methodName == 'onLoadOfPage90') {
      onLoadOfPages.onLoadOfPage90(this);
    } else if (methodName == 'onLoadOfPage91') {
      onLoadOfPages.onLoadOfPage91(this);
    } else if (methodName == 'onLoadOfPage92') {
      onLoadOfPages.onLoadOfPage92(this);
    } else if (methodName == 'onLoadOfPage93') {
      onLoadOfPages.onLoadOfPage93(this);
    } else if (methodName == 'onLoadOfPage94') {
      onLoadOfPages.onLoadOfPage94(this);
    } else if (methodName == 'onLoadOfPage95') {
      onLoadOfPages.onLoadOfPage95(this);
    } else if (methodName == 'onLoadOfPage96') {
      onLoadOfPages.onLoadOfPage96(this);
    } else if (methodName == 'onLoadOfPage97') {
      onLoadOfPages.onLoadOfPage97(this);
    } else if (methodName == 'onLoadOfPage98') {
      onLoadOfPages.onLoadOfPage98(this);
    } else if (methodName == 'onLoadOfPage99') {
      onLoadOfPages.onLoadOfPage99(this);
    } else if (methodName == 'onLoadOfPage100') {
      onLoadOfPages.onLoadOfPage100(this);
    }
  }
})
