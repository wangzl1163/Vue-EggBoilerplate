import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './Assets/Style/ElementVariables.less'
import App from './App.vue'
import Store from './Store'
import Router from './Router'
import Permission from './Directives/Permission'
import './Config'
import './Assets/Icons'
import './Permission' // permission control

Vue.use(ElementUI)
Vue.use(Permission)

Vue.config.productionTip = false
Vue.config.performance = process.env.NODE_ENV === 'development'

new Vue({
   store: Store,
   router: Router,
   render: h => h(App)
}).$mount('#app')
