<template>
    <div id="app">
        <m-editor @upload-video="paste" :use-base64="false" @file-paste="paste" v-model="value" ref="editor"></m-editor>
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
        paste(e) {
            console.log(e)
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
