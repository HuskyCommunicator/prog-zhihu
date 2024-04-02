import home from '@/views/home/index.vue'
import center from '@/views/center/index.vue'
import userAdd from '@/views/user/userAdd.vue'
import userList from '@/views/user/userList.vue'
import userEdit from '@/views/user/userEdit.vue'
import newsAdd from '@/views/news/newsAdd.vue'
import newsList from '@/views/news/newsList.vue'
import newsEdit from '@/views/news/newsEdit.vue'
// 定义一个函数来创建路由对象，以减少重复代码
const createRoute = (path, component, requireAdmin = false) => ({
  path,
  component,
  requireAdmin
})
const routes = [
  { path: '/', redirect: '/home' },
  createRoute('/home', home),
  createRoute('/center', center),
  createRoute('/user/useradd', userAdd, true),
  createRoute('/user/userlist', userList, true),
  createRoute('/user/useredit/:id', userEdit, true),
  createRoute('/news/newsadd', newsAdd),
  createRoute('/news/newslist', newsList),
  createRoute('/news/newsedit/:id', newsEdit)
]
export default routes
