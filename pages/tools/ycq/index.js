// pages/tools/ycq/index.js

const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'ycqdate':'-',
    'nowyz':'-'
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  formSubmit: function (e) {
    var that = this
    var datestr = e.detail.value.lastyjdate.split("-");
    var ycq = util.yuchanDate(datestr[0], datestr[1], datestr[2], e.detail.value.yjzq);
    that.setData({
        'ycqdate': ycq.yuchanDate,
        'nowyz': ycq.yunZhou
    })

  },
  onShareAppMessage: function () {
    return {
      title: '孕产期计算器-武汉孕妈圈'
    }
  }
})