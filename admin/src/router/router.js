import { createRouter, createWebHashHistory } from 'vue-router'

import mainBox from '@/views/mainBox.vue'
import home from '@/views/home/index.vue'
import center from '@/views/center/index.vue'
import userAdd from '@/views/user/userAdd.vue'
import userList from '@/views/user/userList.vue'
import userEdit from '@/views/user/userEdit.vue'
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
// 配置路由的函数
const configRouter = () => {
  // 如果 mainbox 路由尚未添加，则添加它
  if (!router.hasRoute('main')) {
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox,
      // 只添加用户有权限访问的路由
      children: routesConfig.filter(checkPermission)
    })
  }
  // 将路由配置状态改为 true，表示路由已经配置
  store.commit('changeGetterRouter', true)
}

// 检查用户是否有权限访问某个路由的函数
const checkPermission = (item) => {
  // 如果路由需要管理员权限，则只有当用户角色为 1 时才返回 true
  // 如果路由不需要管理员权限，则无条件返回 true
  return !item.requireAdmin || store.state.userInfo.role === 1
}

export default router
