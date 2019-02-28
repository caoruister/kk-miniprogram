'use strict';
const common = require('common.js')

var alert = common.alert;

var onClick1 = function (pageInstance) {
  let info = {
    id: pageInstance.getId(),
    name: pageInstance.getFieldValue('name'),
    cpjg: pageInstance.getFieldValue('cpjg'),
    yjjg: pageInstance.getFieldValue('yjjg'),
    cpsm: pageInstance.getFieldValue('cpsm')
  }
  wx.setStorageSync('__cpk.info__', JSON.stringify(info));

  wx.navigateTo({
    url: '/pages/add/add?objid=2C904B72686017330168797345410283&layoutid=2C904B72692E41DB01692E4786C9006A&notNeedLogin=true&navigateBackDelta=2'
  })
}

var onClick2 = function (pageInstance) {}
var onClick3 = function (pageInstance) {}
var onClick4 = function (pageInstance) {}
var onClick5 = function (pageInstance) {}
var onClick6 = function (pageInstance) {}
var onClick7 = function (pageInstance) {}
var onClick8 = function (pageInstance) {}
var onClick9 = function (pageInstance) {}
var onClick10 = function (pageInstance) {}
var onClick11 = function (pageInstance) {}
var onClick12 = function (pageInstance) {}
var onClick13 = function (pageInstance) {}
var onClick14 = function (pageInstance) {}
var onClick15 = function (pageInstance) {}
var onClick16 = function (pageInstance) {}
var onClick17 = function (pageInstance) {}
var onClick18 = function (pageInstance) {}
var onClick19 = function (pageInstance) {}
var onClick20 = function (pageInstance) {}
var onClick21 = function (pageInstance) {}
var onClick22 = function (pageInstance) {}
var onClick23 = function (pageInstance) {}
var onClick24 = function (pageInstance) {}
var onClick25 = function (pageInstance) {}
var onClick26 = function (pageInstance) {}
var onClick27 = function (pageInstance) {}
var onClick28 = function (pageInstance) {}
var onClick29 = function (pageInstance) {}
var onClick30 = function (pageInstance) {}
var onClick31 = function (pageInstance) {}
var onClick32 = function (pageInstance) {}
var onClick33 = function (pageInstance) {}
var onClick34 = function (pageInstance) {}
var onClick35 = function (pageInstance) {}
var onClick36 = function (pageInstance) {}
var onClick37 = function (pageInstance) {}
var onClick38 = function (pageInstance) {}
var onClick39 = function (pageInstance) {}
var onClick40 = function (pageInstance) {}
var onClick41 = function (pageInstance) {}
var onClick42 = function (pageInstance) {}
var onClick43 = function (pageInstance) {}
var onClick44 = function (pageInstance) {}
var onClick45 = function (pageInstance) {}
var onClick46 = function (pageInstance) {}
var onClick47 = function (pageInstance) {}
var onClick48 = function (pageInstance) {}
var onClick49 = function (pageInstance) {}
var onClick50 = function (pageInstance) {}
var onClick51 = function (pageInstance) {}
var onClick52 = function (pageInstance) {}
var onClick53 = function (pageInstance) {}
var onClick54 = function (pageInstance) {}
var onClick55 = function (pageInstance) {}
var onClick56 = function (pageInstance) {}
var onClick57 = function (pageInstance) {}
var onClick58 = function (pageInstance) {}
var onClick59 = function (pageInstance) {}
var onClick60 = function (pageInstance) {}
var onClick61 = function (pageInstance) {}
var onClick62 = function (pageInstance) {}
var onClick63 = function (pageInstance) {}
var onClick64 = function (pageInstance) {}
var onClick65 = function (pageInstance) {}
var onClick66 = function (pageInstance) {}
var onClick67 = function (pageInstance) {}
var onClick68 = function (pageInstance) {}
var onClick69 = function (pageInstance) {}
var onClick70 = function (pageInstance) {}
var onClick71 = function (pageInstance) {}
var onClick72 = function (pageInstance) {}
var onClick73 = function (pageInstance) {}
var onClick74 = function (pageInstance) {}
var onClick75 = function (pageInstance) {}
var onClick76 = function (pageInstance) {}
var onClick77 = function (pageInstance) {}
var onClick78 = function (pageInstance) {}
var onClick79 = function (pageInstance) {}
var onClick80 = function (pageInstance) {}
var onClick81 = function (pageInstance) {}
var onClick82 = function (pageInstance) {}
var onClick83 = function (pageInstance) {}
var onClick84 = function (pageInstance) {}
var onClick85 = function (pageInstance) {}
var onClick86 = function (pageInstance) {}
var onClick87 = function (pageInstance) {}
var onClick88 = function (pageInstance) {}
var onClick89 = function (pageInstance) {}
var onClick90 = function (pageInstance) {}
var onClick91 = function (pageInstance) {}
var onClick92 = function (pageInstance) {}
var onClick93 = function (pageInstance) {}
var onClick94 = function (pageInstance) {}
var onClick95 = function (pageInstance) {}
var onClick96 = function (pageInstance) {}
var onClick97 = function (pageInstance) {}
var onClick98 = function (pageInstance) {}
var onClick99 = function (pageInstance) {}
var onClick100 = function (pageInstance) {}

