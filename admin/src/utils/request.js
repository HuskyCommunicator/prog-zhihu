import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:3010'
})

// request.interceptors.response.use(
//   function (response) {
//     if (response.status === 200) {
//       return response.data
//     } else {
//       throw new Error('发生了一个错误')
//     }
//   },
//   function (error) {
//     if (error.response && error.response.status === 400) {
//       throw new Error(error.response.data.msg || '用户名或密码不匹配')
//     } else {
//       throw new Error('发生了一个错误')
//     }
//   }
// )
export default request
