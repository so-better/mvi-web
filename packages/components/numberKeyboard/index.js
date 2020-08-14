import numberKeyboard from "./numberKeyboard"

numberKeyboard.install = function(Vue){
	Vue.component(numberKeyboard.name,numberKeyboard)
}

export default numberKeyboard