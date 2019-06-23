// pages/history/history.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    responseList:"",
    image_url_https:""
  },

  //获取图片地址
  imageAddressGetStorage: function () {
    var res = wx.getStorageSync("imageAddress");
    return res;
  },

  //http转https
  http_https: function (url) {
    if (url == undefined) {
      return this.imageAddressGetStorage()
    }
    else {
      return url.replace("http", "https")
    }

  },
  execAddDataToStroage:function(data){ //增加数据到缓存
    var res = wx.getStorageSync("hisList");
    var afterRes = res.unshift(data);
    return afterRes;
  },

  execDelDataToStorage: function (id) { //删除缓存指定数据
    var res = wx.getStorageSync("hisList");
    res.splice(id, 1);
    return res;
  },

  execClearDataToStorage: function (id) { //清空缓存数据
    wx.clearStorageSync();
  },

  execGetAllTempData: function () {//从缓存获取数据
    var res = wx.getStorageSync("hisList");
    return res;
  },
  
  execSetStorageSync: function (res) { //同步数据到缓存
    wx.setStorageSync("hisList", res)
  },


  longPress: function (event) {
    var that = this;
    //var id = event.currentTarget.dataset.tempId;  单个删除ID获取，已经屏蔽，目前采用清空。
    wx.showModal({
      title: '提醒',
      content: '确定后你将删除记录！',
      success: function (res) {
        if (res.confirm) { //判断用户是否点击了确定
        that.execClearDataToStorage(),
          that.execGetStorageAndRender("responseList") 
        }
      }
    })
  },
  
  execGetStorageAndRender: function (response) {  //从缓存获取数据并渲染页面
    var _this = this;
    wx.getStorage({
      key: response,
      success: function (res) {
        _this.setData({                  //从缓存获取成功执行渲染
          responseList: res.data,
          image_url_https: _this.http_https(res.data[0].baike_info.image_url)    
        }) 
      },
      fail: function (res) {             //从缓存获取失败或未查询到时执行渲染
        _this.setData({
          responseList: ""
        })
      }
    })
  },

  share: function () {
    this.onShareAppMessage()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    if (options.responseList !=undefined){
    wx.setStorage({
      key: 'responseList',
      data: JSON.parse(options.responseList),
    })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.execGetStorageAndRender("responseList") //页面启动渲染时获取并渲染
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var responseList = JSON.stringify(wx.getStorageSync("responseList"))
    console.log(JSON.stringify(responseList))
    return {
      title: '小草识花',//分享内容
      path: '/pages/history/history?responseList=' + responseList ,//分享地址
    }
  }
})