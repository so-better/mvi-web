import divider from "./divider"

divider.install = Vue=>{
	Vue.component(divider.name,divider)
}

export default divider