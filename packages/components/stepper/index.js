import stepper from "./stepper"

stepper.install = function(Vue){
	Vue.component(stepper.name,stepper)
}

export default stepper