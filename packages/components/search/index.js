import search from "./search"

search.install = Vue=>{
	Vue.component(search.name,search)
}

export default search