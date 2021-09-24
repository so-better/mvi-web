import imagePreview from "./imagePreview"

imagePreview.install = Vue => {
	Vue.component(imagePreview.name, imagePreview)
}

export default imagePreview
