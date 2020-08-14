import modal from "./modal"

modal.install = function(Vue){
	Vue.component(modal.name,modal)
}

export default modal