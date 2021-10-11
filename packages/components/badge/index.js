import badge from "./badge"

badge.install = Vue => {
	Vue.component(badge.name, badge)
}

export default badge
