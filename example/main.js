import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import './rem-fit'

import mvi from "../packages"
Vue.use(mvi)

import router from "./router"



new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
