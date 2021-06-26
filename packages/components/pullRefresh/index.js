import pullRefresh from "./pullRefresh"

pullRefresh.install = Vue=>{
	Vue.component(pullRefresh.name,pullRefresh)
}

export default pullRefresh