import row from "./row"
import col from "./col"

row.install = Vue => {
	Vue.component(row.name, row)
	Vue.component(col.name, col)
}

export default row
