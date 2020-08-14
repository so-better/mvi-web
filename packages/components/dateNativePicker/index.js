import dateNativePicker from "./dateNativePicker"

dateNativePicker.install = function(Vue){
	Vue.component(dateNativePicker.name,dateNativePicker)
}

export default dateNativePicker