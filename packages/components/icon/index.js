import icon from './icon.vue'
icon.install = Vue=> {
    Vue.component(icon.name,icon)
}
export default icon