import $util from "../../util/util"
import ToastComponent from './toast'

const Toast = {};

// 注册Toast
Toast.install = Vue=> {
	// 生成一个Vue的子类
	const ToastConstructor = Vue.extend(ToastComponent)
	// 生成一个该子类的实例
	const instance = new ToastConstructor();
	// 挂载该实例
	instance.$mount();
	Vue.prototype.$showToast = (options,callback) => {
		//如果实例元素没有添加到页面，则进行添加
		//判断是否局部提示
		if(typeof options.local == 'string' && options.local){
			let el = document.body.querySelector(options.local);
			if(el){//局部提示
				if(!$util.isContains(el,instance.$el)){
					el.appendChild(instance.$el);
				}
			}else{
				if(!$util.isContains(document.body,instance.$el)){
					document.body.appendChild(instance.$el)
				}
			}
		}else if($util.isElement(options.local)){//局部提示
			if(!$util.isContains(options.local,instance.$el)){
				options.local.appendChild(instance.$el)
			}
		}else{
			if(!$util.isContains(document.body,instance.$el)){
				document.body.appendChild(instance.$el)
			}
		}
		
		if($util.isObject(options)){
			instance.type = options.type;
			instance.icon = options.icon;
			instance.message = options.message;
			instance.timeout = options.timeout;
			instance.callback = options.callback;
			instance.zIndex = options.zIndex;
			instance.local = options.local;
			instance.usePadding = options.usePadding;
			instance.background = options.background;
			instance.color = options.color;
		}else{
			instance.message = options;
			instance.callback = callback;
			instance.timeout = 1500;
		}
		instance.clearTimer();
		instance.amounts++;
		instance.show = true;
	}
	
	Vue.prototype.$hideToast = () =>{
		instance.show = false;
	}

}

export default Toast
