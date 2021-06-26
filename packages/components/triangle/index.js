import triangle from "./triangle"

triangle.install = Vue=>{
	Vue.component(triangle.name,triangle)
}

export default triangle