// pages/qrcode/qrcode.js
const rpx2px = require('../../utils/rpx2px.js');
const QRCode = require('../../utils/weapp-qrcode.js')
const {
  getRecordsById
} = require('../../utils/storage.js');
const {
  getAuthorize
} = require('../../utils/getAuthorize.js');

Page({
  data: {
    qrcodeW: rpx2px(400),
    qrcodeH: rpx2px(400),
    QRCodeRes: {},
    showPopup: false,
    filePath: ""
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '二维码生成中...',
      mask: true
    })
    const {
      id
    } = options;
    this.initData(id);
  },
  initData: function (id) {
    const {
      qrcodeW,
      qrcodeH
    } = this.data;
    const {
      qrcodeData,
      foregroundColor,
      backgroundColor
    } = getRecordsById(id);
    const QRCodeRes = new QRCode('qrcode', {
      text: qrcodeData,
      image: '',
      width: qrcodeW,
      height: qrcodeW,
      colorDark: foregroundColor || "#1CA4FC",
      colorLight: backgroundColor || "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    this.setData({
      QRCodeRes
    });
    wx.hideLoading();
  },
  toSave: function () {
    this.data.QRCodeRes.exportImage(res => {
      this.setData({
        filePath: res
      });
      this.toAuthWritePhotosAlbum();
    });
  },
  toAuthWritePhotosAlbum() {
    getAuthorize('scope.writePhotosAlbum',
      () => {
        this.saveImageToLocal();
      },
      () => {
        this.setData({
          showPopup: true
        })
      });
  },
  getAuthRes(e) {
    if (e.detail['scope.writePhotosAlbum']) {
      this.toAuthWritePhotosAlbum();
    } else {
      this.toAuthWritePhotosAlbum();
    }
  },
  saveImageToLocal() {
    const {
      filePath
    } = this.data;
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success(res) {
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})