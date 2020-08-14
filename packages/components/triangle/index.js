import triangle from "./triangle"

triangle.install = function(Vue){
	Vue.component(triangle.name,triangle)
}

export default triangle