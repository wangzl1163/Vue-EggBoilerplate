export default {
   name: 'CirclePlus',
   functional: true,
   props: {
      style: {
         type: Object,
         default: () => ({
            position: 'absolute',
            top: '13px',
            right: '-20px',
            cursor: 'pointer',
            color: 'green'
         })
      }
   },
   render(h, ctx) {
      return (<i class="el-icon-circle-plus"
         style={{ ...ctx.props.style }}
         onClick={
            () => ctx.listeners.click()
         }></i>)
   }
}