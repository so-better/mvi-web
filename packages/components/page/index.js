import page from "./page"

page.install = function(Vue){
	Vue.component(page.name,page)
}

export default page