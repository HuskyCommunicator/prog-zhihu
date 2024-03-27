import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

pinia.use(createPersistedState())
app.use(ElementPlus)

app.use(router)
app.mount('#app')
