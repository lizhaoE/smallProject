// pages/history/history.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
   
  },
  longPress: function () {
    wx.showModal({
      title: '提醒',
      content: '你将清空小程序本地所有缓存！',
      success: function (res) {
        if (res.confirm) { //判断用户是否点击了确定
          wx.clearStorageSync();
        }
      }
    })
  },

  execSetStorageSync: function () { //同步临时数据到缓存
    var res = require("../temp_for_test/data.js").temp_data
    wx.setStorageSync("temp_data", res)
  },
  getAllTempData: function () {//从缓存获取数据
    var res = wx.getStorageSync("temp_data");
    console.log(res);
    return res;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.execSetStorageSync()    //屏蔽临时数据，直接操作缓存数据
    this.setData({
      hisList: this.getAllTempData()
    })
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

  }
})