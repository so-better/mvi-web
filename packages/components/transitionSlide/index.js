import transitionSlide from './transitionSlide'

transitionSlide.install = Vue => {
    Vue.component(transitionSlide.name, transitionSlide)
}

export default transitionSlide
