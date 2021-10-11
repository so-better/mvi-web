import dropdown from "./dropdown"

dropdown.install = Vue => {
	Vue.component(dropdown.name, dropdown)
}

export default dropdown
