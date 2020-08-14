import util from "./util"

util.install = function(Vue){
	Vue.prototype.$util = util
}

export default util