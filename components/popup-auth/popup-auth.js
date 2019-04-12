// components/popup-auth/popup-auth.js
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    toOpenSetting() {
      const _self = this;
      wx.openSetting({
        success(res) {
          _self.triggerEvent('callback', res.authSetting);
        }
      })
    },
    closePopup() {
      this.setData({
        isShow: false
      })
    }
  }
})