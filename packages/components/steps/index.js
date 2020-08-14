import steps from "./steps"
import step from "./step"

steps.install = function(Vue){
	Vue.component(steps.name,steps)
	Vue.component(step.name,step)
}

export default steps