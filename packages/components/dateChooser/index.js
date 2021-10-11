import dateChooser from "./dateChooser"

dateChooser.install = Vue => {
	Vue.component(dateChooser.name, dateChooser)
}

export default dateChooser
