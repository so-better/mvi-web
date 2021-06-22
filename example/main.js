import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import mvi from "../packages"
Vue.use(mvi)

new Vue({
	render: h => h(App),
}).$mount('#app')
