import layer from "./layer"

layer.install = function(Vue){
	Vue.component(layer.name,layer)
}

export default layer