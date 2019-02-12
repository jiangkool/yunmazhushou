//app.js
var config=require('./utils/config.js');

App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        wx.request({
            url : config.login,
         method : 'POST',
           data : {code:res.code},
          success(res) {
            //console.log(res.data.token)
            wx.setStorageSync('token', res.data.token)
          }

        })  

      }
    })
 
  },
  globalData: {
    userInfo: null
  }
})