//index.js
var app = getApp();

Page({
  data: {
    request_url:"https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
    hiddenName: true,
    flash:"off"
  },

  execSetStorage: function (response){ //同步数据到缓存并跳转到结果页面
    wx.setStorage({
      key: 'responseList',
      data: response.data.result,
      success: function (res) {
        wx.navigateTo({
          url: '/pages/results/success/success',
        })
      }
    
    })
  },

  imageAddressSetStorage: function (url) { //存储图片地址
    wx.setStorage({
      key: 'imageAddress',
      data: url,
    })
  },

  notPlant: function () {
    wx.navigateTo({
      url: '/pages/results/notplant/notplant',
    })
  },

  successSearch: function (res) {           //拍照&图片上传查询公共函数
    var _this = this;
    var tempFilePaths = res.tempFilePaths; // 返回选定照片的本地文件路径列表
    _this.imageAddressSetStorage(tempFilePaths[0]),
    wx.getFileSystemManager().readFile({
      filePath: tempFilePaths[0], //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        var imageStr = res.data;
        //  console.log('data:image/png;base64,' + res.data)
        var url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant';
        var token = app.globalData.baidu_token;
         _this.waitFuc();
        wx.request({
        url: url + '?access_token=' + token,
        header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
                //'content-type': 'application/json' //返回json数据
        },
         data: {
           'image': imageStr,
            'baike_num': 1
          },
          method: 'POST',
          success(res) {
            if (res.data.result[0].score === 0){
              _this.notPlant()
            }
            else{
                  _this.execSetStorage(res)
            }
              },
          fail: function () {
            wx.navigateTo({
              url: '/pages/results/fail/fail',
            })
          }
        })
      }
    })
  },

  waitFuc: function () {  //等待函数
    wx.showLoading({
      title: '查询中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },


  //跳转到拍照识别页面
  jumpTakePhoto() {
    wx.navigateTo({
      url: 'camera/camera',
    })
  },


  //本地图片事件处理函数
  local_pic_search: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 限定只能选择一张照片
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album'], // 指定选择相册
      success: function (res) {
        that.successSearch(res)
      }
    })
  },

  onLoad: function () {
  }
})
