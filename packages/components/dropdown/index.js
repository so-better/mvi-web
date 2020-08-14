import dropdown from "./dropdown"

dropdown.install = function(Vue){
	Vue.component(dropdown.name,dropdown)
}

export default dropdown