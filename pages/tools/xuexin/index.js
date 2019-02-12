// pages/tools/xuexin/index.js
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    youxx: ['A', 'B', 'O','AB'],
    poxx: ['A', 'B', 'O', 'AB'],
    index:0,
    key:0,
    bbxx:'-'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindYouxxChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  bindPoxxChange: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
    var youxx = e.detail.value.youxx;
    var poxx = e.detail.value.poxx;
    var xx = util.checkBlood(youxx, poxx);
    that.setData({
      'bbxx': xx.result
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})