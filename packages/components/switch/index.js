import switchComponent from "./switch"

switchComponent.install = function(Vue){
	Vue.component(switchComponent.name,switchComponent);
}

export default switchComponent