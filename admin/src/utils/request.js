import axios from 'axios'

// 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:3010'
})
//添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么，例如添加token
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    // return config
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    return response
  },
  function (error) {
    // 对响应错误做点什么
    ElMessage.error(error.response.data.msg)
    return Promise.reject(error)
  }
)
export default request
