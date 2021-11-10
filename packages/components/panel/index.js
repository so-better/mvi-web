import panel from './panel'

panel.install = Vue => {
    Vue.component(panel.name, panel)
}

export default panel
