import { h } from 'vue';

const slotRender = function (props, ctx) {
   const params = {
      row: props.row,
      index: props.index,
      column: props.column
   }

   const render = props.render.bind(ctx)
   return render(h, params)
}

slotRender.props = {
   row: Object,
   render: Function,
   index: Number,
   column: {
      type: Object,
      default: () => ({})
   }
}

export default slotRender
