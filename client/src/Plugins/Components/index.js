import { common } from '@/Components'

const install = app => {
	const componentNames = Object.keys(common)

	// 公共组件注册为全局组件
	componentNames.forEach(name => app.component(name, common[name]))
}

export default install
