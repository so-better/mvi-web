import panel from "./panel"

panel.install = function(Vue){
	Vue.component(panel.name,panel)
}

export default panel