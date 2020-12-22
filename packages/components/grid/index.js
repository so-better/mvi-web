import row from "./row"
import col from "./col"

row.install = function(Vue){
	Vue.component(row.name,row)
	Vue.component(col.name,col)
}

export default row