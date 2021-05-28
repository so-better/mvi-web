import transitionSlide from "./transitionSlide"

transitionSlide.install = function(Vue){
	Vue.component(transitionSlide.name,transitionSlide)
}

export default transitionSlide