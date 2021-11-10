import autocomplete from './autocomplete'

autocomplete.install = Vue => {
    Vue.component(autocomplete.name, autocomplete)
}

export default autocomplete
