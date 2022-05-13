<template>
    <div id="app">
        <m-select v-model="value" :options="options"></m-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 20,
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
        getInfo() {
            const info = this.$dap.platform.language()
            this.$alert({
                ios: true,
                title: info,
                message: null
            })
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
