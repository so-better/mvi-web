import search from "./search"

search.install = function(Vue){
	Vue.component(search.name,search)
}

export default search