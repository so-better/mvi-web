import modal from './modal'

modal.install = Vue => {
    Vue.component(modal.name, modal)
}

export default modal
