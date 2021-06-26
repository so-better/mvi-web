import $util from "../../util/util"
import NotifyComponent from './notify'

const Notify = {};

// 注册Notify
Notify.install = Vue=> {
	// 生成一个Vue的子类
	const NotifyConstructor = Vue.extend(NotifyComponent)
	// 生成一个该子类的实例
	const instance = new NotifyConstructor();
	// 挂载该实例
	instance.$mount();
	Vue.prototype.$showNotify = (options,callback) => {
		//如果实例元素没有添加到页面，则进行添加
		if(!$util.isContains(document.body,instance.$el)){
			document.body.appendChild(instance.$el)
		}
		if($util.isObject(options)){
			instance.type = options.type;
			instance.message = options.message;
			instance.timeout = options.timeout;
			instance.color = options.color;
			instance.background = options.background;
			instance.zIndex = options.zIndex;
			instance.callback = options.callback;
			instance.icon = options.icon;
		}else if(typeof(options) == "string"){
			instance.message = options;
			instance.callback = callback;
			instance.type = null;
			instance.timeout = null;
			instance.color = null;
			instance.background = null;
			instance.zIndex = null;
			instance.icon = null;
		}
		instance.clearTimer();
		instance.amounts++;
		instance.show = true;
	}
	
	Vue.prototype.$hideNotify = () =>{
		instance.show = false;
	}

}

export default Notify
