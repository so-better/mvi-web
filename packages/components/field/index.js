import field from "./field"

field.install = Vue=>{
	Vue.component(field.name,field)
}

export default field