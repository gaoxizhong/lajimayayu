const wx_request = require('../../assets/js/wx_request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[],
    shop_list:[],
    chenge:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getdata();
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
  getdata(){
    let that = this;
    that.getshopcategory();
    that.getShopByCate();
  },
// 获取分类栏目数据
getshopcategory(){
  let that = this;
  wx_request.get({
    url:'/shop/category',
    data:{}
  }).then(res =>{
    if(res.code == 200){
      console.log(res)
      that.setData({
        tabs:res.data
      }) 
    }
  })
},
getCateShop(e){
  console.log(e)
  let that = this;
  that.setData({
    shop_list: [],
    chenge: e.currentTarget.dataset.index,
  })
  that.getShopByCate();
},
//根据类目获取商家信息
getShopByCate() {
let that = this;
wx.showLoading({
  title: '加载中...',
})
wx_request.get({
  url:'/shop/index',
  data:{ 
    category_id:that.data.chenge + 1
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
gotolistdetail(e){
  console.log(e)
  let id = e.currentTarget.dataset.id;
  const url = '/pages/listdetail/index?id='+id
  wx.navigateTo({
      url
    })
  }
})