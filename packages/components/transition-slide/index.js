import transitionSlide from "./transition-slide"

transitionSlide.install = function(Vue){
	Vue.component(transitionSlide.name,transitionSlide)
}

export default transitionSlide