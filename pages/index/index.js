
const util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  formSubmit: function(e){
    if (e.detail.value.keywords == '') util.alertView('温馨提示！','请输入您要搜索的内容！')
    if (e.detail.value.keywords != '') {
      wx.navigateTo({
        url: '/pages/list/index?keywords=' + encodeURIComponent(e.detail.value.keywords),
      })
    }
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '饮食速查-武汉孕妈圈'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '饮食速查-武汉孕妈圈'
    }
  }

})
