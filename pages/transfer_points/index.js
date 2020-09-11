const  wx_request = require('../../assets/js/wx_request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    energy:'',
    f_member_id:'',
    is_is:true
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
  input_member(e){
    this.setData({
      f_member_id : e.detail.value
    })
  },
  input_energy(e){
    this.setData({
      energy : e.detail.value
    })
  },
  submit_btn(){
    let that = this;
    if ( that.data.f_member_id =='' ){
      wx.showToast({
        title: '账号不能为空！',
        icon:'none',
      })
      return
    }
    if (that.data.mobile == '') {
      wx.showToast({
        title: '能量不能为空！',
        icon: 'none',
      })
      return
    }
    let perm = {
      member_id: wx.getStorageSync('member_id'),
      f_member_id:that.data.f_member_id,
      energy:that.data.energy
    }
    let is_is = that.data.is_is;
    if(!is_is){
      return
    }

    that.setData({
      is_is:false
    })
    wx.showLoading({
      title: '提交中...',
      icon:'none'
    })
    wx_request.get({
      url:'/personal/turn_energy',
      data:perm
    }).then(res => {
      wx.hideLoading();
      if (res.code == 200) {
        wx.showToast({
          title:'提交成功！',
          icon:'none',
          duration:2000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta:1,
          })
        },2000)

      } else {
      wx.hideLoading();
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
        that.setData({
          is_is:true
        })
      }
    }).catch(e => {
      wx.hideLoading();
      wx.showToast({
        title: "数据异常",
        icon:'none'
      })
      that.setData({
        is_is:true
      })
      console.log(e)
    })
  
  },
})