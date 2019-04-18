const app = getApp();
Page({
  data: {
    colorData: {
      //基础色相，即左侧色盘右上顶点的颜色，由右侧的色相条控制
      hueData: {
        colorStopRed: 255,
        colorStopGreen: 0,
        colorStopBlue: 0,
      },
      //选择点的信息（左侧色盘上的小圆点，即你选择的颜色）
      pickerData: {
        x: 0, //选择点x轴偏移量
        y: 480, //选择点y轴偏移量
        red: 0,
        green: 0,
        blue: 0,
        hex: '#000000'
      },
      //色相控制条的位置
      barY: 0
    },
    rpxRatio: 1,
    colorType: 'foreground'
  },
  onLoad: function (options) {
    this.setRpxRatio();
    this.initColor(options.type);
  },
  initColor(colorType) {
    let defaultColor = '#000000';
    if (colorType == 'foreground') {
      defaultColor = app.globalData.colorInfo.foregroundColor
    } else {
      defaultColor = app.globalData.colorInfo.backgroundColor
    }
    const currentColorData = this.data.colorData;
    this.setData({
      colorType,
      colorData: {
        ...currentColorData,
        pickerData: {
          ...currentColorData.pickerData,
          hex: defaultColor
        }
      }
    })
  },
  setRpxRatio() {
    //设置rpxRatio
    const _self = this;
    wx.getSystemInfo({
      success(res) {
        _self.setData({
          rpxRatio: res.screenWidth / 750
        })
      }
    })
  },
  onChangeColor(e) {
    //返回的信息在e.detail.colorData中
    this.setData({
      colorData: e.detail.colorData
    })
  },
  tapSaveColor() {
    const { colorData } = this.data;
    if (this.data.colorType == 'foreground') {
      app.globalData.colorInfo.foregroundColor = colorData.pickerData.hex;
    } else {
      app.globalData.colorInfo.backgroundColor = colorData.pickerData.hex;
    }
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
})