module.exports = {
  onClick1: onClick1,
  onClick2: onClick2,
  onClick3: onClick3,
  onClick4: onClick4,
  onClick5: onClick5,
  onClick6: onClick6,
  onClick7: onClick7,
  onClick8: onClick8,
  onClick9: onClick9,
  onClick10: onClick10,
  onClick11: onClick11,
  onClick12: onClick12,
  onClick13: onClick13,
  onClick14: onClick14,
  onClick15: onClick15,
  onClick16: onClick16,
  onClick17: onClick17,
  onClick18: onClick18,
  onClick19: onClick19,
  onClick20: onClick20,
  onClick21: onClick21,
  onClick22: onClick22,
  onClick23: onClick23,
  onClick24: onClick24,
  onClick25: onClick25,
  onClick26: onClick26,
  onClick27: onClick27,
  onClick28: onClick28,
  onClick29: onClick29,
  onClick30: onClick30,
  onClick31: onClick31,
  onClick32: onClick32,
  onClick33: onClick33,
  onClick34: onClick34,
  onClick35: onClick35,
  onClick36: onClick36,
  onClick37: onClick37,
  onClick38: onClick38,
  onClick39: onClick39,
  onClick40: onClick40,
  onClick41: onClick41,
  onClick42: onClick42,
  onClick43: onClick43,
  onClick44: onClick44,
  onClick45: onClick45,
  onClick46: onClick46,
  onClick47: onClick47,
  onClick48: onClick48,
  onClick49: onClick49,
  onClick50: onClick50,
  onClick51: onClick51,
  onClick52: onClick52,
  onClick53: onClick53,
  onClick54: onClick54,
  onClick55: onClick55,
  onClick56: onClick56,
  onClick57: onClick57,
  onClick58: onClick58,
  onClick59: onClick59,
  onClick60: onClick60,
  onClick61: onClick61,
  onClick62: onClick62,
  onClick63: onClick63,
  onClick64: onClick64,
  onClick65: onClick65,
  onClick66: onClick66,
  onClick67: onClick67,
  onClick68: onClick68,
  onClick69: onClick69,
  onClick70: onClick70,
  onClick71: onClick71,
  onClick72: onClick72,
  onClick73: onClick73,
  onClick74: onClick74,
  onClick75: onClick75,
  onClick76: onClick76,
  onClick77: onClick77,
  onClick78: onClick78,
  onClick79: onClick79,
  onClick80: onClick80,
  onClick81: onClick81,
  onClick82: onClick82,
  onClick83: onClick83,
  onClick84: onClick84,
  onClick85: onClick85,
  onClick86: onClick86,
  onClick87: onClick87,
  onClick88: onClick88,
  onClick89: onClick89,
  onClick90: onClick90,
  onClick91: onClick91,
  onClick92: onClick92,
  onClick93: onClick93,
  onClick94: onClick94,
  onClick95: onClick95,
  onClick96: onClick96,
  onClick97: onClick97,
  onClick98: onClick98,
  onClick99: onClick99,
  onClick100: onClick100,
};