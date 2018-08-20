// pages/addSpendFrom/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  setSpendItem(e) {
    let newItem = e.detail.value;
    console.log(e.detail,'提交表单');
    wx.getStorage({
      key: 'itemList',
      success: function(res) {
        let itemList = res.data;
        console.log(itemList,'存储的数据')
        itemList.push(newItem);
        wx.setStorage({
          key: 'itemList',
          data: itemList,
          success: function () {
            console.log('多次存储成功！！！')
          }
        })
      },
      fail: function(e){
        let itemList = [];
        itemList.push(newItem)      
        wx.setStorage({
          key: 'itemList',
          data: itemList,
          success: function () {
            console.log('第一次存储成功！！！')
          }
        })
      }
    })
  }
})