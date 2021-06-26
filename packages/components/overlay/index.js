import overlay from "./overlay"

overlay.install = Vue=>{
    Vue.component(overlay.name,overlay)
}

export default overlay