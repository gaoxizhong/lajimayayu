const wx_request = require('../../assets/js/wx_request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperimg:[],
    shop_list:[],
    text:'这是一条公告广告信息.....'
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
    this.getswiperlist();
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
  // 获取轮播list
  getswiperlist(){
    let that = this;
    wx_request.get({
      url:'/index/index',
      data:{}
    }).then( res =>{
     that.setData({
      swiperimg : res.data.result,
      shop_list: res.data.res
     })
    })
  },
  gotolistdetail(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    const url = '/pages/listdetail/index?id='+id
    wx.navigateTo({
        url
      })
    },
    gotocallrecycle(){
      wx.navigateTo({
        url: '/pages/call_recycle/index',
      })
    }
})