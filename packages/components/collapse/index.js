import collapse from "./collapse"
import collapseItem from "./collapse-item"

collapse.install = Vue => {
    Vue.component(collapse.name, collapse)
    Vue.component(collapseItem.name, collapseItem)
}

export default collapse
