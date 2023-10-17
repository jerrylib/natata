// pages/end-of-time/index.js
const secondsInDays = 60 * 60 * 1000 * 24
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endOfTimestamp: 0
  },
  fresh() {
    const endOfDays = (1714060800000 - new Date().valueOf()) / secondsInDays
    console.log('this.data.endOfTimestamp=', endOfDays)
    this.setData({
      endOfTimestamp: endOfDays.toFixed(20)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const that = this
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        
        let requestAnimationFrameId;
        let index = 0;
        (function animloop() {
          index++;
          // 每隔4帧刷新一次
          if (index % 4 === 0) {
            that.fresh()
          }
          requestAnimationFrameId = canvas.requestAnimationFrame(animloop);
          // 如果left等于150 停止动画
          if (that.data.endOfTimestamp < 0) {
            cancelAnimationFrame(requestAnimationFrameId)
          }
        })();
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})