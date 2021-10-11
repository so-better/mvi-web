import popup from "./popup"

popup.install = Vue => {
	Vue.component(popup.name, popup)
}

export default popup
