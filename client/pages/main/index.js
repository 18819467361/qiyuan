// pages/main/index.js
var { surplus} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 1000,
    balance: 1000,
    spendList: [{
      kind: '糖水',
      location: '车陂',
      cost: 12,
      name:'叶嘉源',
      time:'2018/8/20'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      console.log('页面加载')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    console.log('页面显示')
    wx.getStorage({
      key: 'itemList',
      success: function(res) {
       console.log(res.data,'respond')
        let balance = surplus(that.data.total, res.data); //剩余资金
        that.setData({ spendList: res.data,balance: balance});
      },
      fail:function(e){
        console.log(e,'错误信息')
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 添加一项报销
  goSetSpendItem(){
    wx.navigateTo({url:'../addSpendFrom/index'})
  },
  //跳转到消费详情页
  costDetailPage(e) {
    console.log('跳到:',e);
    let name = e.currentTarget.dataset.name;
    let nameCode = 0;
    if (name=='哥葛'){
      nameCode = 0;//显示哥葛的报销
    }else{
      nameCode = 1;//显示宝贝的报销
    }
    wx.navigateTo({ url: '../costDetail/index?name='+nameCode})
  }
})