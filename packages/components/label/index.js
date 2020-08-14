import label from "./label"

label.install = function(Vue){
	Vue.component(label.name,label)
}

export default label