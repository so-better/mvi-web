import layer from "./layer"

layer.install = Vue=>{
	Vue.component(layer.name,layer)
}

export default layer