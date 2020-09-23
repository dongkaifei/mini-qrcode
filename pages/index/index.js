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
    isShowWxAvatar: false,
    token: ""
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
    wx.showLoading({
      title: '生成中...',
      mask: true
    });
    this.doMsgSecCheck(qrcodeData, () => {
      const qrcodeType = isShowWxAvatar ? 'avatar' : 'normal';
      const id = setRecords(qrcodeData, qrcodeType, foregroundColor, backgroundColor, avatarUrl);
      wx.navigateTo({
        url: `/pages/qrcode/qrcode?id=${id}`
      })
    });
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
  },
  doMsgSecCheck(text, cb) {
    wx.serviceMarket.invokeService({
      service: 'wxee446d7507c68b11',
      api: 'msgSecCheck',
      data: {
        "Action": "TextApproval",
        "Text": text
      },
    }).then(res => {
      const resData = JSON.parse(res.data);
      if (resData.Response && resData.Response.EvilTokens && resData.Response.EvilTokens.length) {
        wx.showModal({
          title: '⚠️警告',
          content: '输入内容不能包含恶意敏感词汇',
        })
      } else {
        cb();
      }
      wx.hideLoading();
    })
  },
  onShareAppMessage() {
    return {
      title: '非常好用的工具，推荐给你～',
      path: '/pages/index/index',
      imageUrl: '/images/qrcode-image.jpg'
    }
  }
})