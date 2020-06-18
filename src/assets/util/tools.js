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
