//index.js
var app = getApp();

Page({
  data: {
    request_url:"https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general"
  },

  wait:function(){    //需要在等待中显示
    wx.navigateTo({
    url: '/pages/results/wait/wait',
    })
  },
  //拍照图片事件处理函数
  camera_pic_serarch: function(){
    var _this = this;
    wx.chooseImage({
      count: 1, // 限定只能选择一张照片
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['camera'], // 指定选择相机
      success: function (res) {

        // 返回选定照片的本地文件路径列表
        var tempFilePaths = res.tempFilePaths;
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            var imageStr = res.data;
          //  console.log('data:image/png;base64,' + res.data)
            var url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant';
            wx.getStorage({
              key: 'baidu_token',
              success: function(res) {
                var token = res.data;
               // console.log('token,' + token);
                wx.request({
                  url: url + '?access_token=' + token,
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  data: {
                    'image': imageStr,
                    'baike_num': 1
                  },
                  method: 'POST',
                  success(res) {
                    console.log("图片百度返回内容" + res);
                  }
                }) 
              },
            })
            

          }
        })
        
      }
    })
  },
  
  //本地图片事件处理函数
  local_pic_search: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 限定只能选择一张照片
      sizeType: ['compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album'], // 指定选择相册
      success: function (res) {

        console.log("token", token);
        // 返回选定照片的本地文件路径列表
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://api.weixin.qq.com/upload', //接口地址，格式需要调整,必须是https
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          
          success: function (res) {        //上传成功获取到数据
            var data = res.data
              //获取数据并加入到链接中供success页面使用
              wx.navigateTo({
                url: "/pages/results/success/success?name=" + data.name + "&brief=" + data.brief
              });
          },

          fail: function (res) {         //失败处理
            wx.navigateTo({
              url: "/pages/results/fail/fail"
            });
          },
          
        })
      }
    })
  },


  onLoad: function () {
  }
})
