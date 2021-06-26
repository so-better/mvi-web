import input from "./input"

input.install = Vue=>{
	Vue.component(input.name,input)
}

export default input