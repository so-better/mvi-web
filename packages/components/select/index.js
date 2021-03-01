import select from "./select"
select.install = function(Vue){
	Vue.component(select.name,select)
}

export default select