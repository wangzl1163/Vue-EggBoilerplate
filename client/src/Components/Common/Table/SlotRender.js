export default {
   name: 'TableColumnSlotRender',
   functional: true,
   props: {
      row: Object,
      render: Function,
      index: Number,
      column: {
         type: Object,
         default: null
      }
   },
   render: (h, ctx) => {
      const params = {
         row: ctx.props.row,
         index: ctx.props.index
      }

      if (ctx.props.column) params.column = ctx.props.column

      const render = ctx.props.render.bind(ctx)
      return render(h, params)
   }
}
