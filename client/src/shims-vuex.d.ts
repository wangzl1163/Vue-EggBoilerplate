import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IApp } from './Store/Modules/AppInterface';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    app: IApp
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}