import store from '@/Store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
   watch: {
      $route (route) {
         if (this.device === 'mobile' && this.sidebar.opened) {
            store.dispatch('closeSideBar', { withoutAnimation: false })
         }
      }
   },
   beforeMount () {
      window.addEventListener('resize', this.$_resizeHandler)
   },
   beforeDestroy () {
      window.removeEventListener('resize', this.$_resizeHandler)
   },
   mounted () {
      const isMobile = this.$_isMobile()
      if (isMobile) {
         store.dispatch('toggleDevice', 'mobile')
         store.dispatch('closeSideBar', { withoutAnimation: true })
      }
   },
   methods: {
      // use $_ for mixins properties
      // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
      $_isMobile () {
         const rect = body.getBoundingClientRect()
         return rect.width - 1 < WIDTH
      },
      $_resizeHandler () {
         if (!document.hidden) {
            const isMobile = this.$_isMobile()
            store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

            if (isMobile) {
               store.dispatch('closeSideBar', { withoutAnimation: true })
            }
         }
      }
   }
}
