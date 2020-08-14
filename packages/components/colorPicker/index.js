import colorPicker from "./colorPicker"

colorPicker.install = function(Vue){
	Vue.component(colorPicker.name,colorPicker)
}

export default colorPicker