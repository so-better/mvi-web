import select from "./select"
import option from "./option"
select.install = function(Vue){
	Vue.component(select.name,select)
	Vue.component(option.name,option)
}

export default select