<template>
    <div id="app">
        <m-button v-upload.multiple.append="options">Upload</m-button>
        <m-button @click="doClear">clear</m-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: {
                extra: {
                    name: '离开'
                },
                ready: obj => {
                    this.uploader = obj
                },
                select(files, extra) {
                    console.log(this.getFiles())
                },
                error(state, message, file) {
                    console.log(this, state, message, file)
                }
            },
            uploader: null
        }
    },
    methods: {
        doClear() {
            this.uploader.clear()
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
