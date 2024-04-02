import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import '@/utils/request.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(createPersistedState())
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
