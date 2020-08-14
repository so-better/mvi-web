import popup from "./popup"

popup.install = function(Vue){
	Vue.component(popup.name,popup)
}

export default popup