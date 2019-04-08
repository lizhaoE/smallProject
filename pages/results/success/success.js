Page({

  data: {
    
  },

  execGetStorage: function (response) { //同步数据到缓存并跳转到结果页面
  var _this = this;
    wx.getStorage({
      key: response,
      success: function (res) {
        _this.setData({
          responseList:res.data,
          image_url_https: res.data[0].baike_info.image_url.replace("http", "https") 
        })
      }
      
    })
      
  },

  onLoad: function () {
    this.execGetStorage("responseList")

  },
  
})