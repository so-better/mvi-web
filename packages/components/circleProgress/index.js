import circleProgress from "./circleProgress"

circleProgress.install = Vue => {
	Vue.component(circleProgress.name, circleProgress)
}

export default circleProgress
