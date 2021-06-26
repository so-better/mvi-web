import $util from "../../util/util"
import Spy from "./spy"

Spy.install = Vue=>{
	//滚动侦听
	Vue.directive('spy', {
		inserted(el, binding, vnode) {
			let options = {};
			if($util.isObject(binding.value)){
				Object.assign(options,binding.value);
			}
			let spy = new Spy(el,options);
			spy.init();
		}
	})
}

export default Spy