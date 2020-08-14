import picker from "./picker"

picker.install = function(Vue){
	Vue.component(picker.name,picker)
}

export default picker