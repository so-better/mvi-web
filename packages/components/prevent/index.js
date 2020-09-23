import $util from "../../util/util"
import Prevent from "./prevent"

Prevent.install = function(Vue) {
	//监听元素属性变化
	Vue.directive('prevent', {
		inserted(el, binding) {
			var prevent = new Prevent(el);
			prevent.init();
		}
	})
}

export default Prevent
