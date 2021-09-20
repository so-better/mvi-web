import $dap from "dap-util"
import Upload from "./upload"

Upload.install = Vue => {
	//文件上传
	Vue.directive('upload', {
		inserted(el, binding) {
			let options = {}
			if ($dap.common.isObject(binding.value)) {
				Object.assign(options, binding.value)
			}
			if ($dap.common.isObject(binding.modifiers)) {
				Object.assign(options, binding.modifiers)
			}
			let upload = new Upload(el, options)
			upload.init()
		}
	})
}

export default Upload
