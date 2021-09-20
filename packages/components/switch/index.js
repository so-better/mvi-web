import switchComponent from "./switch"

switchComponent.install = Vue => {
	Vue.component(switchComponent.name, switchComponent)
}

export default switchComponent
