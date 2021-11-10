import $dap from 'dap-util'
import msgBoxComponent from './msgbox'

const MsgBox = {}

// 注册msgBox
MsgBox.install = Vue => {
    // 生成一个Vue的子类
    const MsgBoxConstructor = Vue.extend(msgBoxComponent)

    Vue.prototype.$msgbox = (options, callback) => {
        // 生成一个该子类的实例
        const instance = new MsgBoxConstructor()
        if ($dap.common.isObject(options)) {
            instance.message = options.message
            instance.timeout = options.timeout
            instance.callback = options.callback
            instance.animation = options.animation
            instance.zIndex = options.zIndex
            instance.color = options.color
            instance.background = options.background
        } else {
            instance.message = options
            instance.callback = callback
        }
        //挂载该实例
        instance.$mount()
        //如果实例元素没有添加到页面，则进行添加
        if (!$dap.element.isContains(document.body, instance.$el)) {
            document.body.appendChild(instance.$el)
        }
    }
}

export default MsgBox
