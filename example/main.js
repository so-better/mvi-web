import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import mvi from "../packages"
Vue.use(mvi)
import RemFit from "rem-fit"
var remFit = new RemFit(28,true);
remFit.set();
window.addEventListener('resize',()=>{
	remFit.set()
})
import Ruax from "ruax"
var ruax = new Ruax();
Vue.prototype.$ruax = ruax
new Vue({
  render: h => h(App),
}).$mount('#app')
