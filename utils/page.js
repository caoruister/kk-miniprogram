'use strict';
const common = require('common.js')

var alert = common.alert;
var callInterface = common.callInterface;

var onLoadOfPage1 = function (pageInstance) {
  var info = wx.getStorageSync('__cpk.info__');
  console.log(info);
  if (info != null && info != '') {
    info = JSON.parse(info);
    //

    //alert(info.name);
    pageInstance.setFieldValue('cpmc', {
      id: info.id,
      name: info.name
    });
    pageInstance.setFieldValue('cpjg', info.cpjg);
    pageInstance.setFieldValue('yjjg', info.yjjg);
    pageInstance.setFieldValue('cpsm', info.cpsm);
    pageInstance.setFieldValue('cplx', info.cplx);
  }
}

var onLoadOfPage2 = function (pageInstance) {
  var info = wx.getStorageSync('__cpk.info__');
  console.log(info);
  if (info != null && info != '') {
    info = JSON.parse(info);
    //

    //alert(info.name);
    pageInstance.setFieldValue('cpmc', {
      id: info.id,
      name: info.name
    });
    pageInstance.setFieldValue('cpjg', info.cpjg);
    pageInstance.setFieldValue('yjjg', info.yjjg);
    pageInstance.setFieldValue('cpsm', info.cpsm);
  }
}

var onLoadOfPage3 = function (pageInstance) {
var info = wx.getStorageSync('__cpk.info__');
console.log(info);
if (info != null && info != '') {
  info = JSON.parse(info);
  //

  //alert(info.name);
  pageInstance.setFieldValue('cpmc', {
    id: info.id,
    name: info.name
  });
  pageInstance.setFieldValue('cpjg', info.cpjg);
  pageInstance.setFieldValue('yjjg', info.yjjg);
  pageInstance.setFieldValue('cpsm', info.cpsm);
  pageInstance.setFieldValue('cplx', info.cplx);
}
}

var onLoadOfPage4 = function (pageInstance) {
  var info = wx.getStorageSync('__cpk.info__');
  console.log(info);
  if (info != null && info != '') {
    info = JSON.parse(info);
    //

    //alert(info.name);
    pageInstance.setFieldValue('cpmc', {
      id: info.id,
      name: info.name
    });
    pageInstance.setFieldValue('cpjg', info.cpjg);
    pageInstance.setFieldValue('yjjg', info.yjjg);
    pageInstance.setFieldValue('cpsm', info.cpsm);
  }
}

var onLoadOfPage5 = function (pageInstance) {
  var info = wx.getStorageSync('__cpk.info__');
  console.log(info);
  if (info != null && info != '') {
    info = JSON.parse(info);
    //

    //alert(info.name);
    pageInstance.setFieldValue('cpmc', {
      id: info.id,
      name: info.name
    });
    pageInstance.setFieldValue('cpjg', info.cpjg);
    pageInstance.setFieldValue('yjjg', info.yjjg);
    pageInstance.setFieldValue('cpsm', info.cpsm);
    pageInstance.setFieldValue('cplx', info.cplx);
  }
}

var onLoadOfPage6 = function (pageInstance) {
var info = wx.getStorageSync('__dd.info__');
console.log(info);
if (info != null && info != '') {
  info = JSON.parse(info);
  //
  pageInstance.setFieldValue('sqtkje', info.yjjg); // 将  押金金额 设置给 申请退款金额
  pageInstance.setFieldValue('ddbh', {
    id: info.id,
    name: info.ddbh
  });
}
}

