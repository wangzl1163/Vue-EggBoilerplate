import { App } from 'vue';
import hasRole from './HasRole'
import hasPermi from './HasPermi'

const install = function (app: App): void {
   app.directive('hasRole', hasRole)
   app.directive('hasPermi', hasPermi)
}

export default install
