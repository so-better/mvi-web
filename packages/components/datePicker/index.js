import datePicker from "./datePicker"

datePicker.install = Vue=>{
	Vue.component(datePicker.name,datePicker)
}

export default datePicker