var onLoadOfPage7 = function (pageInstance) {}
var onLoadOfPage8 = function (pageInstance) {}
var onLoadOfPage9 = function (pageInstance) {}
var onLoadOfPage10 = function (pageInstance) {}
var onLoadOfPage11 = function (pageInstance) {}
var onLoadOfPage12 = function (pageInstance) {}
var onLoadOfPage13 = function (pageInstance) {}
var onLoadOfPage14 = function (pageInstance) {}
var onLoadOfPage15 = function (pageInstance) {}
var onLoadOfPage16 = function (pageInstance) {}
var onLoadOfPage17 = function (pageInstance) {}
var onLoadOfPage18 = function (pageInstance) {}
var onLoadOfPage19 = function (pageInstance) {}
var onLoadOfPage20 = function (pageInstance) {}
var onLoadOfPage21 = function (pageInstance) {}
var onLoadOfPage22 = function (pageInstance) {}
var onLoadOfPage23 = function (pageInstance) {}
var onLoadOfPage24 = function (pageInstance) {}
var onLoadOfPage25 = function (pageInstance) {}
var onLoadOfPage26 = function (pageInstance) {}
var onLoadOfPage27 = function (pageInstance) {}
var onLoadOfPage28 = function (pageInstance) {}
var onLoadOfPage29 = function (pageInstance) {}
var onLoadOfPage30 = function (pageInstance) {}
var onLoadOfPage31 = function (pageInstance) {}
var onLoadOfPage32 = function (pageInstance) {}
var onLoadOfPage33 = function (pageInstance) {}
var onLoadOfPage34 = function (pageInstance) {}
var onLoadOfPage35 = function (pageInstance) {}
var onLoadOfPage36 = function (pageInstance) {}
var onLoadOfPage37 = function (pageInstance) {}
var onLoadOfPage38 = function (pageInstance) {}
var onLoadOfPage39 = function (pageInstance) {}
var onLoadOfPage40 = function (pageInstance) {}
var onLoadOfPage41 = function (pageInstance) {}
var onLoadOfPage42 = function (pageInstance) {}
var onLoadOfPage43 = function (pageInstance) {}
var onLoadOfPage44 = function (pageInstance) {}
var onLoadOfPage45 = function (pageInstance) {}
var onLoadOfPage46 = function (pageInstance) {}
var onLoadOfPage47 = function (pageInstance) {}
var onLoadOfPage48 = function (pageInstance) {}
var onLoadOfPage49 = function (pageInstance) {}
var onLoadOfPage50 = function (pageInstance) {}
var onLoadOfPage51 = function (pageInstance) {}
var onLoadOfPage52 = function (pageInstance) {}
var onLoadOfPage53 = function (pageInstance) {}
var onLoadOfPage54 = function (pageInstance) {}
var onLoadOfPage55 = function (pageInstance) {}
var onLoadOfPage56 = function (pageInstance) {}
var onLoadOfPage57 = function (pageInstance) {}
var onLoadOfPage58 = function (pageInstance) {}
var onLoadOfPage59 = function (pageInstance) {}
var onLoadOfPage60 = function (pageInstance) {}
var onLoadOfPage61 = function (pageInstance) {}
var onLoadOfPage62 = function (pageInstance) {}
var onLoadOfPage63 = function (pageInstance) {}
var onLoadOfPage64 = function (pageInstance) {}
var onLoadOfPage65 = function (pageInstance) {}
var onLoadOfPage66 = function (pageInstance) {}
var onLoadOfPage67 = function (pageInstance) {}
var onLoadOfPage68 = function (pageInstance) {}
var onLoadOfPage69 = function (pageInstance) {}
var onLoadOfPage70 = function (pageInstance) {}
var onLoadOfPage71 = function (pageInstance) {}
var onLoadOfPage72 = function (pageInstance) {}
var onLoadOfPage73 = function (pageInstance) {}
var onLoadOfPage74 = function (pageInstance) {}
var onLoadOfPage75 = function (pageInstance) {}
var onLoadOfPage76 = function (pageInstance) {}
var onLoadOfPage77 = function (pageInstance) {}
var onLoadOfPage78 = function (pageInstance) {}
var onLoadOfPage79 = function (pageInstance) {}
var onLoadOfPage80 = function (pageInstance) {}
var onLoadOfPage81 = function (pageInstance) {}
var onLoadOfPage82 = function (pageInstance) {}
var onLoadOfPage83 = function (pageInstance) {}
var onLoadOfPage84 = function (pageInstance) {}
var onLoadOfPage85 = function (pageInstance) {}
var onLoadOfPage86 = function (pageInstance) {}
var onLoadOfPage87 = function (pageInstance) {}
var onLoadOfPage88 = function (pageInstance) {}
var onLoadOfPage89 = function (pageInstance) {}
var onLoadOfPage90 = function (pageInstance) {}
var onLoadOfPage91 = function (pageInstance) {}
var onLoadOfPage92 = function (pageInstance) {}
var onLoadOfPage93 = function (pageInstance) {}
var onLoadOfPage94 = function (pageInstance) {}
var onLoadOfPage95 = function (pageInstance) {}
var onLoadOfPage96 = function (pageInstance) {}
var onLoadOfPage97 = function (pageInstance) {}
var onLoadOfPage98 = function (pageInstance) {}
var onLoadOfPage99 = function (pageInstance) {}
var onLoadOfPage100 = function (pageInstance) {}

