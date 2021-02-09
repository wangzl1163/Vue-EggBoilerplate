import { h } from 'vue';

const itemRender = function (props, context) {
   const icon = props.icon
   const title = props.title
   const vNodes = []

   if (icon) {
      vNodes.push(<svg-icon icon-class={icon}/>)
   }

   if (title) {
      vNodes.push(<span slot='title'>{title}</span>)
   }

   return vNodes
}

itemRender.props = {
   icon: {
      type: String,
      default: ''
   },
   title: {
      type: String,
      default: ''
   }
}

export default itemRender

