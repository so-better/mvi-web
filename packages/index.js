//全局默认样式
import "./css/mvi-default.less"
//辅助样式
import "./css/mvi-support.less"
//工具类
import util from "./util"
//JS默认设置
import "./config"
//组件
import components from "./components"

//注册组件和工具类
const install = function(Vue) {
	if (install.installed) return
	util.install(Vue)
	Object.values(components).map(component => {
		component.install(Vue)
	})
}

//非import时使用全局Vue来执行install方法
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

var all = Object.assign({install},components)

let version = '4.3.1';
console.log('%cThe version of MVI you are currently using is %c'+version,'color:#077d72;',
'color:#ff3300;font-weight:bold')

//import时导出install
export default all