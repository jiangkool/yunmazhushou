var util = require('../../utils/util.js');
var config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keywords = decodeURIComponent(options.keywords)
    var that = this;

    if (typeof(options.cid) != 'undefined'){
      wx.request({
        url: config.getArticleList,
        method: 'POST',
        data: {
          cat_id: options.cid || 0,
          token: wx.getStorageSync('token')
        },
        success: function (rs) {
          //console.log(rs.data)
          that.setData({
            listData: rs.data
          });
          wx.setNavigationBarTitle({
            title: options.cname+'-武汉孕妈圈'
          })
        }
      })

    }

    if (typeof(options.keywords) != 'undefined') {

      wx.request({
        url: config.search,
        method: 'POST',
        data: {
          keywords: keywords||'',
          token: wx.getStorageSync('token')
        },
        success: function (rs) {
          //console.log(rs.data)
          that.setData({
            listData: rs.data
          });
          wx.setNavigationBarTitle({
            title: '"'+keywords+'" 搜索结果-武汉孕妈圈'
          })
        }
      })

    }
   

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.startPullDownRefresh()
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

  },
  showArticle:function(e){
    //console.log(e.currentTarget.dataset.aid)
    wx.redirectTo({
      url: '/pages/show/index?id='+e.currentTarget.dataset.aid,
    })
  }
})