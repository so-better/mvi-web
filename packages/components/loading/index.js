import loading from "./loading"

loading.install = function(Vue){
	Vue.component(loading.name,loading)
}

export default loading