<template>
    <div id="app">
        {{value}}
        <m-select multiple @change="change" clearable placeholder="请选择" v-model="value" :options="options"></m-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: [],
            date: new Date(),
            options: [
                {
                    label: '安徽',
                    value: 10
                },
                {
                    label: '江苏',
                    value: 20
                }
            ]
        }
    },
    methods: {
        change(res) {
            console.log(res)
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
