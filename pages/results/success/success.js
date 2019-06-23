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

  onShow: function () {
    this.execGetStorage("responseList") //页面启动渲染时获取并渲染
  },

  onLoad: function (options) {
    if (options.responseList != undefined) {
      wx.setStorage({
        key: 'responseList',
        data: JSON.parse(options.responseList),
      })
    }
  },
  
  onShareAppMessage: function () {
    var responseList = JSON.stringify(wx.getStorageSync("responseList"))
    return {
      title: '小草识花',//分享内容
      path: '/pages/history/history?responseList=' + responseList,//分享地址
    }
  }
})