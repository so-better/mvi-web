import editor from "./editor"

editor.install = function(Vue){
	Vue.component(editor.name,editor)
}

export default editor