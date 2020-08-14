import imagePreview from "./image-preview"

imagePreview.install = function(Vue){
	Vue.component(imagePreview.name,imagePreview)
}

export default imagePreview