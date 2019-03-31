Page({

  data: {
    
  },

  execGetStorage: function (response) { //同步数据到缓存并跳转到结果页面
  var _this = this;
    wx.getStorage({
      key: response,
      success: function (res) {
        _this.setData({
          responseList:res.data
        })
      }
      
    })
      
  },

  onLoad: function () {
    this.execGetStorage("responseList")

  },
  
})