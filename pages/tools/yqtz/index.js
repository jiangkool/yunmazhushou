const util = require("../../../utils/util.js");
Page({
  data: {
    yfweight:'-'
  },
  formSubmit: function (e) {
    var that = this
    var val1 = e.detail.value.yousg;
    var val2 = e.detail.value.yqweight;
    var ctz = util.getWei(val1, val2);
    that.setData({
      'yfweight': ctz.yfweight
    })
  },
  onShareAppMessage: function () {
    return {
      title: '孕期体重计算器-武汉孕妈圈'
    }
  }
})