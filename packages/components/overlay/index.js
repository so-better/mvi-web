import overlay from "./overlay"

overlay.install = function (Vue) {
    Vue.component(overlay.name,overlay)
}

export default overlay