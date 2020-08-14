import roll from "./roll"

roll.install = function(Vue){
	Vue.component(roll.name,roll);
}

export default roll