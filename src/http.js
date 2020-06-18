import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json'
if (process.env.NODE_ENV == 'development') {//开发环境
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'production') {//生产环境
  axios.defaults.baseURL = 'https://www.hynuxyk.club';
}

axios.interceptors.response.use(response => {
  if(response.status === 200){
    return response.data
  }
  return response
})

export default axios
