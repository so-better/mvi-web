import view from "./view"

view.install = function(Vue){
	Vue.component(view.name,view)
}

export default view