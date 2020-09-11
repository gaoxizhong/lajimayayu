const  wx_request = require('../../assets/js/wx_request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chenge:0,
    tabs:[
      {id:1,category_name:'已预约'},
      {id:2,category_name:'已完成'},
    ],
    shop_list:[],
    mrak:false,
    color:['#6adea0','#4e91ff','#ff9b66','#cd00d4']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getShopByCate(1);

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

  },
  getCateShop(e){
    console.log(e)
    let that = this;
    let chenge = e.currentTarget.dataset.index;
    that.setData({
      shop_list: [],
      chenge,
    })
    that.getShopByCate(chenge + 1);
  },
  //根据类目获取信息
getShopByCate(id) {
  let that = this;
  wx.showLoading({
    title: '加载中...',
  })
  wx_request.get({
    url:'/personal/reserve_order',
    data:{ 
      member_id:wx.getStorageSync('member_id'),
      status:id,
    }
  }).then( res => {
    if ( res.code == 200 ) {
      wx.hideLoading();
      that.setData({
        shop_list:res.data
      })
    } else{
      wx.hideLoading();
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1000
      })
    }
  }).catch( error => {
    console.log(error);
  })
  },
})