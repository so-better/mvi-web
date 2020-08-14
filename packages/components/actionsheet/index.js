import actionSheet from "./actionsheet"

actionSheet.install = function(Vue){
	Vue.component(actionSheet.name,actionSheet)
}

export default actionSheet