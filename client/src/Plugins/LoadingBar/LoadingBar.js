/* eslint-disable camelcase */
import LoadingBar from './LoadingBar.vue'
import { createApp, h } from 'vue'

LoadingBar.newInstance = properties => {
   const _props = properties || {}

   const app = createApp({
      data(){ return _props },
      render(){
         return h(LoadingBar, {
            ..._props,
            ref: 'loadingBar'
         })
      }
   })

   const container = document.createElement('div')
   container.setAttribute('id', 'loading-bar')
   document.body.appendChild(container)
   const component = app.mount('#loading-bar')
   // document.body.appendChild(component.$el)
   const loading_bar = component.$refs.loadingBar

   return {
      update (options) {
         if ('percent' in options) {
            loading_bar.percent = options.percent
         }
         if (options.status) {
            loading_bar.status = options.status
         }
         if ('show' in options) {
            loading_bar.show = options.show
         }
      },
      component: loading_bar,
      destroy () {
         // document.body.removeChild(document.getElementsByClassName('loading-bar')[0])
         document.body.removeChild(document.getElementById('loading-bar'))
      }
   }
}

export default LoadingBar
