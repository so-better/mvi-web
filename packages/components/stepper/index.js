import stepper from './stepper'

stepper.install = Vue => {
    Vue.component(stepper.name, stepper)
}

export default stepper
