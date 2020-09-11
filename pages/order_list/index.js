const wx_request = require('../../assets/js/wx_request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let that = this;
    that.setData({
      list_data:[]
    })
    that.getorderlistdata();
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

  },
  getorderlistdata(){
    let that = this;
    wx_request.get({
      url:'/personal/shop_order',
      data:{
        member_id:wx.getStorageSync('member_id')
      }
    }).then(res =>{
      if(res.code == 200){
        that.setData({
          list_data:res.data
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    }).catch(e =>{
      console.log(e)
    })
  }
})