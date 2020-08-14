import image from "./image.vue"

image.install = function(Vue){
	Vue.component(image.name,image);
}

export default image