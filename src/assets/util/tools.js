Date.prototype.format = function (format) {
  let o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

function getUrlSearch() {
  let params = window.location.search
  params = params.substring(1, params.length)
  params = params.split('&')
  params = params.reduce((prev, item, index, arr) => {
    let _arr = item.split('=')
    prev[_arr[0]] = _arr[1]
    return prev
  }, {})
  // console.log(params)
  return params
}

export default {
  getUrlSearch
}
