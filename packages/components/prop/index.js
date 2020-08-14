import Prop from "./prop"

Prop.install = function(Vue){
	//高度比例系数指令
	Vue.directive('prop', {
		inserted(el, binding) {
			var prop = new Prop(el,binding.value);
			prop.init();
		}
	})
}

export default Prop