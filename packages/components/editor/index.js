import editor from "./editor"

editor.install = Vue=>{
	Vue.component(editor.name,editor)
}

export default editor