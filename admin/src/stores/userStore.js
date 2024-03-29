import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/login'

export const useUserStore = defineStore(
  'user',
  () => {
    //用户信息
    const userInfo = ref([])
    //路由配置状态
    const isGetterRouter = ref(false)
    //获取用户信息
    const getUserInfo = async ({ username, password }) => {
      const res = await loginAPI({ username, password })
      userInfo.value = res.data.data
    }
    //清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
    //控制路由配置
    const changeGetterRouter = (value) => {
      isGetterRouter.value = value
    }
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
      isGetterRouter,
      changeGetterRouter
    }
  },
  {
    persist: { paths: ['userInfo'] }
  }
)
