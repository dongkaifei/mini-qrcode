const setRecords = (qrcodeData, qrcodeType, foregroundColor, backgroundColor, avatarUrl) => {
  //获取记录
  const recordsArr = getRecords() || [];
  //定义插入记录方法
  const recordsPush = (id) => {
    recordsArr.push({
      id: id,
      qrcodeType: qrcodeType || 'normal',
      qrcodeData: qrcodeData,
      foregroundColor: foregroundColor,
      backgroundColor: backgroundColor,
      avatarUrl: avatarUrl || '',
      ctime: new Date().getTime()
    });
  }
  //判断是否需要插入
  let isNeedPush = true;
  let id = recordsArr.length + 1;
  for (let i = 0; i < recordsArr.length; i++) {
    if (
      recordsArr[i].qrcodeData === qrcodeData &&
      recordsArr[i].foregroundColor === foregroundColor &&
      recordsArr[i].foregroundColor === foregroundColor &&
      recordsArr[i].qrcodeType === qrcodeType
    ) {
      isNeedPush = false;
      id = i + 1;
    }
  }
  if (isNeedPush) {
    recordsPush(id);
    try {
      wx.setStorageSync('historyRecords', recordsArr);
    } catch (err) {
      console.log(err)
    }
  }
  return id;
}

const getRecords = () => {
  try {
    return wx.getStorageSync('historyRecords');
  } catch (err) {
    console.log(err);
  }
}

const getRecordsById = (id) => {
  const recordsArr = getRecords() || [];
  let currentRecord = {};
  recordsArr.map((_val) => {
    if (_val.id == id) currentRecord = _val;
  })
  return currentRecord;
}

module.exports = {
  setRecords: setRecords,
  getRecords: getRecords,
  getRecordsById: getRecordsById
}