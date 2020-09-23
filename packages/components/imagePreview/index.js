import imagePreview from "./imagePreview"

imagePreview.install = function(Vue){
	Vue.component(imagePreview.name,imagePreview)
}

export default imagePreview