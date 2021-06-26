import label from "./label"

label.install = Vue=>{
	Vue.component(label.name,label)
}

export default label