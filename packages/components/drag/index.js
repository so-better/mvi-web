import $dap from 'dap-util'
import Drag from './drag'

Drag.install = Vue => {
    //拖拽
    Vue.directive('drag', {
        inserted(el, binding) {
            let options = {}
            if ($dap.common.isObject(binding.value)) {
                Object.assign(options, binding.value)
            }
            if ($dap.common.isObject(binding.modifiers)) {
                Object.assign(options, binding.modifiers)
            }
            let drag = new Drag(el, options)
            //初始化
            drag.init()
            //将对象记录在元素里
            $dap.data.set(el, 'directive:drag', drag)
        },
        unbind(el, binding) {
            //获取对象
            let drag = $dap.data.get(el, 'directive:drag')
            if (drag) {
                //移除绑定在body上的事件
                drag._setOff()
            }
        }
    })
}

export default Drag
