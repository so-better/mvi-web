import picker from './picker'

picker.install = Vue => {
    Vue.component(picker.name, picker)
}

export default picker
