const util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bbWeight: { 'jin': '- 斤', 'ke': '- 克'}
  },
  formSubmit: function (e) {
    var that = this
    var Jsd = e.detail.value.Jsd;
    var Jfw = e.detail.value.Jfw;
    var Jgg = e.detail.value.Jgg;
    var result = util.getWeight(Jsd, Jfw, Jgg);
    console.log(result)
    that.setData({
      'bbWeight': result
    })

  },
  onShareAppMessage: function () {
    return {
      title: '胎儿体重计算器-武汉孕妈圈'
    }
  }
})