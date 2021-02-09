import { createRouter, createWebHashHistory } from 'vue-router'
import * as routes from './Routes'

const router = createRouter({
   history: createWebHashHistory(),
   routes: routes.constantRoutes
})

export default router
