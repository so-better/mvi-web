<template>
    <div id="app">

        <m-slider v-model="value"></m-slider>
        <m-slider v-model="value"></m-slider>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 20
        }
    },
    methods: {}
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
