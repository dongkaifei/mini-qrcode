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
    backgroundColor: ''
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
  tapSubmit: function () {
    const {
      qrcodeData,
      foregroundColor,
      backgroundColor
    } = this.data;
    const id = setRecords(qrcodeData, 'normal', foregroundColor, backgroundColor);
    wx.navigateTo({
      url: `/pages/qrcode/qrcode?id=${id}`
    })
  },
  toPickColor(e) {
    const colorid = e.currentTarget.dataset.colorid;
    wx.navigateTo({
      url: `/pages/picker/picker?type=${colorid}`
    })
  }
})