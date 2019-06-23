// pages/index/camera/camera.js
var app = getApp();

Page({
  data: {
    request_url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
    hiddenName: true,
    flash: "off"
  },

  execSetStorage: function (response) { //同步数据到缓存并跳转到结果页面
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

  
  waitFuc: function () {  //等待函数
    wx.showLoading({
      title: '查询中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  //闪光灯操作函数
  flashFunc: function () {  //等待函数
    if (this.data.flash == "off") {
      this.data.flash = "on"
    } else if (this.data.flash == "on") {
      this.data.flash = "off"
    } else { }

    this.setData({
      flash: this.data.flash,
    })
  },

  //防止用户禁用相册保存后无法找到设置
  saveFunc: function () {  //等待函数
    this.openConfirm('打开相册权限后，照片将自动保存！')
  },


  //拍照图片事件处理函数
  takePhotoFunc() {
    var that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        var tempFilePaths = res.tempImagePath; // 返回选定照片的本地文件路径列表
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePaths,
        });
        that.imageAddressSetStorage(tempFilePaths),
          wx.getFileSystemManager().readFile({
            filePath: tempFilePaths, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              var imageStr = res.data;
              //  console.log('data:image/png;base64,' + res.data)
              var url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant';
              var token = app.globalData.baidu_token;
              that.waitFuc();
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
                  if (res.data.result[0].score === 0) {
                    that.notPlant()
                  }
                  else {
                    that.execSetStorage(res)
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
      }
    })
  },

  //用户未授权相机调用原生相机触发函数
  cameraError(e) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.camera'])
          this.openConfirm('无法打开摄像头，请打开摄像头！')
      }
    }) 
  },

//打开相机权限设置
  openConfirm: function (msg) {
    var that = this;
    wx.showModal({
      content: msg,
      confirmText: "是",
      cancelText: "否", 
      success: function (res) {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => { 
              //权限确认后回到第一个tab页面
              wx.switchTab({
                url: '../../index/index',
              })
            }
          });
          
        } else {
         
        }
      }
    });
  },

  onLoad: function () {
  }
})
