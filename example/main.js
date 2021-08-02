import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
/* import "../packages/css/mvi-default.less"
import "../packages/config"
import cmp from "../packages/components/toast"
Vue.use(cmp) */
import mvi from "../packages"
Vue.use(mvi)
import Px from "../packages/components/px/px.js"
Vue.prototype.overlayComponentWatch = (event,el)=>{
	console.log(event,el)
}

new Vue({
	render: h => h(App),
}).$mount('#app')
