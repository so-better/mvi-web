import calendar from "./calendar.vue"

calendar.install = Vue=>{
	Vue.component(calendar.name,calendar)
}

export default calendar