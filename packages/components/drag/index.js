import $util from "../../util/util"
import Drag from "./drag"

Drag.install = Vue=> {
	//拖拽
	Vue.directive('drag', {
		inserted(el, binding, vnode) {
			let options = {};
			if ($util.isObject(binding.value)) {
				Object.assign(options, binding.value);
			}
			if ($util.isObject(binding.modifiers)) {
				Object.assign(options, binding.modifiers);
			}
			let drag = new Drag(el, options);
			//初始化
			drag.init();
		}
	})
}


export default Drag