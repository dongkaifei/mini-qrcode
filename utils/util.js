const formatTime = time => {
  const date = new Date(time);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const splitString = (str, len) => {
  if (!str || typeof str !== 'string') return "";
  let strLength = 0;
  let newStr = "";
  let maxLength = len || 5.5;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) <= 255) {
      strLength += 0.5
    } else {
      strLength += 1
    }
    if (strLength >= maxLength) {
      newStr += '...';
      break;
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}

module.exports = {
  formatTime: formatTime,
  splitString: splitString
}
