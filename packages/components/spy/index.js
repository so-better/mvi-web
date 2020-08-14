import $util from "../../util/util"
import Spy from "./spy"

Spy.install = function(Vue){
	//滚动侦听
	Vue.directive('spy', {
		inserted(el, binding, vnode) {
			var options = {};
			if($util.isObject(binding.value)){
				Object.assign(options,binding.value);
			}
			var spy = new Spy(el,options);
			spy.init();
		}
	})
}

export default Spy