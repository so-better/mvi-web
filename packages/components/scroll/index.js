import $util from "../../util/util"
import Scroll from "./scroll"

Scroll.install = function(Vue){
	//监听元素滚动条到达顶部或者底部
	Vue.directive('scroll',{
		inserted(el,binding,vnode){
			var options = {};
			if($util.isObject(binding.value)){
				Object.assign(options,binding.value);
			}
			var scroll = new Scroll(el,options);
			scroll.init();
		}
	})
}

export default Scroll