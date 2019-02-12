const util = require("../../../utils/util.js");
Page({
  data: {
    date: '2018-06-06',
    dates:{}
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
    var csDate = e.detail.value.csdate;
    var result = util.getYmDays(csDate);
    //console.log(result)
    that.setData({
      'dates': result
    })
  },
  onShareAppMessage: function () {
   return{
      title:'疫苗接种时间计算器-武汉孕妈圈'
   }
  }
})