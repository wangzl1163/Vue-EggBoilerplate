import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import './Assets/Style/ElementVariables.less'
import App from './App.vue'
import Store from './Store'
import Router from './Router'
import Permission from './Directives/Permission'
import Plugins from './Plugins';
import './Assets/Icons'
import './Permission' // permission control

const app = createApp(App)
app.use(ElementPlus)
app.use(Router)
app.use(Store)
app.use(Permission)
app.use(Plugins)

app.config.performance = process.env.NODE_ENV === 'development'

app.mount('#app')
