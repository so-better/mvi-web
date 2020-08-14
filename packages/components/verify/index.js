import verify from "./verify"

verify.install = function(Vue){
	Vue.component(verify.name,verify)
}

export default verify