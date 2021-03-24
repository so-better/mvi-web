import form from "./form"
import formEl from "./form-el.vue"

form.install = Vue=>{
	Vue.component(form.name,form);
	Vue.component(formEl.name,formEl)
}

export default form