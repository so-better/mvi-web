import $util from "../../util/util"
import LoadingBarComponent from './loadingBar'

const LoadingBar = {};

// 注册
LoadingBar.install = Vue=> {
	// 生成一个Vue的子类
	const LoadingBarConstructor = Vue.extend(LoadingBarComponent)
	// 生成一个该子类的实例
	const instance = new LoadingBarConstructor();
	// 挂载该实例
	instance.$mount();
	Vue.prototype.$showLoadingBar = (options) => {
		//如果实例元素没有添加到页面，则进行添加
		if(!$util.isContains(document.body,instance.$el)){
			document.body.appendChild(instance.$el)
		}
		if(typeof options == "string"){
			instance.color = options;
			instance.zIndex = null;
		}else if($util.isObject(options)){
			instance.color = options.color;
			instance.zIndex = options.zIndex;
		}
		instance.enter();
	}
	
	Vue.prototype.$hideLoadingBar = () =>{
		instance.leave();
	}

}

export default LoadingBar
