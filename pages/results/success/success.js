let interstitialAd = null
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
  showAd: function () {
    // 定时器实现1秒钟后显示
    setTimeout(function () {
      // 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }
    }, 1000);
  },
  onShow: function () {
    this.showAd()
    this.execGetStorage("responseList") //页面启动渲染时获取并渲染
  },

  onLoad: function (options) {
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-1382065c80410acf'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }
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