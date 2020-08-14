import progress from "./progress"

progress.install = function(Vue){
	Vue.component(progress.name,progress)
}

export default progress