const getAuthorize = (scopeType, sucCB, failCb) => {
  wx.authorize({
    scope: scopeType,
    success() {
      if (sucCB) sucCB();
    },
    fail() {
      if (failCb) failCb();
    }
  });
}

module.exports = {
  getAuthorize
}



