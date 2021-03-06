// pages/costDetail/index.js
var {
  sortList,
  totalCost,
  sortByMonth
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spendList: [{
      kind: '糖水',
      location: '车陂',
      cost: 12,
      name: '叶嘉源',
      time: '2018/8/20'
    }],
    GGCostList: [],
    MMCostList: [],
    GGCost: 0,
    MMCost: 0,
    renderList: [],
    GGClass: '',
    MMClass: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    console.log('页面显示')
    wx.getStorage({
      key: 'itemList',
      success: function(res) {
        console.log(res, 'resss')
        let {
          GGCostList,
          MMCostList
        } = sortList(res.data);
        GGCostList = sortByMonth(GGCostList); //排序
        MMCostList = sortByMonth(MMCostList); //排序
        that.setData({
          GGCostList,
          MMCostList
        })
        that.setData({
          GGCost: totalCost(GGCostList),
          MMCost: totalCost(MMCostList)
        })
        that.setData({
          renderList: that.data.GGCostList,
          GGClass: 'active',
        })
      },
      fail: function(e) {
        console.log(e, '错误信息')
      }
    })
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
  showDetail(event) {
    let target = event.currentTarget;
    if (target.id == 'gg') {
      this.setData({
        renderList: this.data.GGCostList,
        GGClass: 'active',
        MMClass: ''
      })
    } else {
      this.setData({
        renderList: this.data.MMCostList,
        MMClass: 'active',
        GGClass: ''
      })
    }
  }
})