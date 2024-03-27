import { createRouter, createWebHashHistory } from 'vue-router'

import mainBox from '@/views/mainBox.vue'
import home from '@/views/home/index.vue'
import center from '@/views/center/index.vue'
import userAdd from '@/views/user/userAdd.vue'
import userList from '@/views/user/userList.vue'
import userEdit from '@/views/user/userEdit.vue'
import login from '@/views/login.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //顶级路由 login /
  routes: [
    {
      path: '/',
      component: mainBox,
      children: [
        {
          path: '/home',
          component: home
        },
        {
          path: '/center',
          component: center
        },
        {
          path: '/user/useradd',
          component: userAdd
        },
        {
          path: '/user/useredit/:id',
          component: userEdit
        },
        {
          path: '/user/userlist',
          component: userList
        }
      ]
    },
    {
      path: '/login',
      component: login
    }
  ]
})

export default router
