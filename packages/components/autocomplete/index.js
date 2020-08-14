import autocomplete from "./autocomplete"

autocomplete.install = function(Vue){
	Vue.component(autocomplete.name,autocomplete)
}

export default autocomplete