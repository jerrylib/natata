import {
  API_SERVICE
} from './../../constants/api'
Page({
  data: {
    hasUserInfo: false,
    error: false,
    userInfo: {
      tel: '',
      name: '',
      avatar: '',
      wx_open_id: '',
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo()
  },
  // 最终提交保存
  async tapSave() {
    console.log(this.data.userInfo);
    // return
    wx.request({
      url: API_SERVICE + '/api/user',
      method: 'POST',
      data: {
        "avatar": this.data.userInfo.avatar,
        "name": this.data.userInfo.name,
        "wx_open_id": this.data.userInfo.wx_open_id
      },
      success: (res) => {
        console.log('res', res);
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        wx.navigateTo({
          url: '../games/index'
        })
      }
    })
  },
  // 输入昵称
  onInput(e) {
    const {
      value
    } = e.detail
    console.log('输入昵称', value);
    this.setData({
      userInfo: {
        ...this.data.userInfo,
        name: value
      }
    })
  },
  // 选择头像
  onChooseAvatar(e) {
    console.log('选择头像', e);
    const {
      avatarUrl
    } = e.detail
    this.setData({
      ['userInfo.avatar']: avatarUrl
    })
  },
  async getUserInfo() {
    wx.showLoading({
      title: '用户数据加载中...',
    })
    wx.login({
      success: (res) => {
        if (res.code) {
          // 获取到用户登录凭证 code
          const code = res.code;
          // 将 code 发送给后端服务器
          wx.request({
            url: API_SERVICE + '/api/wx',
            data: {
              code: code
            },
            method: 'POST',
            success: (res) => {
              console.log('res.data=', res.data);
              if (!!res.data.id) {
                wx.navigateTo({
                  url: '../games/index'
                });
                return
              }
              this.setData({
                userInfo: res.data,
                hasUserInfo: false
              })
            },
            fail: (err) => {
              console.error('请求后端接口失败', err);
              wx.hideLoading();
              this.setData({
                error: true
              })
            },
          });
        } else {
          console.error('获取用户登录凭证失败', res.errMsg);
        }
      },
      fail: (err) => {
        console.error('调用 wx.login 失败', err);
        wx.hideLoading();
        this.setData({
          error: true
        })
      },
    });
  },
  noLogin() {
    wx.exitMiniProgram();
  },
})