import $util from "../../util/util"
import Observe from "./observe"

Observe.install = function(Vue) {
	//监听元素属性变化
	Vue.directive('observe', {
		inserted(el, binding) {
			var options = {};
			if ($util.isObject(binding.value)) {
				Object.assign(options, binding.value);
			}
			var observe = new Observe(el, options);
			observe.init();
		}
	})
}

export default Observe
