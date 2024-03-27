import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:3010'
})

export default request
