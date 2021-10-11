import navbar from "./navbar"

navbar.install = Vue => {
	Vue.component(navbar.name, navbar)
}

export default navbar
