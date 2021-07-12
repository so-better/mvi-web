import util from "./util"

util.install = Vue=>{
	Vue.prototype.$util = util
}

export default util