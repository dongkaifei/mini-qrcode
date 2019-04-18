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
      qrcodeType,
      foregroundColor,
      backgroundColor,
      avatarUrl,
    } = getRecordsById(id);
    const objQrcode = { qrcodeW, qrcodeH, qrcodeData, foregroundColor, backgroundColor }
    if (qrcodeType == 'normal') {
      this.createQrcode(objQrcode);
    } else {
      const _self = this;
      wx.downloadFile({
        url: avatarUrl,
        success: function (res) {
          _self.createQrcode({ ...objQrcode, imgPath: res.tempFilePath });
        }
      })
    }
  },
  createQrcode({ qrcodeW, qrcodeH, qrcodeData, foregroundColor, backgroundColor, imgPath }) {
    const QRCodeRes = new QRCode('qrcode', {
      text: qrcodeData,
      image: imgPath || '',
      width: qrcodeW,
      height: qrcodeW,
      colorDark: foregroundColor || "#1CA4FC",
      colorLight: backgroundColor || "white",
      correctLevel: QRCode.CorrectLevel.H,
      callback: () => {
        setTimeout(() => {
          this.toExportImage(QRCodeRes);
        }, 200);
      }
    });
  },
  toExportImage(QRCodeRes) {
    QRCodeRes.exportImage(res => {
      this.setData({
        filePath: res
      });
      wx.hideLoading();
    }, err => {
      if (err) {
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          title: '二维码生成失败！',
        })
      }
    });
  },
  toSave: function () {
    this.toAuthWritePhotosAlbum();
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