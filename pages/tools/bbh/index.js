// pages/tools/bbh/index.js
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:['男','女'],
    bbh:'-'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  formSubmit: function (e) {
    var that = this
    var fHeig = e.detail.value.bbsg;
    var mHeig = e.detail.value.mmsg;
    var bbxb = e.detail.value.bbxb=='男'?0:1;
    var csg = util.getHei(fHeig, mHeig, bbxb);
    that.setData({
      'bbh': csg.bbh
    })

  },
  onShareAppMessage: function () {
    return {
      title: '宝宝身高计算器-武汉孕妈圈'
    }
  }
})