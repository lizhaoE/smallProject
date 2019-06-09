//app.js
App({
  globalData:{
    baidu_token: ''
  },
  onLaunch: function () {
    var that = this;
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        'grant_type': 'client_credentials',
        'client_id': 'B7sIUz2nge41X57G0qeZZU0i',
        'client_secret': '9oT9BrEiqwodwUOlHIeb9U0zqaDlbqjT'
      },
      method: 'GET',
      success(res) {
        that.globalData.baidu_token = res.data.access_token;
      }
    }) 
  }
})