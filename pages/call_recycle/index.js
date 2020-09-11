var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
const wx_request = require('../../assets/js/wx_request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member_id:'',
    name:'',
    mobile:'',
    address:'',
    startDate: "请选择",
    startDate1: "",
    multiArray: [
      ['今天', '明天', '3-2', '3-3', '3-4', '3-5'],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 10, 20]
    ],
    multiIndex: [0, 0, 0],
    waylist:[
      {id: 1 , name:'现金'},
      {id: 2 , name:'能量'}
    ],
    means:'',
    typelist:[
      {id: 1 , name:'废品',seled:false},
      {id: 2 , name:'图书',seled:false},
      {id: 3 , name:'衣服',seled:false},
      {id: 4 , name:'其他',seled:false}
    ],
    type:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      member_id:wx.getStorageSync('member_id')
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
  input_name(e){
    this.setData({
      name:e.detail.value
    })
  },
  input_mobile(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  input_address(e){
    let that = this;
    that.setData({
      address:e.detail.value
    })
  },
  logintest(e) {
    console.log('校验是否登录');
    let member_id = wx.getStorageSync('member_id')
    if (!member_id) {
      console.log('未授权用户')
      wx.showModal({
        title: '呼叫预约，请先登录！',
        success: function (res) {
          if (res.confirm) {
            console.log('点击了确认');
            wx.reLaunch({
              url: '/pages/mine/index'
            })
          } else if (res.cancel) {
            console.log('点击了取消')
          }
        }
      })
    }
  },
  changeWealfareGoods() {
    let that = this;
    if (that.data.welfare_page >= (that.data.welfareGoodsCount)){
      console.log(that.data.welfareGoodsCount)
      console.log(that.data.welfare_page)
      that.setData({
        welfare_page: 0
      })
      that.getWelfareGoods();
      return
    }
    that.setData({
      welfare_page: that.data.welfare_page += 1
    })
    that.getWelfareGoods();
  },
  pickerTap: function () {
    date = new Date();
    console.log(date)
    var monthDay = ['今天', '明天'];

    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();
    console.log(currentHours);
    if (currentHours + 4 >= 18) {
      monthDay = ['明天'];
    }
    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    if (data.multiIndex[0] === 0 && monthDay[0] == '今天') {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }
    console.log(hours)
    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },
  bindMultiPickerColumnChange: function (e) {
    date = new Date();
    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];
    currentHours = date.getHours();
    currentMinute = date.getMinutes();
    if (currentHours + 4 > 18) {
      monthDay = ['明天'];
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0 && monthDay[0] == '今天') {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 0 && monthDay[0] == '明天') {
      that.loadHoursMinute(hours, minute);
      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0 && monthDay[0] == '今天') {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0 && monthDay[0] == '今天') {

        // 如果第一列为 '今天'并且第二列为当前时间

        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }

      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },
  loadData: function (hours, minute) {
    date = new Date();
    currentHours = date.getHours();
    currentMinute = date.getMinutes();
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours+4+1; i < 19; i++) {
        if (i < 7) {
          i = 7;
          hours.push(i);
        } else {
          hours.push(i);
        }
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours + 4; i < 19; i++) {
        if (i < 7) {
          i = 7;
          hours.push(i);
        } else {
          hours.push(i);
        }
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },
  loadHoursMinute: function (hours, minute) {
    date = new Date();
    currentHours = date.getHours();
    currentMinute = date.getMinutes();      
    // 时
    for (var i = 7; i < 19; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },
  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 4; i < 19; i++) {
        if (i < 7) {
          i = 7;
        } else {
          hours.push(i);
        }
      }
    } else {
      // 时
      for (var i = currentHours+4; i <= 19; i++) {
        if (i < 7) {
          i = 7;
        } else {
          hours.push(i);
        }
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },
  bindStartMultiPickerChange: function (e) {
    console.log(e)
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var monthDay1 = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];
    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getYear();
      console.log(year)
      monthDay = month + "月" + day + "日";
      monthDay1 = month + "-" + day;

    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";
      monthDay1 = (date1.getMonth() + 1) + "-" + date1.getDate();

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
      monthDay1 = month + "-" + day;

    }

    var startDate = monthDay + " " + hours + ":" + minute;
    var startDate1 = monthDay1 + "-" + hours + ":" + minute;
    console.log(startDate)
    console.log(startDate1)
    if (minute == 0){
      that.setData({
        startDate: startDate + 0,
        startDate1
      })
    }else{
      that.setData({
        startDate: startDate,
        startDate1
      })
    }
    
  },
  sele_way(e){
    console.log(e)
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.setData({
      means:id
    })
  },
  sele_type(e){
    let that = this;
    let typelist = that.data.typelist;
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let seled = typelist[index].seled;
    typelist[index].seled = !seled;
    let type = [];
    typelist.forEach(ele =>{
      if(ele.seled == true){
        type.push(ele.name);
      }
    })
    that.setData({
      typelist,
      type,
    })
    console.log(that.data.type)
  },
  submit_btn(){
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
    if (that.data.startDate1== '') {
      wx.showToast({
        title: '预约时间不能为空！',
        icon: 'none',
      })
      return
    }
    if (that.data.means == '') {
      wx.showToast({
        title: '请选择兑换方式！',
        icon: 'none',
      })
      return
    }
    if (that.data.type.length == 0) {
      wx.showToast({
        title: '请选择回收类型！',
        icon: 'none',
      })
      return
    }
    let perm = {
      member_id: wx.getStorageSync('member_id'),
      name: that.data.name,
      mobile: that.data.mobile,
      address: that.data.address,
      reserve_at:that.data.startDate1,
      means:that.data.means,
      type:that.data.type
    }
    wx.showLoading({
      title: '提交中...',
      icon:'none'
    })
    wx_request.post({
      url:'/index/reserve',
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
          wx.reLaunch({
            url: '/pages/reserva_success/index',
          })
        },2000)

      } else {
      wx.hideLoading();
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    }).catch(e => {
      wx.hideLoading();
      wx.showToast({
        title: "数据异常",
        icon:'none'
      })
      console.log(e)
    })
  
  },
})