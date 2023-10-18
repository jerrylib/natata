// pages/score/index.js
import {
  API_SERVICE
} from './../../constants/api'
const defaultValue = ['李老师', '林兴玉', '丰泽林总', '李彬']
const options = ['李老师', '林兴玉', '丰泽林总', '李彬', '黄嘎嘎', '丰疆黄总', '封封']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: [],
    selectFlag: [],
    inputValue: [],
    options: options
  },
  handleInputChange(e) {
    console.log('e.detail.value=', e)
    const updateIndex = e.currentTarget.dataset.index
    const value = e.detail.value
    const inputValue = this.data.inputValue
    const nextInputValue = inputValue.map((item, index) => {
      if (index === updateIndex) {
        return value
      }
      return item
    })
    console.log('nextInputValue=', nextInputValue)
    this.setData({
      inputValue: nextInputValue
    })
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const values = e.detail.value
    this.setData({
      select: values,
      selectFlag: options.map(i => values.indexOf(i) !== -1)
    })
  },
  reset() {
    this.setData({
      select: defaultValue,
      selectFlag: options.map(i => defaultValue.indexOf(i) !== -1),
      inputValue: options.map(i => defaultValue.indexOf(i) !== -1 ? 0 : '')
    })
  },
  submit() {
    const that = this
    const inputValue = this.data.inputValue
    const selectFlag = this.data.selectFlag
    const result = options.map((item, index) => {
      if (!selectFlag[index]) return
      return {
        name: item,
        score: 1 * inputValue[index]
      }
    }).filter(item => item !== undefined)
    console.log('result=', result)
    wx.showLoading({
      title: '数据提交中...',
    })
    wx.request({
      url: API_SERVICE + '/api/record',
      method: 'POST',
      data: result,
      success(res) {
        console.log('res=', res)
        if (res.statusCode === 200) {
          wx.showToast({
            title: '数据提交成功',
          })
          that.reset()
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'error'
          })
        }
        wx.hideLoading()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.reset()
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