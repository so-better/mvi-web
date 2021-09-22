//引入全局默认样式
import "./css/mvi-default.less"
//引入辅助样式
import "./css/mvi-support.less"
//引入dap工具类
import dap from "dap-util"
//解决ios系统下css伪类无效的问题
window.addEventListener('touchstart',function() {})
//组件
import components from "./components"

//注册组件和工具类
const install = Vue=> {
	if (install.installed) return
	Vue.prototype.$dap = dap
	Object.values(components).map(component => {
		component.install(Vue)
	})
}

//非import时使用全局Vue来执行install方法
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

import packages from "../package.json";

console.log('%c感谢使用' + packages.name + '，当前版本：%c v' + packages.version + '\n%c如果你觉得' + packages.name +
	'还不错，不妨去github点个star\ngithub地址：%c' + packages.repository.url, 'color:#808080;', 'color:#008a00',
	'color:#808080;', 'color:#008a00');

//import时导出install
export default install