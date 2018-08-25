// pages/addSpendFrom/index.js
var bmap = require('../../libs/bmap-wx.min.js');
var { formatTime, validateForm} = require('../../utils/util.js')
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'0',//日期
    money: '',//金额
    whoes:[
      { value: '哥葛', name: '哥葛', checked: true},
      { value: '宝贝', name:'宝贝'}
      ],
    markers: [],
    location: '123'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initFrom();
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
  //检查金额输入是否正确
  checkMoney(e){
    console.log('输入的金额：',e.detail.value);
    let money = e.detail.value;
    console.log(typeof money)
    if(!Number(money)){
      money = money.slice(0,-1)
      console.log(money,'去除错误')
    }
    this.setData({money:money})
    console.log('new Money:',Number(money));
  },
  //设置日期
  pickDate: function (e) {
    this.setData({date:e.detail.value})
    console.log(e, 'dateChange')
  },
  //存储数据到本地
  setSpendItem(e) {
    let newItem = e.detail.value;
    console.log(e.detail,'提交表单');
    let verify=validateForm(newItem);
    if(verify=== true){
      wx.getStorage({
        key: 'itemList',
        success: function (res) {
          let itemList = res.data;
          console.log(itemList, '存储的数据')
          itemList.unshift(newItem);
          wx.setStorage({
            key: 'itemList',
            data: itemList,
            success: function () {
              wx.showToast({
                title: '记录成功！',
                icon: 'success',
                duration: 1000,
                success: function () {
                  //记录成功，返回首页
                  setTimeout(() => {
                    wx.navigateTo({ url: '../main/index' })
                  }, 1100)
                }
              })
              console.log('多次存储成功！！！')
            }
          })
        },
        fail: function (e) {
          let itemList = [];
          itemList.push(newItem)
          wx.setStorage({
            key: 'itemList',
            data: itemList,
            success: function () {
              wx.showToast({
                title: '记录成功！',
                icon: 'success',
                duration: 1000,
                success: function () {
                  //记录成功，返回首页
                  setTimeout(() => {
                    wx.navigateTo({ url: '../main/index' })
                  }, 1100)
                }
              })
              console.log('第一次存储成功！！！')
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: verify,
        icon: 'none',
        duration: 1500
      })
    }
    
  },
  setAddress: function (e) {
    console.log('setAddress:', e.detail.value)
    this.setData({location: e.detail.value})
  },
  //初始化表单，设置当前时间、当前位置
  initFrom(){
    var that = this;
    //初始化时间
    this.setData({ date: formatTime(new Date()) })    
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'FxYIHnfOgLzY0lBMfq6iTrxVC0qZbXc8'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log('get GPS success!');
      console.log(data);
      console.log('get GPS success!')
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData,
        location: wxMarkerData[0].address
      });

    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    }); 
  }
})