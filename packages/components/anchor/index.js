import $util from "../../util/util"
import Anchor from "./anchor"

Anchor.install = Vue=> {
	//锚点定位指令
	Vue.directive('anchor', {
		inserted(el, binding) {
			let options = {};
			if ($util.isObject(binding.value)) {
				Object.assign(options, binding.value);
			}
			let anchor = new Anchor(el, options);
			anchor.init();
		}
	})
}


export default Anchor