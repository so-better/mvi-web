import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import mvi from "../packages"
Vue.use(mvi)
import RemFit from "rem-fit"
var remFit = new RemFit(25.6,true);
remFit.set();
new Vue({
  render: h => h(App),
}).$mount('#app')