module.exports = {
  onLoadOfPage1: onLoadOfPage1,
  onLoadOfPage2: onLoadOfPage2,
  onLoadOfPage3: onLoadOfPage3,
  onLoadOfPage4: onLoadOfPage4,
  onLoadOfPage5: onLoadOfPage5,
  onLoadOfPage6: onLoadOfPage6,
  onLoadOfPage7: onLoadOfPage7,
  onLoadOfPage8: onLoadOfPage8,
  onLoadOfPage9: onLoadOfPage9,
  onLoadOfPage10: onLoadOfPage10,
  onLoadOfPage11: onLoadOfPage11,
  onLoadOfPage12: onLoadOfPage12,
  onLoadOfPage13: onLoadOfPage13,
  onLoadOfPage14: onLoadOfPage14,
  onLoadOfPage15: onLoadOfPage15,
  onLoadOfPage16: onLoadOfPage16,
  onLoadOfPage17: onLoadOfPage17,
  onLoadOfPage18: onLoadOfPage18,
  onLoadOfPage19: onLoadOfPage19,
  onLoadOfPage20: onLoadOfPage20,
  onLoadOfPage21: onLoadOfPage21,
  onLoadOfPage22: onLoadOfPage22,
  onLoadOfPage23: onLoadOfPage23,
  onLoadOfPage24: onLoadOfPage24,
  onLoadOfPage25: onLoadOfPage25,
  onLoadOfPage26: onLoadOfPage26,
  onLoadOfPage27: onLoadOfPage27,
  onLoadOfPage28: onLoadOfPage28,
  onLoadOfPage29: onLoadOfPage29,
  onLoadOfPage30: onLoadOfPage30,
  onLoadOfPage31: onLoadOfPage31,
  onLoadOfPage32: onLoadOfPage32,
  onLoadOfPage33: onLoadOfPage33,
  onLoadOfPage34: onLoadOfPage34,
  onLoadOfPage35: onLoadOfPage35,
  onLoadOfPage36: onLoadOfPage36,
  onLoadOfPage37: onLoadOfPage37,
  onLoadOfPage38: onLoadOfPage38,
  onLoadOfPage39: onLoadOfPage39,
  onLoadOfPage40: onLoadOfPage40,
  onLoadOfPage41: onLoadOfPage41,
  onLoadOfPage42: onLoadOfPage42,
  onLoadOfPage43: onLoadOfPage43,
  onLoadOfPage44: onLoadOfPage44,
  onLoadOfPage45: onLoadOfPage45,
  onLoadOfPage46: onLoadOfPage46,
  onLoadOfPage47: onLoadOfPage47,
  onLoadOfPage48: onLoadOfPage48,
  onLoadOfPage49: onLoadOfPage49,
  onLoadOfPage50: onLoadOfPage50,
  onLoadOfPage51: onLoadOfPage51,
  onLoadOfPage52: onLoadOfPage52,
  onLoadOfPage53: onLoadOfPage53,
  onLoadOfPage54: onLoadOfPage54,
  onLoadOfPage55: onLoadOfPage55,
  onLoadOfPage56: onLoadOfPage56,
  onLoadOfPage57: onLoadOfPage57,
  onLoadOfPage58: onLoadOfPage58,
  onLoadOfPage59: onLoadOfPage59,
  onLoadOfPage60: onLoadOfPage60,
  onLoadOfPage61: onLoadOfPage61,
  onLoadOfPage62: onLoadOfPage62,
  onLoadOfPage63: onLoadOfPage63,
  onLoadOfPage64: onLoadOfPage64,
  onLoadOfPage65: onLoadOfPage65,
  onLoadOfPage66: onLoadOfPage66,
  onLoadOfPage67: onLoadOfPage67,
  onLoadOfPage68: onLoadOfPage68,
  onLoadOfPage69: onLoadOfPage69,
  onLoadOfPage70: onLoadOfPage70,
  onLoadOfPage71: onLoadOfPage71,
  onLoadOfPage72: onLoadOfPage72,
  onLoadOfPage73: onLoadOfPage73,
  onLoadOfPage74: onLoadOfPage74,
  onLoadOfPage75: onLoadOfPage75,
  onLoadOfPage76: onLoadOfPage76,
  onLoadOfPage77: onLoadOfPage77,
  onLoadOfPage78: onLoadOfPage78,
  onLoadOfPage79: onLoadOfPage79,
  onLoadOfPage80: onLoadOfPage80,
  onLoadOfPage81: onLoadOfPage81,
  onLoadOfPage82: onLoadOfPage82,
  onLoadOfPage83: onLoadOfPage83,
  onLoadOfPage84: onLoadOfPage84,
  onLoadOfPage85: onLoadOfPage85,
  onLoadOfPage86: onLoadOfPage86,
  onLoadOfPage87: onLoadOfPage87,
  onLoadOfPage88: onLoadOfPage88,
  onLoadOfPage89: onLoadOfPage89,
  onLoadOfPage90: onLoadOfPage90,
  onLoadOfPage91: onLoadOfPage91,
  onLoadOfPage92: onLoadOfPage92,
  onLoadOfPage93: onLoadOfPage93,
  onLoadOfPage94: onLoadOfPage94,
  onLoadOfPage95: onLoadOfPage95,
  onLoadOfPage96: onLoadOfPage96,
  onLoadOfPage97: onLoadOfPage97,
  onLoadOfPage98: onLoadOfPage98,
  onLoadOfPage99: onLoadOfPage99,
  onLoadOfPage100: onLoadOfPage100,
};