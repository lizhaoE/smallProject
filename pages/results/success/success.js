Page({

  data: {
    
  },
  //获取图片地址
  imageAddressGetStorage: function () {
    var res = wx.getStorageSync("imageAddress");
    return res;
  },

  
  http_https: function (url) {
    if (url == undefined) {
      return this.imageAddressGetStorage()
    }
    else {
      return url.replace("http", "https")
    }

  },


  execGetStorage: function (response) { //同步数据到缓存并跳转到结果页面
  var _this = this;
    wx.getStorage({
      key: response,
      success: function (res) {
        _this.setData({
          responseList:res.data,
          image_url_https: _this.http_https(res.data[0].baike_info.image_url)
        })
      }
      
    })
      
  },

  onLoad: function () {
    this.execGetStorage("responseList")

  },
  
})