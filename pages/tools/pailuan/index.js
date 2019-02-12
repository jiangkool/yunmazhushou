// pages/tools/pailuan/index.js
const util = require("../../../utils/util.js");

Page({
  data: {
    'pailuanStart': '-',
    'pailuanEnd': '-'
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
    var datestr = e.detail.value.lastyjdate.split("-");
    var ycq = util.pailuan(datestr[0], datestr[1], datestr[2], e.detail.value.yjzq);
    that.setData({
      'pailuanStart': ycq.pailuanStart,
      'pailuanEnd': ycq.pailuanEnd
    })

  },

  onShareAppMessage: function () {
    return {
      title: '排卵期计算器-武汉孕妈圈'
    }
  }
  
})