import swiper from "./swiper"
import swiperSlide from "./swiper-slide"

swiper.install = Vue => {
	Vue.component(swiper.name, swiper)
	Vue.component(swiperSlide.name, swiperSlide)
}

export default swiper
