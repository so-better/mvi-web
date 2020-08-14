import dateChooser from "./dateChooser"

dateChooser.install = function(Vue){
	Vue.component(dateChooser.name,dateChooser)
}

export default dateChooser