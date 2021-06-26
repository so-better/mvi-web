import $util from "../../util/util"
import Upload from "./upload"

Upload.install = Vue=> {
	//文件上传
	Vue.directive('upload', {
		inserted(el, binding, vnode) {
			let options = {};
			if ($util.isObject(binding.value)) {
				Object.assign(options, binding.value);
			}
			if ($util.isObject(binding.modifiers)) {
				Object.assign(options, binding.modifiers);
			}
			let upload = new Upload(el, options);
			upload.init();
		}
	})
}

export default Upload
