import $util from "../../util/util"
import Resize from "./resize"

Resize.install = function(Vue) {
	//拖拽改变大小
	Vue.directive('resize', {
		inserted(el, binding, vnode) {
			var options = {};
			if ($util.isObject(binding.value)) {
				Object.assign(options, binding.value);
			}
			if ($util.isObject(binding.modifiers)) {
				Object.assign(options, binding.modifiers);
			}
			var resize = new Resize(el, options);
			resize.init();
		}
	})
}


export default Resize