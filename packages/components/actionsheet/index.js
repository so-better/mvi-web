import actionSheet from "./actionsheet"

actionSheet.install = Vue=>{
	Vue.component(actionSheet.name,actionSheet)
}

export default actionSheet