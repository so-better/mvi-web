import tooltip from "./tooltip"

tooltip.install = function(Vue){
	Vue.component(tooltip.name,tooltip)
}

export default tooltip