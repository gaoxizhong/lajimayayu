const wx_request = require('../../assets/js/wx_request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    details:'',
    images:[],
    pop1:false,
    code:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    that.getshopdetails(id);
    wx.login({
    success: function(data) {
      let loginData = data;
      wx.setStorageSync('loginData',loginData);
      that.setData({
        code:loginData.code
      })
    }
   })
   let member_id = wx.getStorageSync('member_id');
   that.setData({
    member_id,
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
    
  },
  // 获取详情信息
  getshopdetails(id){
    let that = this;
    let ids = id;
    wx_request.get({
      url:'/shop/details',
      data:{ id:ids }
    }).then(res =>{
      let images = JSON.parse(res.data.images);
      let goods_info = res.data;
      wx.setStorageSync('goods_info',goods_info);
        that.setData({
          details: goods_info,
          images
        })
    })
  },
  swiperindexchange(e){
    this.setData({
      current:e.detail.current
    })
  },

  getUserInfo: function (e) { //微信授权 获取个人信息
    let that = this
    wx.setStorageSync('userInfo', e.detail.userInfo)
    that.setData({
      userInfo: e.detail.userInfo
    })
    wx.showLoading({
      title: '正在授权中...',
      mask: true,
    })
    wx_request.post({
      url:'/index/wx_login', 
      data:{
        code: that.data.code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }
    }).then(res => {
      wx.hideLoading();
      if (res.code == 200) {
        console.log("授权成功")
        that.setData({
          pop1: false,
          member_id: res.member_id
        })
        wx.setStorageSync('member_id', that.data.member_id)
        that.gotorderpage();
      }
    }).catch(e => {
      wx.hideLoading();
      app.showToast({
        title: "数据异常",
      })
      console.log(e)
    })
  },
  
  gotorderpage(){
    let that = this;
    let member_id = wx.getStorageSync('member_id');
    if(!member_id){
      that.setData({
        pop1:true
      })
    }else{
      wx.navigateTo({
        url: '/pages/orderpage/index',
      })
    }

  }
})