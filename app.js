//app.js
App({
  globalData:{
    token: "token",
  },
  onLaunch: function () {
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
        console.log("token" + res.data.access_token);
        wx.setStorage({
          key: 'baidu_token',
          data: res.data.access_token,
        })

      }
    }) 
  }
})