import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue' // 导入所有的icon的图标




const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')


//遍历所有的icon 把每个icon图标以组件的方式加载到app中
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key])
})