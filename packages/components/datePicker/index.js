import datePicker from "./datePicker"

datePicker.install = function(Vue){
	Vue.component(datePicker.name,datePicker)
}

export default datePicker