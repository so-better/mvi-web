import navbar from "./navbar"

navbar.install = function(Vue){
	Vue.component(navbar.name,navbar)
}

export default navbar