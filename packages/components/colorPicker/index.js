import colorPicker from "./colorPicker"

colorPicker.install = Vue=>{
	Vue.component(colorPicker.name,colorPicker)
}

export default colorPicker