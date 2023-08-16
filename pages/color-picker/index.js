// pages/color-picker/index.js
import {
  generateRandomLightColor,
  generateColor,
  adjustColor
} from './../../utils/color'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: 1,
    score: 0,
    array: []
  },

  init() {
    this.setData({
      level: 1,
      score: 0,
      array: []
    })
  },
  nextLevel() {
    this.setData({
      level: this.data.level + 1,
      score: this.data.score + this.data.level,
    })
    this.generateTheCurrentLevelData()
  },
  reset() {
    this.init()
    this.generateTheCurrentLevelData()
  },
  getColor() {
    const commonColor = generateColor()
    const level = this.data.level
    const randomRed = Math.random() * (100 - 5 * level)
    const randomBlue = Math.random() * (100 - 5 * level)
    const randomYellow = Math.random() * (100 - 5 * level)
    const correctColor = adjustColor(commonColor, randomRed, randomBlue, randomYellow)
    return {
      commonColor,
      correctColor
    }
  },
  /**
   * 生成当前关卡数据
   */
  generateTheCurrentLevelData() {
    wx.showLoading({
      title: '关卡生成中...'
    })
    const DEFAULT_ARRAY_LENGHT = 15
    const targetIndex = Math.round(Math.random() * DEFAULT_ARRAY_LENGHT)
    const {
      commonColor,
      correctColor
    } = this.getColor()
    const nextArray = Array.from({
      length: DEFAULT_ARRAY_LENGHT
    }, (_, index) => index + 1).map((item) => {
      return {
        name: item,
        targetSymbol: item === targetIndex,
        backgroundColor: `background-color: ${item === targetIndex ? correctColor : commonColor};`
      }
    })
    this.setData({
      array: nextArray
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000);
  },
  triggerIndex(event) {
    const index = event.currentTarget.dataset.index;
    const selectedItem = this.data.array[index]
    if (selectedItem.targetSymbol) {
      // 在合适的时机调用 wx.showToast() 方法
      wx.showToast({
        title: '恭喜您，答对了！', // 提示的内容
        icon: 'none', // 提示图标，'none' 表示不显示图标，可选值：'success', 'loading', 'none'
        duration: 2000, // 提示的延迟时间，单位为毫秒（ms），2000ms 即 2 秒
        mask: true, // 是否显示透明蒙层，防止触摸穿透，true 表示显示，false 表示不显示
        success: () => {
          this.nextLevel()
          this.generateTheCurrentLevelData()
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: `很遗憾，你通过了${this.data.level-1}关，共计获得了${this.data.score}分！`,
        showCancel: false, // 是否显示取消按钮
        cancelText: '取消', // 取消按钮的文字，showCancel为true时生效
        confirmText: '确定', // 确定按钮的文字
        success: (res) => {
          if (res.confirm) {
            // 用户点击了确定按钮
            this.reset()
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
    this.generateTheCurrentLevelData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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