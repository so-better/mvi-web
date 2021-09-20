import Prop from "./prop"
import $dap from "dap-util"
Prop.install = Vue=>{
	//高度比例系数指令
	Vue.directive('prop', {
		inserted(el, binding) {
			let prop = new Prop(el,binding.value)
			prop.init()
			//将对象记录在元素里
			$dap.data.set(el,'directive:prop',prop)
		},
		unbind(el, binding){
			//获取对象
			let prop = $dap.data.get(el,'directive:prop')
			if(prop){
				//移除绑定在window上的事件
				prop._setOff()
			}
		}
	})
}

export default Prop