// pages/home/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    hasUserInfo:false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  startGame() {
    wx.navigateTo({
      url: '../color-picker/index'
    })
  },
  getUserProfile(e) {
    console.log('loadData')
    wx.getUserProfile({
      desc: '获取用户头像和昵称信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('res=', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    // wx.getUserInfo({
    //   success: (res) => {
    //     console.log('res=', res)
    //     this.setData({
    //       userInfo: res.userInfo
    //     })
    //   },
    // })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.getUserProfile()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})