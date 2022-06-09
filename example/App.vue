<template>
    <div id="app">
        <div>{{value}}</div>
        <m-editor ref="editor" :menu-icons="{custom:'user'}" :menu-index="{custom:1}" :tooltips="{custom:'自定义'}" :menus="{custom:true,codeView:true,fontSize:[{label:'12px',value:'12px',icon:{custom:true,value:'fa fa-home'}}]}" @custom="change" v-model="value"></m-editor>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '',
            serverList: [
                {
                    label: '祖安',
                    value: '祖安'
                },
                {
                    label: '诺克萨斯',
                    value: '诺克萨斯'
                },
                {
                    label: '班德尔城',
                    value: '班德尔城'
                },
                {
                    label: '皮尔特沃夫',
                    value: '皮尔特沃夫'
                },
                {
                    label: '战争学院',
                    value: '战争学院'
                },
                {
                    label: '巨神峰',
                    value: '巨神峰'
                },
                {
                    label: '雷瑟守备',
                    value: '雷瑟守备'
                },
                {
                    label: '裁决之地',
                    value: '裁决之地'
                },
                {
                    label: '暗影岛',
                    value: '暗影岛'
                },
                {
                    label: '钢铁烈阳',
                    value: '钢铁烈阳'
                },
                {
                    label: '均衡教派',
                    value: '均衡教派'
                },
                {
                    label: '水晶之痕',
                    value: '水晶之痕'
                },
                {
                    label: '影流',
                    value: '影流'
                },
                {
                    label: '守望之海',
                    value: '守望之海'
                },
                {
                    label: '征服之海',
                    value: '征服之海'
                },
                {
                    label: '卡拉曼达',
                    value: '卡拉曼达'
                },
                {
                    label: '皮城警备',
                    value: '皮城警备'
                }
            ]
        }
    },
    methods: {
        change(res) {
            console.log(res)
            console.log(this.$refs.editor.getSelectNode())
        }
    }
}
</script>
<style lang="less">
html {
    font-size: 50px;
}

.app-full {
    width: 1rem !important;
    height: 1rem !important;
}

#app {
    height: 100%;
    overflow: auto;
    position: relative;
    width: 100%;
}
</style>
