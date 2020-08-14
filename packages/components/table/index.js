import table from "./table"

table.install = function(Vue){
	Vue.component(table.name,table)
}

export default table