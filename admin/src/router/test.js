import { createRouter, createWebHashHistory } from 'vue-router'
import routeConfig from './config'
import mainBox from '@/views/mainBox.vue'
import login from '@/views/login.vue'
const router = createRouter({
  // 使用 hash 模式的路由历史
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 定义路由规则
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/mainbox', name: 'mainbox', component: mainBox }
  ]
})
routeConfig.forEach((item) => {
  router.addRoute('mainbox', item)
})
export default router
