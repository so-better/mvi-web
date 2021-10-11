import loading from "./loading"

loading.install = Vue => {
	Vue.component(loading.name, loading)
}

export default loading
