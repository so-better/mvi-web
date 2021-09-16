import $dap from "dap-util"
import dialogComponent from "./dialog"
import dialogForPCComponent from "./dialogForPC"

const Dialog = {};

Dialog.install = Vue=>{
	// 生成一个Vue的子类
	const DialogConstructor = Vue.extend(dialogComponent)
	const DialogForPcConstructor = Vue.extend(dialogForPCComponent)
	//提示框
	Vue.prototype.$alert = (options,callback) => {
		// 生成一个该子类的实例
		const instance = new DialogConstructor();
		if($dap.common.isObject(options)){
			instance.title = options.title;
			instance.message = options.message;
			instance.btnText = options.btnText;
			instance.btnColor = options.btnColor;
			instance.width = options.width;
			instance.zIndex = options.zIndex;
			instance.callback = options.callback;
			instance.animation = options.animation;
			instance.local = options.local;
			instance.usePadding = options.usePadding;
			instance.radius = options.radius;
			instance.timeout = options.timeout;
			instance.overlayColor = options.overlayColor;
			instance.ios = options.ios;
		}else {
			instance.message = options;
			instance.callback = callback;
		}
		instance.type = "alert";
		// 挂载该实例
		instance.$mount();
		//如果实例元素没有添加到页面，则进行添加
		if(!$dap.element.isContains(document.body,instance.$el)){
			if(typeof options.local == 'string' && options.local){
				let el = document.body.querySelector(options.local);
				if(el){
					el.appendChild(instance.$el);
				}else{
					document.body.appendChild(instance.$el)
				}
			}else if($dap.element.isElement(options.local)){
				options.local.appendChild(instance.$el)
			}else{
				document.body.appendChild(instance.$el)
			}
		}
	}
	
	//确认框
	Vue.prototype.$confirm = (options,callback) => {
		// 生成一个该子类的实例
		const instance = new DialogConstructor();
		if($dap.common.isObject(options)){
			instance.title = options.title;
			instance.message = options.message;
			instance.btnText = options.btnText;
			instance.btnColor = options.btnColor;
			instance.width = options.width;
			instance.zIndex = options.zIndex;
			instance.callback = options.callback;
			instance.animation = options.animation;
			instance.local = options.local;
			instance.usePadding = options.usePadding;
			instance.radius = options.radius;
			instance.timeout = options.timeout;
			instance.overlayColor = options.overlayColor;
			instance.ios = options.ios;
		}else{
			instance.message = options;
			instance.callback = callback;
		}
		instance.type = "confirm";
		// 挂载该实例
		instance.$mount();
		//如果实例元素没有添加到页面，则进行添加
		if(!$dap.element.isContains(document.body,instance.$el)){
			if(typeof options.local == 'string' && options.local){
				let el = document.body.querySelector(options.local);
				if(el){
					el.appendChild(instance.$el);
				}else{
					document.body.appendChild(instance.$el)
				}
			}else if($dap.element.isElement(options.local)){
				options.local.appendChild(instance.$el)
			}else{
				document.body.appendChild(instance.$el)
			}
		}
	}
	
	//信息输入框
	Vue.prototype.$prompt = (options,callback) => {
		// 生成一个该子类的实例
		const instance = new DialogConstructor();
		if($dap.common.isObject(options)){
			instance.title = options.title;
			instance.message = options.message;
			instance.btnText = options.btnText;
			instance.btnColor = options.btnColor;
			instance.width = options.width;
			instance.zIndex = options.zIndex;
			instance.callback = options.callback;
			instance.input.value = options.value;
			instance.input.type = options.type;
			instance.input.placeholder = options.placeholder;
			instance.input.maxlength = options.maxlength;
			instance.input.autofocus = options.autofocus;
			instance.input.clearable = options.clearable;
			instance.input.mode = options.mode;
			instance.input.align = options.align;
			instance.animation = options.animation;
			instance.local = options.local;
			instance.usePadding = options.usePadding;
			instance.radius = options.radius;
			instance.timeout = options.timeout;
			instance.overlayColor = options.overlayColor;
			instance.ios = options.ios;
		}else{
			instance.message = options,
			instance.callback = callback;
		}
		instance.type = "prompt";
		// 挂载该实例
		instance.$mount();
		//如果实例元素没有添加到页面，则进行添加
		if(!$dap.element.isContains(document.body,instance.$el)){
			if(typeof options.local == 'string' && options.local){
				let el = document.body.querySelector(options.local);
				if(el){
					el.appendChild(instance.$el);
				}else{
					document.body.appendChild(instance.$el)
				}
			}else if($dap.element.isElement(options.local)){
				options.local.appendChild(instance.$el)
			}else{
				document.body.appendChild(instance.$el)
			}
		}
	}

	//pc端提示框
	Vue.prototype.$Alert = (options,callback)=>{
		// 生成一个该子类的实例
		const instance = new DialogForPcConstructor();
		if($dap.common.isObject(options)){
			instance.title = options.title;
			instance.message = options.message;
			instance.btns = options.btns;
			instance.width = options.width;
			instance.zIndex = options.zIndex;
			instance.callback = options.callback;
			instance.animation = options.animation;
			instance.local = options.local;
			instance.usePadding = options.usePadding;
			instance.radius = options.radius;
			instance.timeout = options.timeout;
			instance.overlayColor = options.overlayColor;
			instance.showTimes = options.showTimes;
		}else{
			instance.message = options;
			instance.callback = callback;
		}
		instance.type = "Alert";
		// 挂载该实例
		instance.$mount();
		//如果实例元素没有添加到页面，则进行添加
		if(!$dap.element.isContains(document.body,instance.$el)){
			if(typeof options.local == 'string' && options.local){
				let el = document.body.querySelector(options.local);
				if(el){
					el.appendChild(instance.$el);
				}else{
					document.body.appendChild(instance.$el)
				}
			}else if($dap.element.isElement(options.local)){
				options.local.appendChild(instance.$el)
			}else{
				document.body.appendChild(instance.$el)
			}
		}
	}

	//pc端确认框
	Vue.prototype.$Confirm = (options,callback) => {
		// 生成一个该子类的实例
		const instance = new DialogForPcConstructor();
		if($dap.common.isObject(options)){
			instance.title = options.title;
			instance.message = options.message;
			instance.btns = options.btns;
			instance.width = options.width;
			instance.zIndex = options.zIndex;
			instance.callback = options.callback;
			instance.animation = options.animation;
			instance.local = options.local;
			instance.usePadding = options.usePadding;
			instance.radius = options.radius;
			instance.timeout = options.timeout;
			instance.overlayColor = options.overlayColor;
			instance.showTimes = options.showTimes;
		}else{
			instance.message = options;
			instance.callback = callback;
		}
		instance.type = "Confirm";
		// 挂载该实例
		instance.$mount();
		//如果实例元素没有添加到页面，则进行添加
		if(!$dap.element.isContains(document.body,instance.$el)){
			if(typeof options.local == 'string' && options.local){
				let el = document.body.querySelector(options.local);
				if(el){
					el.appendChild(instance.$el);
				}else{
					document.body.appendChild(instance.$el)
				}
			}else if($dap.element.isElement(options.local)){
				options.local.appendChild(instance.$el)
			}else{
				document.body.appendChild(instance.$el)
			}
		}
	}

	//pc端信息输入框
	Vue.prototype.$Prompt = (options,callback) => {
		// 生成一个该子类的实例
		const instance = new DialogForPcConstructor();
		if($dap.common.isObject(options)){
			instance.title = options.title;
			instance.message = options.message;
			instance.btns = options.btns;
			instance.width = options.width;
			instance.zIndex = options.zIndex;
			instance.callback = options.callback;
			instance.input.value = options.value;
			instance.input.type = options.type;
			instance.input.placeholder = options.placeholder;
			instance.input.maxlength = options.maxlength;
			instance.input.autofocus = options.autofocus;
			instance.input.clearable = options.clearable;
			instance.input.align = options.align;
			instance.animation = options.animation;
			instance.local = options.local;
			instance.usePadding = options.usePadding;
			instance.radius = options.radius;
			instance.timeout = options.timeout;
			instance.overlayColor = options.overlayColor;
			instance.showTimes = options.showTimes;
		}else{
			instance.message = options,
			instance.callback = callback;
		}
		instance.type = "Prompt";
		// 挂载该实例
		instance.$mount();
		//如果实例元素没有添加到页面，则进行添加
		if(!$dap.element.isContains(document.body,instance.$el)){
			if(typeof options.local == 'string' && options.local){
				let el = document.body.querySelector(options.local);
				if(el){
					el.appendChild(instance.$el);
				}else{
					document.body.appendChild(instance.$el)
				}
			}else if($dap.element.isElement(options.local)){
				options.local.appendChild(instance.$el)
			}else{
				document.body.appendChild(instance.$el)
			}
		}
	}
}

export default Dialog