import $util from "../../util/util"
import Scroll from "./scroll"

Scroll.install = Vue=>{
	//监听元素滚动条到达顶部或者底部
	Vue.directive('scroll',{
		inserted(el,binding,vnode){
			let options = {};
			if($util.isObject(binding.value)){
				Object.assign(options,binding.value);
			}
			let scroll = new Scroll(el,options);
			scroll.init();
		}
	})
}

export default Scroll