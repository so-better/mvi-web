<template>
    <div id="app">
        <div class="mvi-mt-10 mvi-mx-10 mvi-text-center">
            <m-button square @click="change" form-control type="success">打开图片预览</m-button>
        </div>
        <m-image-preview v-model="show" :images="images"></m-image-preview>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show:false,
            images: [
                "https://www.mvi-web.cn/mvi-resources/images/mvi_image_4_1624705387843.jfif",
                "https://www.mvi-web.cn/mvi-resources/images/mvi_image_3_1624705387828.jfif",
                "https://www.mvi-web.cn/mvi-resources/images/mvi_image_2_1624705387812.jfif",
                "https://www.mvi-web.cn/mvi-resources/images/mvi_image_1_1624705387797.jfif",
                "https://www.mvi-web.cn/mvi-resources/images/mvi_image_0_1624705387765.jfif"
            ]
        }
    },
    mounted() {},
    methods: {
        change() {
            this.show = !this.show
        }
    }
}
</script>
<style lang="less">
html {
    font-size: 50px;
}

#app {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    position: relative;
    width: 100%;
}

.demo {
    width: 4rem;
    height: 2rem;
    margin: 0.2rem auto;
    position: relative;
    border: 1px solid #000000;

    &::before {
        content: "";
        width: 100%;
        height: 1px;
        background-color: #000000;
        position: absolute;
        bottom: -1rem;
        left: 0;
    }
}

.mvi-modal-custom-enter,
.mvi-modal-custom-leave-to {
    opacity: 0;
    transform: scaleY(0);
}
</style>
