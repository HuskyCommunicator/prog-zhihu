// 导入所需的库和API
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/login'

// 定义用户存储
export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref({})

    // 路由配置状态
    const isGetterRouter = ref(false)

    // 更新用户信息
    const uploadUserInfo = (data) => {
      // 如果 data 中有 avatar，就使用 data 的 avatar，否则保持原来的 avatar
      userInfo.value = {
        ...userInfo.value,
        avatar: data.avatar || userInfo.value.avatar,
        username: data.username,
        password: data.password,
        role: data.role
      }
    }

    // 清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {} // 清空用户信息
      localStorage.removeItem('user') // 清除本地存储中的用户信息
      localStorage.removeItem('token') // 清除本地存储中的token
      changeGetterRouter(false) // 更改路由配置状态
    }

    // 控制路由配置
    const changeGetterRouter = (value) => {
      isGetterRouter.value = value
    }

    // 返回存储的状态和方法
    return {
      userInfo,
      uploadUserInfo,
      clearUserInfo,
      isGetterRouter,
      changeGetterRouter
    }
  },
  {
    persist: { paths: ['userInfo'] } // 持久化用户信息
  }
)
