// 导入 Vue 和相关库
import { createPinia } from 'pinia' // 导入 Pinia，用于状态管理
import { createApp } from 'vue' // 导入 Vue 应用创建函数
import { createPersistedState } from 'pinia-plugin-persistedstate' // 导入 Pinia 插件，用于持久化状态
import App from './App.vue' // 导入根组件
import router from './router' // 导入路由配置
import ElementPlus from 'element-plus' // 导入 Element Plus UI 库
import 'element-plus/theme-chalk/index.css' // 导入 Element Plus 的 CSS
import '@/utils/request.js' // 导入请求工具
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 导入 Element Plus 的图标库

// 创建 Vue 应用实例
const app = createApp(App)

// 注册 Element Plus 的图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 创建 Pinia 实例并使用插件
const pinia = createPinia()
pinia.use(createPersistedState())

// 使用 Pinia、CKEditor、Element Plus 和路由
app.use(pinia)
app.use(ElementPlus)
app.use(router)

// 挂载 Vue 应用到 DOM
app.mount('#app')
