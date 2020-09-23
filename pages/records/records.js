// pages/records/records.js
const {
  getRecords
} = require('../../utils/storage.js');
const {
  formatTime,
  splitString
} = require('../../utils/util.js');

Page({
  data: {
    records: []
  },
  onShow: function (options) {
    const records = getRecords() || [];
    const newRecords = records.map(_val => {
      return {
        ..._val,
        qrcodeData: splitString(_val.qrcodeData, 12),
        ctime: formatTime(_val.ctime)
      }
    })
    this.setData({
      records: newRecords || []
    });
  },
  toQrcode(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/qrcode/qrcode?id=${id}`
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