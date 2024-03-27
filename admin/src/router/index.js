// 导入vue-router的路由创建和hash历史功能
import { createRouter, createWebHashHistory } from 'vue-router'
// 导入路由配置
import routeConfig from './config'
// 导入主框架和登录视图组件
import mainBox from '@/views/mainBox.vue'
import login from '@/views/login.vue'
import none from '@/views/404/index.vue'
//
import { useUserStore } from '@/stores/userStore'

// 创建路由
const router = createRouter({
  // 使用 hash 模式的路由历史
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 定义路由规则
  routes: [
    { path: '/login', name: 'login', component: login }, // 登录路由
    { path: '/mainbox', name: 'mainbox', component: mainBox }, // 主框架路由
    { path: '/:pathMatch(.*)*', component: none } // 主框架路由
  ]
})

// 定义一个函数来配置子路由
const configRouter = () => {
  const userStore = useUserStore()
  routeConfig.forEach((item) => {
    router.addRoute('mainbox', item) // 向主框架路由添加子路由
  })
  userStore.changeGetterRouter(true)
}

// 添加路由拦截器，在每次路由跳转前都会运行
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 检查用户是否已登录
  const isLogin = localStorage.getItem('user')
  // 检查路由是否已配置
  const isRouterConfigured = userStore.isGetterRouter
  //  console.log('是否登录', isLogin, `/n`, '是否配置路由', isRouterConfigured)
  // 如果用户正在尝试访问登录页面，或者用户已登录并且路由已配置，则无条件放行
  if (to.name === 'login' || (isLogin && isRouterConfigured)) {
    next()
  }
  // 如果用户已登录但路由未配置，则需要先配置路由
  else if (isLogin && !isRouterConfigured) {
    configRouter()
    next({ path: to.fullPath })
  }
  // 如果用户未登录，则重定向到登录页面
  else {
    next({ path: '/login' })
  }
})

// 导出路由
export default router
