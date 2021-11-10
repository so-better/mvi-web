import verify from './verify'

verify.install = Vue => {
    Vue.component(verify.name, verify)
}

export default verify
