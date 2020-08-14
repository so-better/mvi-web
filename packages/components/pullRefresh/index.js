import pullRefresh from "./pullRefresh"

pullRefresh.install = function(Vue){
	Vue.component(pullRefresh.name,pullRefresh)
}

export default pullRefresh