import $util from "../../util/util"
import Observe from "./observe"

Observe.install = Vue=> {
	//监听元素属性变化
	Vue.directive('observe', {
		inserted(el, binding) {
			let options = {};
			if ($util.isObject(binding.value)) {
				Object.assign(options, binding.value);
			}
			let observe = new Observe(el, options);
			observe.init();
		}
	})
}

export default Observe
