import dateNativePicker from './dateNativePicker'

dateNativePicker.install = Vue => {
    Vue.component(dateNativePicker.name, dateNativePicker)
}

export default dateNativePicker
