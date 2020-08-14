import collapse from "./collapse"
import collapseItem from "./collapse-item"

collapse.install = function(Vue){
	Vue.component(collapse.name,collapse)
	Vue.component(collapseItem.name,collapseItem)
}

export default collapse