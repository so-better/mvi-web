import circleProgress from "./circleProgress"

circleProgress.install = function(Vue){
	Vue.component(circleProgress.name,circleProgress)
}

export default circleProgress