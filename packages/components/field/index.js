import field from "./field"

field.install = function(Vue){
	Vue.component(field.name,field)
}

export default field