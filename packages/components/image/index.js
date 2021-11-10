import image from './image.vue'

image.install = Vue => {
    Vue.component(image.name, image)
}

export default image
