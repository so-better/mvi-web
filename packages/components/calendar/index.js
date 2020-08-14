import calendar from "./calendar.vue"

calendar.install = function(Vue){
	Vue.component(calendar.name,calendar)
}

export default calendar