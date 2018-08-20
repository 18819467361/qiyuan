// pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 1000,
    balance: 1000,
    spendList: [{
      kind: '糖水',
      where: '车陂',
      cost: 12,
      who:'叶嘉源',
      when:'2018/8/20'
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
        that.setData({spendList:res.data})
        console.log(this)
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
  }
})