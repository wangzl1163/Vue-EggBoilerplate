import hasRole from './HasRole'
import hasPermi from './HasPermi'

const install = function (app) {
   app.directive('hasRole', hasRole)
   app.directive('hasPermi', hasPermi)
}

export default install
