// pages/life/index.js
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '日常生活-武汉孕妈圈'
    })
  },
  formSubmit: function (e) {
    if (e.detail.value.keywords == '') util.alertView('温馨提示！', '请输入您要搜索的内容！')
    if (e.detail.value.keywords != ''){
      wx.navigateTo({
        url: '/pages/list/index?keywords=' + encodeURIComponent(e.detail.value.keywords),
      })
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '日常生活-武汉孕妈圈'
    }
  }
})