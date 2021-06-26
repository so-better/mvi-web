import numberKeyboard from "./numberKeyboard"

numberKeyboard.install = Vue=>{
	Vue.component(numberKeyboard.name,numberKeyboard)
}

export default numberKeyboard