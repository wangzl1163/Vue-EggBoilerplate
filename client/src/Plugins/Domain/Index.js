const install = app => {
   app.config.globalProperties.$domains = {
      static: process.env.VUE_APP_STATIC
   }
}

export default install
