import select from "./select"
select.install = Vue=>{
	Vue.component(select.name,select)
}

export default select