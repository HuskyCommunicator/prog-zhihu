import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
//import router from './router'
import router from './router/test.js'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())
app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
