import roll from "./roll"

roll.install = Vue=>{
	Vue.component(roll.name,roll);
}

export default roll