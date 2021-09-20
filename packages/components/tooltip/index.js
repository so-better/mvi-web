import tooltip from "./tooltip"

tooltip.install = Vue => {
	Vue.component(tooltip.name, tooltip)
}

export default tooltip
