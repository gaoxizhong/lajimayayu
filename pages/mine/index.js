const wx_request = require('../../assets/js/wx_request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member_id:'',
    userInfo:'',
    personalInfo:'',
    pop1:false,
    is_member:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.login({
    success: function(data) {
      console.log(data)
      let loginData = data;
      wx.setStorageSync('loginData',loginData);
      that.setData({
        code:loginData.code
      })
    }
   })
   let member_id = wx.getStorageSync('member_id');
   if(!member_id){
     that.setData({
       pop1:true
     })
   }else{
    that.setData({
      member_id: member_id,
      pop1:false
    })
   }
   that.setData({
    member_id,
  })
     // 禁止右上角转发
     wx.hideShareMenu();
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
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              wx.setStorageSync('userInfo', res.userInfo);
              that.setData({
                userInfo:res.userInfo
              })
            }
          })
        }
      }
    })
    that.getPersonInfo();
    wx_request.get({
      url:'/personal/turn_members',
      data:{}
    }).then(res =>{
      if(res.code == 200){
        let member_id = wx.getStorageSync('member_id');
        let true_memberid = res.data.member_id;
        let truue = true_memberid.find(ele =>{
          return ele == member_id
        })
        if(truue){
          that.setData({
            is_member:true
          })
        }
      }
    })
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
  onPullDownRefresh() {
    let that = this;
    that.getPersonInfo();
    wx.stopPullDownRefresh();

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
  getUserInfo: function (e) { //微信授权 获取个人信息
    console.log(e)
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
        that.onLoad()
      }
    }).catch(e => {
      wx.hideLoading();
      app.showToast({
        title: "数据异常",
      })
      console.log(e)
    })
  },
  //获取个人信息
  getPersonInfo() {
    let that = this;
    wx_request.get({
      url:'/personal/index', 
      data:{
        member_id: that.data.member_id
      }
    }).then(res => {
      if (res.code == 200) {
        wx.setStorageSync('personalInfo', res.data)
        that.setData({
          personalInfo: res.data.result,
        });

      }
    })
  },
  gotoorderlist(){
    wx.navigateTo({
      url: '/pages/order_list/index',
    })
  },
  gotorecyorder(){
    wx.navigateTo({
      url: '/pages/recycle_order/index',
    })
  },
  gotozhuan(){
    wx.navigateTo({
      url: '/pages/transfer_points/index',
    })
  }
})