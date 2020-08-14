import checkbox from "./checkbox.vue"

checkbox.install = function(Vue){
	Vue.component(checkbox.name,checkbox);
}

export default checkbox