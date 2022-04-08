<template>
    <div id="app">
        <m-editor :use-base64="false" @upload-video="paste" v-model="value" ref="editor"></m-editor>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '<p><br></p>'
        }
    },
    methods: {
        paste(file) {
            console.log(file)
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
    overflow: hidden;
    position: relative;
    width: 100%;
}
</style>
