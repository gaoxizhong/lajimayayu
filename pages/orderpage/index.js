const wx_request = require('../../assets/js/wx_request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_info:'',
    information:false,
    name:'',
    mobile:'',
    address:'',
    address_detail:'',
    goods_info:'',
    shipping:'0.00',
    remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let goods_info = wx.getStorageSync('goods_info');
    console.log(goods_info)
    that.setData({
      goods_info,
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
    let that = this;
    that.getaddress_info();
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
  getaddress_info(){
    let that = this;
    wx_request.get({
      url:'/shop/address_info',
      data:{
        member_id:wx.getStorageSync('member_id')
      }
    }).then(res =>{
      if(res.code == 200){
        console.log(res)
        that.setData({
          address_info:res.data?res.data:'',
          name: res.data.name,
          mobile: res.data.mobile,
          address_detail: res.data.address_detail,
          address: res.data.address,
        })
      }
    })
  },

  contact_name(e){
    let that = this;
    that.setData({
      name:e.detail.value
    })
  },
  contact_phone(e){
    let that = this;
    that.setData({
      mobile:e.detail.value
    })
  },
  address(e){
    let that = this;
    that.setData({
      address:(e.detail.value[0] + e.detail.value[1] + e.detail.value[2])
    })
  },
  address_detail(e){
    let that = this;
    that.setData({
      address_detail:e.detail.value
    })
  },
  getvalueliuyan(e){
    this.setData({
      remark:e.detail.value
    })
  },
  filladdress(){
    this.setData({
      information:true
    })
  },
  mask1(){
    this.setData({
      information:false
    })
  },
  // 禁止穿透滚动
  myCatchTouch(){
    return
  },
  //点击信息弹窗确定按钮
queding(){
  let that = this;
  if ( that.data.name =='' ){
    wx.showToast({
      title: '名字不能为空！',
      icon:'none',
    })
    return
  }
  if ( that.data.name.length > 4 ){
    wx.showToast({
      title: '名字不能超过四个字！',
      icon:'none',
    })
    return
  }
  if (that.data.mobile == '') {
    wx.showToast({
      title: '电话号码不能为空！',
      icon: 'none',
    })
    return
  }
  if (!(/^1[345678]\d{9}$/.test(that.data.mobile)) ) {
    wx.showToast({
      title: '请输入正确的电话号码！',
      icon: 'none',
    })
    return
  }

  if (that.data.address == '') {
    wx.showToast({
      title: '地址不能为空！',
      icon: 'none',
    })
    return
  }
  if (that.data.address_detail == '') {
    wx.showToast({
      title: '详细地址不能为空！',
      icon: 'none',
    })
    return
  }
  let perm = {
    member_id: wx.getStorageSync('member_id'),
    name: that.data.name,
    mobile: that.data.mobile,
    address_detail: that.data.address_detail,
    address: that.data.address,
  }
  wx_request.get({
    url:'/shop/add_address',
    data:perm
  }).then(res => {
    if (res.code == 200) {
      wx.showToast({
        title:'保存成功！',
        icon:'none'
      })
      that.setData({
        information: false,
      })
      that.getaddress_info();
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  }).catch(e => {
    wx.showToast({
      title: "数据异常",
      icon:'none'
    })
    console.log(e)
  })

},
btn_submit(){
  let that = this;
  if(that.data.address_info == ''){
    wx.showToast({
      title: '请先添加收货地址',
      icon:'none'
    })
    return
  }
  let prams = {
    member_id:wx.getStorageSync('member_id'),
    id:that.data.goods_info.id,
    name:that.data.name,
    mobile:that.data.mobile,
    address_detail:that.data.address_detail,
    address:that.data.address,
    pay_energy:that.data.goods_info.energy,
    remark:that.data.remark
  }
  wx_request.get({
    url:'/shop/order',
    data:prams
  }).then( res=>{
    if(res.code == 200){
      wx.showToast({
        title: res.msg,
        icon:'success'
      })
      wx.reLaunch({
        url: '/pages/submit_success/index',
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