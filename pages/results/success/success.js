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
      if(url.search("https") == -1)
      {
        return url.replace("http", "https")
      }
      else
      {
        return url
      }
    }

  },

  //放大预览图片
  biggerImg: function (e) {
    var _this = this;
    wx.getStorage({
      key: "responseList",
      success: function (res) {
        wx.previewImage({
          urls: [_this.http_https(res.data[0].baike_info.image_url)],
        })
      },
    })
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
    var _this = this;
    var responseList = JSON.stringify(wx.getStorageSync("responseList"))
    return {
      title: wx.getStorageSync("responseList")[0].name ,
      path: '/pages/history/history?responseList=' + responseList,//分享地址带参数
      imageUrl: _this.http_https(wx.getStorageSync("responseList")[0].baike_info.image_url),
    }
  }
})