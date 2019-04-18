//index.js
//获取应用实例
const app = getApp();
const {
  setRecords
} = require('../../utils/storage.js');

Page({
  data: {
    qrcodeData: "",
    foregroundColor: '',
    backgroundColor: '',
    isShowWxAvatar: false
  },
  onLoad: function () {

  },
  onShow: function () {
    this.setData({
      foregroundColor: app.globalData.colorInfo.foregroundColor,
      backgroundColor: app.globalData.colorInfo.backgroundColor
    })
  },
  onTextChange: function (e) {
    this.setData({
      qrcodeData: e.detail.value
    });
  },
  tapSubmit: function (avatarUrl) {
    const {
      isShowWxAvatar,
      qrcodeData,
      foregroundColor,
      backgroundColor
    } = this.data;
    const qrcodeType = isShowWxAvatar ? 'avatar' : 'normal';
    const id = setRecords(qrcodeData, qrcodeType, foregroundColor, backgroundColor, avatarUrl);
    wx.navigateTo({
      url: `/pages/qrcode/qrcode?id=${id}`
    })
  },
  toPickColor(e) {
    const colorid = e.currentTarget.dataset.colorid;
    wx.navigateTo({
      url: `/pages/picker/picker?type=${colorid}`
    })
  },
  setUserInfo(e) {
    if (e.detail.userInfo && e.detail.userInfo.avatarUrl) {
      this.tapSubmit(e.detail.userInfo.avatarUrl);
    } else {
      wx.showToast({
        title: '授权失败！',
        icon: 'none'
      })
    }
  },
  switchWxAvatar(e) {
    this.setData({
      isShowWxAvatar: e.detail.value
    });
  }
})